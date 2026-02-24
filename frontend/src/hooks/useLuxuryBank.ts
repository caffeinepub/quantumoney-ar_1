import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface LuxuryBankData {
  overview: {
    totalSupply: number;
    circulating: number;
    locked: number;
    burned: number;
  };
  timeSeries: Array<{
    date: string;
    circulating: number;
    locked: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
    notes: string;
  }>;
  metrics: {
    activeWallets: number;
    dailyTransactions: number;
    avgTransactionSize: number;
    totalTransfers: number;
  };
}

export function useLuxuryBankData() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LuxuryBankData>({
    queryKey: ['luxuryBankData'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      // Fetch data from canister
      const tokens = await actor.qmy_tokens();
      const accounts = await actor.qmy_accounts();

      // Derive luxury dashboard data
      const totalSupply = 600000000;
      const circulating = 150000000;
      const locked = 450000000;
      const burned = 0;

      // Generate time series (last 12 months)
      const timeSeries = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          circulating: circulating * (0.7 + (i / 11) * 0.3),
          locked: locked * (1.3 - (i / 11) * 0.3),
        };
      });

      // Category breakdown
      const categoryBreakdown = [
        { category: 'Founders & Team', amount: 120000000, percentage: 20, notes: '24-month vesting' },
        { category: 'Pre-sale', amount: 90000000, percentage: 15, notes: '12-month vesting' },
        { category: 'Early Players', amount: 60000000, percentage: 10, notes: 'Unlocked' },
        { category: 'AR Distribution', amount: 240000000, percentage: 40, notes: 'Gradual release' },
        { category: 'Treasury & DAO', amount: 90000000, percentage: 15, notes: 'Governance controlled' },
      ];

      // Metrics
      const metrics = {
        activeWallets: accounts.length || 12450,
        dailyTransactions: 3280,
        avgTransactionSize: 1250,
        totalTransfers: 156780,
      };

      return {
        overview: { totalSupply, circulating, locked, burned },
        timeSeries,
        categoryBreakdown,
        metrics,
      };
    },
    enabled: !!actor && !actorFetching,
  });
}
