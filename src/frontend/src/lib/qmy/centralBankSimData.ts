export interface CentralBankData {
  circulating: number;
  locked: number;
  totalSupply: number;
  categories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
  usage: {
    activeWallets: number;
    dailyTransactions: number;
    totalTransfers: number;
  };
  presale: {
    sold: number;
    remaining: number;
    participants: number;
  };
  geographic: Array<{
    region: string;
    percentage: number;
  }>;
}

export function getCentralBankData(): CentralBankData {
  return {
    circulating: 150000000,
    locked: 450000000,
    totalSupply: 600000000,
    categories: [
      { name: 'Founders & Team', amount: 120000000, percentage: 20 },
      { name: 'Pre-sale', amount: 90000000, percentage: 15 },
      { name: 'Early Players', amount: 60000000, percentage: 10 },
      { name: 'AR Distribution', amount: 240000000, percentage: 40 },
      { name: 'Treasury & DAO', amount: 90000000, percentage: 15 },
    ],
    usage: {
      activeWallets: 12450,
      dailyTransactions: 3280,
      totalTransfers: 156780,
    },
    presale: {
      sold: 45000000,
      remaining: 45000000,
      participants: 2340,
    },
    geographic: [
      { region: 'Asia', percentage: 40 },
      { region: 'North America', percentage: 20 },
      { region: 'Europe', percentage: 15 },
      { region: 'Latin America', percentage: 10 },
      { region: 'Africa', percentage: 10 },
      { region: 'Others', percentage: 5 },
    ],
  };
}
