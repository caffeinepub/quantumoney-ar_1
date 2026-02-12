export interface PresalePhase {
  id: string;
  name: string;
  allocation: number;
  pricePerToken: number;
  bonus: number;
  minPurchase: number;
  status: 'upcoming' | 'active' | 'completed';
}

export interface PresaleData {
  totalAllocation: number;
  vestingMonths: number;
  phases: PresalePhase[];
}

export function getPresaleData(): PresaleData {
  return {
    totalAllocation: 90000000,
    vestingMonths: 12,
    phases: [
      {
        id: 'seed',
        name: 'Seed Round',
        allocation: 20000000,
        pricePerToken: 0.01,
        bonus: 25,
        minPurchase: 10000,
        status: 'completed',
      },
      {
        id: 'private',
        name: 'Private Sale',
        allocation: 35000000,
        pricePerToken: 0.015,
        bonus: 15,
        minPurchase: 5000,
        status: 'active',
      },
      {
        id: 'public',
        name: 'Public Sale',
        allocation: 35000000,
        pricePerToken: 0.02,
        bonus: 5,
        minPurchase: 1000,
        status: 'upcoming',
      },
    ],
  };
}
