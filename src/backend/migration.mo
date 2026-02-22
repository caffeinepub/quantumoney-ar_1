import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

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

  type DailyLimits = {
    plantsToday : Nat;
    rescuesToday : Nat;
    lastResetTime : Int;
  };

  type OldActor = {
    dailyLimits : Map.Map<Principal, DailyLimits>;
  };

  type NewActor = {
    dailyLimits : Map.Map<UserId, DailyLimits>;
  };

  public func run(old : OldActor) : NewActor {
    let newDailyLimits = Map.empty<UserId, DailyLimits>();
    var nextUserId : Nat = 1;

    for ((_, limits) in old.dailyLimits.entries()) {
      newDailyLimits.add(nextUserId, limits);
      nextUserId += 1;
    };

    { dailyLimits = newDailyLimits };
  };
};
