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
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type UserId = Nat;
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

  type SuperUserRole = {
    #admin;
    #user;
    #guest;
  };

  let accessControlState = AccessControl.initState();
  let stripe = Stripe.init(accessControlState, "usd");

  // Storage maps using UserId
  let userProfiles = Map.empty<UserId, PlayerProfile>();
  let dailyLimits = Map.empty<UserId, DailyLimits>();
  let principalToUserId = Map.empty<Principal, UserId>();
  var nextUserId : UserId = 1;

  let plantedCoins = Map.empty<Text, PlantedCoin>();
  let arSpotClaims = Map.empty<Text, ARSpotClaim>();
  let arSpotDistributions = Map.empty<Text, ARSpotDistribution>();
  let mapMarkers = Map.empty<Text, MapMarker>();
  var qmyPurchaseRequests = Map.empty<Principal, QMYPurchaseRequest>();
  let chatMessages = Map.empty<Nat, ChatMessage>();

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

  // Helper 'get' that creates new user IDs for new callers.
  private func getUserIdInternal(principal : Principal) : UserId {
    switch (principalToUserId.get(principal)) {
      case (?userId) { userId };
      case (null) {
        let newUserId = nextUserId;
        principalToUserId.add(principal, newUserId);
        nextUserId += 1;
        newUserId;
      };
    };
  };

  // Helper for public calls to avoid accidental ID creation.
  private func getCallerUserId(caller : Principal) : UserId {
    getUserIdInternal(caller);
  };

  private func resetDailyLimitsIfNeeded(userId : UserId) {
    let now = Time.now();
    let oneDayNanos : Int = 24 * 60 * 60 * 1_000_000_000;

    switch (dailyLimits.get(userId)) {
      case (?limits) {
        if (now - limits.lastResetTime >= oneDayNanos) {
          dailyLimits.add(userId, {
            plantsToday = 0;
            rescuesToday = 0;
            lastResetTime = now;
          });
        };
      };
      case (null) {
        dailyLimits.add(userId, {
          plantsToday = 0;
          rescuesToday = 0;
          lastResetTime = now;
        });
      };
    };
  };

  private func calculateDistance(lat1 : Float, lon1 : Float, lat2 : Float, lon2 : Float) : Float {
    let earthRadiusMeters : Float = 6371000.0;
    let dLat = (lat2 - lat1) * 3.14159265359 / 180.0;
    let dLon = (lon2 - lon1) * 3.14159265359 / 180.0;

    let a = Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0) +
      Float.cos(lat1 * 3.14159265359 / 180.0) * Float.cos(lat2 * 3.14159265359 / 180.0) *
      Float.sin(dLon / 2.0) * Float.sin(dLon / 2.0);

    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    earthRadiusMeters * c;
  };

  // Get the caller's own profile — requires at least user role
  public query ({ caller }) func getCallerUserProfile() : async ?PlayerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    userProfiles.get(getCallerUserId(caller));
  };

  // Get another user's profile by UserId — admin only
  public query ({ caller }) func getUserProfile(userId : UserId) : async ?PlayerProfile {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view other users' profiles");
    };
    userProfiles.get(userId);
  };

  // Save the caller's own profile — requires at least user role
  public shared ({ caller }) func saveCallerUserProfile(profile : PlayerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save their profiles");
    };
    userProfiles.add(getCallerUserId(caller), profile);
  };

  // Extension: Dedicated updateProfile method for nickname and photoUrl
  public shared ({ caller }) func updateProfile(nickname : Text, photoUrl : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update their own profiles");
    };

    let userId = getCallerUserId(caller);

    switch (userProfiles.get(userId)) {
      case (?existingProfile) {
        let updatedProfile : PlayerProfile = {
          existingProfile with
          nickname;
          photoUrl;
        };
        userProfiles.add(userId, updatedProfile);
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
        userProfiles.add(userId, newProfile);
      };
    };
  };

  // Get the caller's own UserId — no auth required (public info about self)
  public query ({ caller }) func getUserIdForCaller() : async UserId {
    getCallerUserId(caller);
  };

  // Public game data reads — no auth required
  public query ({ caller }) func getPlantedCoins() : async [PlantedCoin] {
    plantedCoins.values().toArray();
  };

  public query ({ caller }) func getARSpotClaims() : async [ARSpotClaim] {
    arSpotClaims.values().toArray();
  };

  public query ({ caller }) func getARSpotDistributions() : async [ARSpotDistribution] {
    arSpotDistributions.values().toArray();
  };

  public query ({ caller }) func getMapMarkers() : async [MapMarker] {
    mapMarkers.values().toArray();
  };

  // Get caller's own daily limits — requires at least user role
  public query ({ caller }) func getPlayerDailyLimits() : async DailyLimits {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view daily limits");
    };
    switch (dailyLimits.get(getCallerUserId(caller))) {
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
    dailyLimits.add(getCallerUserId(caller), {
      plantsToday;
      rescuesToday;
      lastResetTime = Time.now();
    });
  };

  // Get caller's own QMY purchase request — requires at least user role
  public query ({ caller }) func getQMYPurchaseRequest() : async ?QMYPurchaseRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view purchase requests");
    };
    qmyPurchaseRequests.get(caller);
  };

  // Submit a QMY purchase request — requires at least user role
  public shared ({ caller }) func submitQMYPurchaseRequest(request : QMYPurchaseRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit purchase requests");
    };
    qmyPurchaseRequests.add(caller, request);
  };

  // Read chat messages — no auth required (public chat)
  public query ({ caller }) func getChatMessages() : async [ChatMessage] {
    chatMessages.values().toArray();
  };

  // Send a chat message — requires at least user role
  public shared ({ caller }) func sendChatMessage(content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send chat messages");
    };
    let senderName = switch (userProfiles.get(getCallerUserId(caller))) {
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

  // Look up a player profile by their principal — no auth required (public game data)
  public query ({ caller }) func getPlayerByAddress(addr : Principal) : async ?PlayerProfile {
    switch (principalToUserId.get(addr)) {
      case (?userId) { userProfiles.get(userId) };
      case (null) { null };
    };
  };
};
