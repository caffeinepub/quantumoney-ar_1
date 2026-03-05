import AccessControl "authorization/access-control";
import Stripe "stripe/Stripe";
import StripeMixin "stripe/StripeMixin";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";




actor {
  include MixinStorage();

  type Monster = {
    name : Text;
    energyBoost : Nat;
    spawnFrequency : Nat;
  };

  type CapturedMonster = {
    monster : Monster;
    captureTime : Int;
  };

  type DailyLimits = {
    plantsToday : Nat;
    rescuesToday : Nat;
    lastResetTime : Int;
  };

  type PlantedCoin = {
    owner : Principal;
    plantTime : Int;
    location : CoordinatedPoint;
  };

  type PlayerProfile = {
    energy : Nat;
    nickname : Text;
    photoUrl : ?Storage.ExternalBlob;
    availableTokens : Nat;
    plantedTokens : Nat;
    bonusTokens : Nat;
    xp : Nat;
    level : Nat;
    registered : Bool;
    capturedMonsters : [CapturedMonster];
  };

  type ARSpotClaim = {
    spotId : Text;
    claimedBy : Principal;
    claimTime : Int;
    qtmAmount : Nat;
  };

  type ARSpotDistribution = {
    spotId : Text;
    totalDistributed : Nat;
    claimCount : Nat;
  };

  type CoordinatedPoint = {
    latitude : Float;
    longitude : Float;
    address : Text;
  };

  type MapMarker = {
    id : Text;
    latitude : Float;
    longitude : Float;
    markerType : { #coin; #monster };
    description : Text;
  };

  type QMYPurchaseRequest = {
    buyer : Principal;
    tokensRequested : Nat;
    timestamp : Int;
  };

  type ChatMessage = {
    sender : Principal;
    authorName : Text;
    content : Text;
    timestamp : Int;
  };

  let accessControlState = AccessControl.initState();
  let stripe = Stripe.init(accessControlState, "usd");

  let userProfiles = Map.empty<Principal, PlayerProfile>();
  let dailyLimits = Map.empty<Principal, DailyLimits>();
  let plantedCoins = Map.empty<Text, PlantedCoin>();
  let arSpotClaims = Map.empty<Text, ARSpotClaim>();
  let arSpotDistributions = Map.empty<Text, ARSpotDistribution>();
  let mapMarkers = Map.empty<Text, MapMarker>();
  let qmyPurchaseRequests = Map.empty<Principal, QMYPurchaseRequest>();
  let chatMessages = Map.empty<Nat, ChatMessage>();
  let welcomeBonuses = Map.empty<Principal, Bool>();

  var fixedQmyPrice : Float = 0.02;
  var chatMessageCounter = 0;
  var _qmy = 1000;

  include StripeMixin(stripe);

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    // Admin-only check happens inside AccessControl.assignRole
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  private func resetDailyLimitsIfNeeded(caller : Principal) {
    let now = Time.now();
    let oneDayNanos : Int = 24 * 60 * 60 * 1_000_000_000;

    switch (dailyLimits.get(caller)) {
      case (?limits) {
        if (now - limits.lastResetTime >= oneDayNanos) {
          dailyLimits.add(caller, {
            plantsToday = 0;
            rescuesToday = 0;
            lastResetTime = now;
          });
        };
      };
      case (null) {
        dailyLimits.add(caller, {
          plantsToday = 0;
          rescuesToday = 0;
          lastResetTime = now;
        });
      };
    };
  };

  // Get the caller's own profile — requires at least user role
  public query ({ caller }) func getCallerUserProfile() : async ?PlayerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    userProfiles.get(caller);
  };

  // Get another user's profile by Principal — caller can view own profile; admins can view any
  public query ({ caller }) func getUserProfile(user : Principal) : async ?PlayerProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save the caller's own profile — requires at least user role
  public shared ({ caller }) func saveCallerUserProfile(profile : PlayerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save their profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Dedicated updateProfile method for nickname and photoUrl — requires at least user role
  public shared ({ caller }) func updateProfile(nickname : Text, photoUrl : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update their own profiles");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        let updatedProfile : PlayerProfile = {
          existingProfile with
          nickname;
          photoUrl;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {
        let newProfile : PlayerProfile = {
          energy = 100;
          nickname;
          photoUrl;
          availableTokens = 0;
          plantedTokens = 0;
          bonusTokens = 0;
          xp = 0;
          level = 1;
          registered = true;
          capturedMonsters = [];
        };
        userProfiles.add(caller, newProfile);
      };
    };
  };

  // Claim the one-time welcome bonus — requires at least user role.
  // Anonymous/guest principals are explicitly rejected to prevent abuse.
  // The bonus is recorded on-chain so it cannot be re-triggered by any
  // client-side action (cache clear, logout/login, etc.).
  public shared ({ caller }) func claimWelcomeBonus() : async (Nat, Nat) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can claim the welcome bonus");
    };

    switch (welcomeBonuses.get(caller)) {
      case (?true) {
        Runtime.trap("You have already claimed the welcome bonus.");
      };
      case (_) {
        let bonusQmy : Nat = 1000;
        let bonusXp : Nat = 100;

        // Record the bonus as claimed before updating the profile so that
        // even if the profile update path traps, the bonus cannot be
        // re-claimed (fail-safe: mark first, then apply).
        welcomeBonuses.add(caller, true);

        // Apply the bonus to the caller's profile, creating one if absent.
        switch (userProfiles.get(caller)) {
          case (?existingProfile) {
            let updatedProfile : PlayerProfile = {
              existingProfile with
              availableTokens = existingProfile.availableTokens + bonusQmy;
              bonusTokens = existingProfile.bonusTokens + bonusQmy;
              xp = existingProfile.xp + bonusXp;
            };
            userProfiles.add(caller, updatedProfile);
          };
          case (null) {
            let newProfile : PlayerProfile = {
              energy = 100;
              nickname = "";
              photoUrl = null;
              availableTokens = bonusQmy;
              plantedTokens = 0;
              bonusTokens = bonusQmy;
              xp = bonusXp;
              level = 1;
              registered = true;
              capturedMonsters = [];
            };
            userProfiles.add(caller, newProfile);
          };
        };

        (bonusQmy, bonusXp);
      };
    };
  };

  // ── Public Game Data (no auth required) ───────────────────────────────────

  public query func getPlantedCoins() : async [PlantedCoin] {
    plantedCoins.values().toArray();
  };

  public query func getARSpotClaims() : async [ARSpotClaim] {
    arSpotClaims.values().toArray();
  };

  public query func getARSpotDistributions() : async [ARSpotDistribution] {
    arSpotDistributions.values().toArray();
  };

  public query func getMapMarkers() : async [MapMarker] {
    mapMarkers.values().toArray();
  };

  // Look up a player profile by their principal — no auth required (public game data)
  public query func getPlayerByAddress(addr : Principal) : async ?PlayerProfile {
    userProfiles.get(addr);
  };

  // ── Daily Limits ──────────────────────────────────────────────────────────

  // Get caller's own daily limits — requires at least user role
  public query ({ caller }) func getPlayerDailyLimits() : async DailyLimits {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view daily limits");
    };
    switch (dailyLimits.get(caller)) {
      case (?limits) { limits };
      case (null) {
        Runtime.trap("No daily limits found for this user");
      };
    };
  };

  // Update caller's own daily limits — requires at least user role
  public shared ({ caller }) func updatePlayerDailyLimits(plantsToday : Nat, rescuesToday : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update daily limits");
    };
    dailyLimits.add(caller, {
      plantsToday;
      rescuesToday;
      lastResetTime = Time.now();
    });
  };

  // ── QMY Purchase Requests ─────────────────────────────────────────────────

  // Get caller's own QMY purchase request — requires at least user role
  public query ({ caller }) func getQMYPurchaseRequest() : async ?QMYPurchaseRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view purchase requests");
    };
    qmyPurchaseRequests.get(caller);
  };

  // Submit a QMY purchase request — requires at least user role.
  // The buyer field in the request must match the caller to prevent
  // one user from submitting requests on behalf of another.
  public shared ({ caller }) func submitQMYPurchaseRequest(request : QMYPurchaseRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit purchase requests");
    };
    if (request.buyer != caller) {
      Runtime.trap("Unauthorized: Purchase request buyer must match the caller");
    };
    qmyPurchaseRequests.add(caller, request);
  };

  // ── Chat ──────────────────────────────────────────────────────────────────

  // Read chat messages — no auth required (public chat)
  public query func getChatMessages() : async [ChatMessage] {
    chatMessages.values().toArray();
  };

  // Send a chat message — requires at least user role
  public shared ({ caller }) func sendChatMessage(content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send chat messages");
    };
    let senderName = switch (userProfiles.get(caller)) {
      case (?profile) { profile.nickname };
      case (null) { "Anonymous" };
    };

    chatMessages.add(chatMessageCounter, {
      sender = caller;
      authorName = senderName;
      content;
      timestamp = Time.now();
    });

    chatMessageCounter += 1;
  };
};

