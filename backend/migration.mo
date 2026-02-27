import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";

module {
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

  type DailyLimits = {
    plantsToday : Nat;
    rescuesToday : Nat;
    lastResetTime : Int;
  };

  type OldActor = {
    userProfiles : Map.Map<UserId, PlayerProfile>;
    dailyLimits : Map.Map<UserId, DailyLimits>;
  };

  type NewPlayerProfile = {
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

  // New actor type
  type NewActor = {
    userProfiles : Map.Map<UserId, NewPlayerProfile>;
    dailyLimits : Map.Map<UserId, DailyLimits>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<UserId, PlayerProfile, NewPlayerProfile>(
      func(_userId, oldProfile) {
        { oldProfile with photoUrl = null };
      }
    );
    { old with userProfiles = newUserProfiles };
  };
};
