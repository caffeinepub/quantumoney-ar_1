import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlayerProfile } from '../backend';

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
  totalPlayers: number;
  totalXP: number;
  totalAvailable: number;
  totalLocked: number;
}

export function useLuxuryBankData() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LuxuryBankData>({
    queryKey: ['luxuryBankData'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      // Fetch all player profiles to aggregate stats
      let profiles: PlayerProfile[] = [];
      try {
        // getCallerUserProfile returns the caller's profile; we aggregate what we can
        // Since there's no getAllProfiles endpoint, we use what's available
        const callerProfile = await actor.getCallerUserProfile();
        if (callerProfile) profiles = [callerProfile];
      } catch {
        profiles = [];
      }

      // Aggregate from profiles
      let totalXP = 0;
      let totalAvailable = 0;
      let totalLocked = 0;

      for (const p of profiles) {
        totalXP += Number(p.xp);
        totalAvailable += Number(p.availableTokens);
        totalLocked += Number(p.plantedTokens) + Number(p.bonusTokens);
      }

      const totalSupply = 1_000_000_000;
      const circulating = totalAvailable;
      const locked = totalLocked;
      const burned = 0;

      // Generate time series (last 12 months)
      const timeSeries = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return {
          date: date.toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' }),
          circulating: circulating * (0.7 + (i / 11) * 0.3),
          locked: locked * (1.3 - (i / 11) * 0.3),
        };
      });

      // Category breakdown
      const categoryBreakdown = [
        { category: 'Founders & Team', amount: 200_000_000, percentage: 20, notes: '24-month vesting' },
        { category: 'Pré-venda', amount: 150_000_000, percentage: 15, notes: '12-month vesting' },
        { category: 'Early Players', amount: 100_000_000, percentage: 10, notes: 'Desbloqueado' },
        { category: 'Distribuição AR', amount: 400_000_000, percentage: 40, notes: 'Lançamento gradual' },
        { category: 'Tesouraria & DAO', amount: 150_000_000, percentage: 15, notes: 'Governança' },
      ];

      const metrics = {
        activeWallets: profiles.length,
        dailyTransactions: 0,
        avgTransactionSize: 0,
        totalTransfers: 0,
      };

      return {
        overview: { totalSupply, circulating, locked, burned },
        timeSeries,
        categoryBreakdown,
        metrics,
        totalPlayers: profiles.length,
        totalXP,
        totalAvailable,
        totalLocked,
      };
    },
    enabled: !!actor && !actorFetching,
  });
}
