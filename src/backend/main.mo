import AccessControl "authorization/access-control";
import Stripe "stripe/Stripe";
import StripeMixin "stripe/StripeMixin";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";

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

  let playerProfiles = Map.empty<Principal, PlayerProfile>();
  let dailyLimits = Map.empty<Principal, DailyLimits>();
  let plantedCoins = Map.empty<Text, PlantedCoin>();
  let arSpotClaims = Map.empty<Text, ARSpotClaim>();
  let arSpotDistributions = Map.empty<Text, ARSpotDistribution>();
  var qmyPurchaseRequests = Map.empty<Principal, QMYPurchaseRequest>();
  let chatMessages = Map.empty<Nat, ChatMessage>();

  var fixedQmyPrice : Float = 0.02;
  var chatMessageCounter = 0;

  include StripeMixin(stripe);

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

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public type SuperUserRole = {
    #admin;
    #user;
    #guest;
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?PlayerProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view profiles");
    };
    playerProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?PlayerProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or must be admin");
    };
    playerProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : PlayerProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can save profiles");
    };
    playerProfiles.add(caller, profile);
  };

  public query ({ caller }) func getAllPlayerProfiles() : async [(Principal, PlayerProfile)] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can get all profiles");
    };
    playerProfiles.toArray();
  };

  public shared ({ caller }) func registerPlayer(nickname : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };

    switch (playerProfiles.get(caller)) {
      case (?_) {
        Runtime.trap("Unauthorized: Player already registered");
      };
      case (null) {
        let newProfile : PlayerProfile = {
          energy = 100;
          nickname = nickname;
          availableTokens = 100;
          plantedTokens = 0;
          bonusTokens = 900;
          xp = 100;
          level = 1;
          registered = true;
          capturedMonsters = [];
        };
        playerProfiles.add(caller, newProfile);

        dailyLimits.add(caller, {
          plantsToday = 0;
          rescuesToday = 0;
          lastResetTime = Time.now();
        });
      };
    };
  };

  public shared ({ caller }) func getPlayerState() : async ?PlayerProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can check state");
    };
    playerProfiles.get(caller);
  };

  public shared ({ caller }) func captureMonster(monster : Monster) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can capture monsters");
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        let newEnergy = Nat.min(profile.energy + monster.energyBoost, 100);
        let newMonster : CapturedMonster = {
          monster;
          captureTime = Time.now();
        };
        let updatedProfile = {
          profile with
          energy = newEnergy;
          capturedMonsters = profile.capturedMonsters.concat([newMonster]);
        };
        playerProfiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public shared ({ caller }) func plantCoin(location : CoordinatedPoint) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can plant coins");
    };

    resetDailyLimitsIfNeeded(caller);

    switch (dailyLimits.get(caller)) {
      case (?limits) {
        if (limits.plantsToday >= 3) {
          Runtime.trap("Unauthorized: Daily plant limit of 3 reached");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Daily limits not initialized");
      };
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        if (not profile.registered) {
          Runtime.trap("Unauthorized: Player must complete registration to plant coins");
        };

        if (profile.availableTokens < 1) {
          Runtime.trap("Unauthorized: Insufficient available tokens (need at least 1 QTM)");
        };

        if (location.latitude < -90.0 or location.latitude > 90.0) {
          Runtime.trap("Unauthorized: Invalid latitude coordinate");
        };
        if (location.longitude < -180.0 or location.longitude > 180.0) {
          Runtime.trap("Unauthorized: Invalid longitude coordinate");
        };

        let coinId = caller.toText() # "_" # Time.now().toText();
        let plantedCoin : PlantedCoin = {
          owner = caller;
          plantTime = Time.now();
          location = location;
        };
        plantedCoins.add(coinId, plantedCoin);

        let updatedProfile = {
          profile with
          availableTokens = profile.availableTokens - 1;
          plantedTokens = profile.plantedTokens + 1;
          xp = profile.xp + 10;
        };
        playerProfiles.add(caller, updatedProfile);

        switch (dailyLimits.get(caller)) {
          case (?limits) {
            dailyLimits.add(caller, {
              limits with plantsToday = limits.plantsToday + 1
            });
          };
          case (null) {};
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public shared ({ caller }) func rescueSingleCoin(coinId : Text, playerLocation : CoordinatedPoint) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can rescue coins");
    };

    resetDailyLimitsIfNeeded(caller);

    switch (dailyLimits.get(caller)) {
      case (?limits) {
        if (limits.rescuesToday >= 100) {
          Runtime.trap("Unauthorized: Daily rescue limit of 100 QTM reached");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Daily limits not initialized");
      };
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        if (not profile.registered) {
          Runtime.trap("Unauthorized: Player must complete registration to rescue coins");
        };

        switch (plantedCoins.get(coinId)) {
          case (?coin) {
            let now = Time.now();
            let thirtyDaysNanos : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
            let isExpired = (now - coin.plantTime) >= thirtyDaysNanos;

            let distance = calculateDistance(
              playerLocation.latitude,
              playerLocation.longitude,
              coin.location.latitude,
              coin.location.longitude
            );

            let maxRescueDistance = profile.xp.toFloat();

            if (distance > maxRescueDistance) {
              Runtime.trap("Unauthorized: Coin is outside your XP-based rescue radius");
            };

            if (coin.owner == caller and not isExpired) {
              Runtime.trap("Unauthorized: Cannot rescue own coins during 30-day lock period");
            };

            let qtmReward = if (coin.owner == caller and isExpired) {
              2
            } else {
              1;
            };

            let xpCost = if (coin.owner == caller and isExpired) {
              0;
            } else {
              15;
            };

            if (profile.xp < xpCost) {
              Runtime.trap("Unauthorized: Insufficient XP for rescue operation (need 15 XP)");
            };

            let updatedProfile = {
              profile with
              availableTokens = profile.availableTokens + qtmReward;
              xp = if (profile.xp >= xpCost) { profile.xp - xpCost } else { 0 };
            };
            playerProfiles.add(caller, updatedProfile);

            plantedCoins.remove(coinId);

            switch (dailyLimits.get(caller)) {
              case (?limits) {
                dailyLimits.add(caller, {
                  limits with rescuesToday = limits.rescuesToday + 1
                });
              };
              case (null) {};
            };
          };
          case (null) {
            Runtime.trap("Unauthorized: Coin not found or already rescued");
          };
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public shared ({ caller }) func claimARSpot(spotId : Text, qtmAmount : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can claim AR spots");
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        if (not profile.registered) {
          Runtime.trap("Unauthorized: Player must complete registration to claim AR spots");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };

    if (qtmAmount != 4000) {
      Runtime.trap("Unauthorized: Each wallet must claim exactly 4000 QTM per spot");
    };

    let claimKey = spotId # ":" # caller.toText();
    switch (arSpotClaims.get(claimKey)) {
      case (?_) {
        Runtime.trap("Unauthorized: This wallet has already claimed 4000 QTM from this spot");
      };
      case (null) {
      };
    };

    let claim : ARSpotClaim = {
      spotId = spotId;
      claimedBy = caller;
      claimTime = Time.now();
      qtmAmount = qtmAmount;
    };
    arSpotClaims.add(claimKey, claim);

    let currentDistribution = switch (arSpotDistributions.get(spotId)) {
      case (?dist) { dist };
      case (null) {
        {
          spotId = spotId;
          totalDistributed = 0;
          claimCount = 0;
        };
      };
    };

    let updatedDistribution : ARSpotDistribution = {
      spotId = spotId;
      totalDistributed = currentDistribution.totalDistributed + qtmAmount;
      claimCount = currentDistribution.claimCount + 1;
    };
    arSpotDistributions.add(spotId, updatedDistribution);

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile = {
          profile with availableTokens = profile.availableTokens + qtmAmount
        };
        playerProfiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public query ({ caller }) func getARSpotDistribution(spotId : Text) : async ?ARSpotDistribution {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view AR spot distributions");
    };
    arSpotDistributions.get(spotId);
  };

  public query ({ caller }) func hasClaimedARSpot(spotId : Text, user : Principal) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can check claim status");
    };

    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own claim status or must be admin");
    };

    let claimKey = spotId # ":" # user.toText();
    switch (arSpotClaims.get(claimKey)) {
      case (?_) { true };
      case (null) { false };
    };
  };

  public shared ({ caller }) func updateXP(xpChange : Int) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can update XP");
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        if (not profile.registered) {
          Runtime.trap("Unauthorized: Player must complete registration to update XP");
        };

        let currentXP = profile.xp;
        let newXP = if (xpChange < 0) {
          let absChange = Int.abs(xpChange);
          if (currentXP >= absChange) {
            currentXP - absChange;
          } else { 0 };
        } else {
          currentXP + Int.abs(xpChange);
        };

        let updatedProfile = {
          profile with xp = newXP
        };
        playerProfiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public shared ({ caller }) func adminResetPlayer(user : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can reset players");
    };

    if (user == caller) {
      Runtime.trap("Unauthorized: Admins cannot reset their own profile");
    };

    if (AccessControl.isAdmin(accessControlState, user)) {
      Runtime.trap("Unauthorized: Cannot reset another admin's profile");
    };

    playerProfiles.remove(user);
    dailyLimits.remove(user);
  };

  public query ({ caller }) func adminGetPlayerCount() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view player statistics");
    };
    playerProfiles.size();
  };

  public query ({ caller }) func getCapturedMonsters(user : Principal) : async [CapturedMonster] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can access captured monsters");
    };

    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own captured monsters or must be admin");
    };

    switch (playerProfiles.get(user)) {
      case (?profile) { profile.capturedMonsters };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func restoreEnergy() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can restore energy");
    };

    switch (playerProfiles.get(caller)) {
      case (?profile) {
        if (not profile.registered) {
          Runtime.trap("Unauthorized: Player must complete registration to restore energy");
        };

        let updatedProfile = {
          profile with energy = 100
        };
        playerProfiles.add(caller, updatedProfile);
      };
      case (null) {
        Runtime.trap("Unauthorized: Player not registered");
      };
    };
  };

  public shared ({ caller }) func initializeMerkleStorePrices() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can initialize store prices");
    };

    stripe.addStripePrice(caller, {
      priceId = "energy_pack";
      name = "Energy Pack";
      description = "Buy 50 energy units";
      unitAmount = 499;
    });

    stripe.addStripePrice(caller, {
      priceId = "coin_bag";
      name = "Coin Bag";
      description = "Buy 200 coins";
      unitAmount = 999;
    });

    stripe.addStripePrice(caller, {
      priceId = "xp_boost";
      name = "XP Boost";
      description = "Double XP Hours";
      unitAmount = 699;
    });

    stripe.addStripePrice(caller, {
      priceId = "rescue_pass";
      name = "Rescue Pass";
      description = "Unlimited rescue attempts";
      unitAmount = 1499;
    });
  };

  public shared ({ caller }) func checkout(items : [Stripe.LineItem]) : async Stripe.CreatePaymentResponse {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can checkout");
    };

    if (items.size() == 0) {
      Runtime.trap("Unauthorized: Cart is empty. Add items before checking out.");
    };

    for (item in items.vals()) {
      if (item.quantity == 0) {
        Runtime.trap("Unauthorized: Quantity for priceId (" # item.priceId # ") must be one or more");
      };
    };

    await Stripe.createPayment(stripe, caller, items, "/payment-success", "/payment-cancel");
  };

  public query ({ caller }) func qmy_tokens() : async [{
    name : Text;
    symbol : Text;
    available_supply : Nat;
    usd_price : Float;
  }] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view token info");
    };
    [{
      name = "Qmy";
      symbol = "QMY";
      available_supply = 333333333333;
      usd_price = fixedQmyPrice;
    }];
  };

  public query ({ caller }) func qmy_accounts() : async [
    {
      account : Principal;
      confirmed_balance : Nat;
      pending_balance : Nat;
      balance_as_of_time : Int;
      usd_balance : Float;
    }
  ] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view accounts");
    };
    [{
      account = caller;
      confirmed_balance = 1000000;
      pending_balance = 0;
      balance_as_of_time = Time.now();
      usd_balance = 20.0;
    }];
  };

  public query ({ caller }) func qmy_getNativeTradeHistory(_account : Principal) : async [Principal] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view trade history");
    };
    [];
  };

  public query ({ caller }) func qmy_getCreatedNativeTradeHistory(_account : Principal) : async [Principal] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view created trades");
    };
    [];
  };

  public query ({ caller }) func qmy_getActiveNativeTrades(_account : Principal) : async [Principal] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view active trades");
    };
    [];
  };

  public query ({ caller }) func qmy_getAvailableNativeTrades(_account : Principal) : async [Principal] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view available trades");
    };
    [];
  };

  public shared ({ caller }) func qmy_createOwnedSplitNativeTrade(_tokens : Nat, _price : Float) : async {
    id : Text;
    seller : Principal;
    buyer : Principal;
    tokens : Nat;
    price : Float;
    status : { #pending };
    timestamp : Int;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can create trades");
    };

    {
      id = "trade_0";
      seller = caller;
      buyer = caller;
      tokens = _tokens;
      price = _price;
      status = #pending;
      timestamp = Time.now();
    };
  };

  public shared ({ caller }) func qmy_purchase_split(_trade_id : Text, _tokens : Nat) : async {
    tokens_purchased : Nat;
    _remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can purchase tokens");
    };

    { tokens_purchased = _tokens; _remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmy_cancel_pending_split(_trade_id : Text) : async {
    remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can cancel trades");
    };

    { remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmy_cancel_owner_pending_native_trades_seller(_seller : Principal) : async {
    trade_id : Text;
    remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can cancel trades");
    };

    if (caller != _seller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only cancel your own trades or must be admin");
    };

    { trade_id = ""; remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmy_cancel_owner_pending_native_trades_buyer(_buyer : Principal) : async {
    trade_id : Text;
    remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can cancel trades");
    };

    if (caller != _buyer and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only cancel your own trades or must be admin");
    };

    { trade_id = ""; remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmy_purchaseOwnedNFTOwnedSplitNativeTrade(_token : Nat, _wallet : Principal) : async {
    tokens_purchased : Nat;
    remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can purchase tokens");
    };

    { tokens_purchased = _token; remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmy_purchase_identify(_tokens : Nat, _wallet : Principal) : async {
    tokens_purchased : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can purchase tokens");
    };

    { tokens_purchased = _tokens };
  };

  public shared ({ caller }) func qmy_cancel_owner_pending_native_trades_buyerbywallet(_buyer : Principal) : async {
    trade_id : Text;
    remaining_tokens : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can cancel trades");
    };

    if (caller != _buyer and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only cancel your own trades or must be admin");
    };

    { trade_id = ""; remaining_tokens = 0 };
  };

  public shared ({ caller }) func qmymylo_distribute_qmy(_total_tokens : Nat, _token_price_cents : Float, _distributor_fee_cents : Float) : async {
    tokens_distributed : Nat;
    distributor_fee : Float;
    total_cost_cents : Float;
    tokens_remaining : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can distribute tokens");
    };

    {
      tokens_distributed = _total_tokens;
      distributor_fee = _distributor_fee_cents;
      total_cost_cents = _total_tokens.toFloat() * _token_price_cents;
      tokens_remaining = 0;
    };
  };

  public shared ({ caller }) func qmymylo_distribute_mylo(_total_tokens : Nat, _token_price_cents : Float, _distributor_fee_cents : Float) : async {
    tokens_distributed : Nat;
    distributor_fee : Float;
    total_cost_cents : Float;
    tokens_remaining : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can distribute tokens");
    };

    {
      tokens_distributed = _total_tokens;
      distributor_fee = _distributor_fee_cents;
      total_cost_cents = _total_tokens.toFloat() * _token_price_cents;
      tokens_remaining = 0;
    };
  };

  public shared ({ caller }) func qmy_update_purchase_request(tokens_requested : Nat) : async {
    tokens_requested : Nat;
    timestamp : Int;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can update purchase requests");
    };

    let newRequest : QMYPurchaseRequest = {
      buyer = caller;
      tokensRequested = tokens_requested;
      timestamp = Time.now();
    };
    qmyPurchaseRequests.add(caller, newRequest);

    {
      tokens_requested;
      timestamp = newRequest.timestamp;
    };
  };

  public query ({ caller }) func qmy_get_purchase_request(buyer : Principal) : async ?QMYPurchaseRequest {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view purchase requests");
    };
    qmyPurchaseRequests.get(buyer);
  };

  public shared ({ caller }) func qmy_cancel_purchase_request() : async {
    tokens_requested : Nat;
    timestamp : Int;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can cancel purchase requests");
    };

    switch (qmyPurchaseRequests.get(caller)) {
      case (?request) {
        qmyPurchaseRequests.remove(caller);
        { tokens_requested = request.tokensRequested; timestamp = request.timestamp };
      };
      case (null) {
        Runtime.trap("No purchase request found for caller");
      };
    };
  };

  public query ({ caller }) func qmy_view_purchase_request() : async ?QMYPurchaseRequest {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view purchase requests");
    };
    qmyPurchaseRequests.get(caller);
  };

  public query ({ caller }) func qmy_get_pending_requests_by_buyer(buyer : Principal) : async [QMYPurchaseRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view pending requests");
    };

    switch (qmyPurchaseRequests.get(buyer)) {
      case (?req) { [req] };
      case (null) { [] };
    };
  };

  public query ({ caller }) func qmy_get_pending_requests_by_caller() : async [QMYPurchaseRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view pending requests");
    };

    switch (qmyPurchaseRequests.get(caller)) {
      case (?req) { [req] };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func sendMessage(authorName : Text, content : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot send messages");
    };

    switch (content.size(), authorName.size()) {
      case (0, _) { Runtime.trap("Cannot send empty author name or content") };
      case (_, 0) { Runtime.trap("Cannot send empty author name or content") };
      case (_, _) {};
    };

    let newMessage : ChatMessage = {
      sender = caller;
      authorName = authorName;
      content;
      timestamp = Time.now();
    };

    chatMessages.add(chatMessageCounter, newMessage);
    chatMessageCounter += 1;
  };

  public query func getMessages(limit : Nat, offset : Nat) : async [ChatMessage] {
    let totalMessages = chatMessages.size();

    let actualOffset = Nat.min(offset, totalMessages);
    let actualLimit = Nat.min(limit, totalMessages - actualOffset);

    if (actualLimit == 0) { return [] };

    let iter = chatMessages.entries();
    let startIter = iter.drop(actualOffset);
    let limitedIter = startIter.take(actualLimit);

    limitedIter.toArray().map(
      func((_, message)) { message }
    );
  };

  public query func getTotalMessagesCount() : async Nat {
    chatMessages.size();
  };

  public shared ({ caller }) func clearAllMessages() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear all messages");
    };

    if (chatMessages.size() != 0) {
      chatMessages.clear();
      chatMessageCounter := 0;
    };
  };
};

