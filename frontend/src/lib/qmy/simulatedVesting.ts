const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const INITIAL_UNLOCKED = 100;
const INITIAL_LOCKED = 900;
const UNLOCK_PER_PERIOD = 100;

export interface VestingInfo {
  available: number;
  locked: number;
  nextUnlock: {
    amount: number;
    date: Date;
  } | null;
}

export function calculateVesting(startDate: Date): VestingInfo {
  const now = new Date();
  const elapsed = now.getTime() - startDate.getTime();
  const periodsElapsed = Math.floor(elapsed / THIRTY_DAYS_MS);
  
  const unlockedFromVesting = Math.min(periodsElapsed * UNLOCK_PER_PERIOD, INITIAL_LOCKED);
  const available = INITIAL_UNLOCKED + unlockedFromVesting;
  const locked = INITIAL_LOCKED - unlockedFromVesting;

  let nextUnlock: { amount: number; date: Date } | null = null;
  if (locked > 0) {
    const nextUnlockDate = new Date(startDate.getTime() + (periodsElapsed + 1) * THIRTY_DAYS_MS);
    const nextUnlockAmount = Math.min(UNLOCK_PER_PERIOD, locked);
    nextUnlock = {
      amount: nextUnlockAmount,
      date: nextUnlockDate,
    };
  }

  return {
    available,
    locked,
    nextUnlock,
  };
}
