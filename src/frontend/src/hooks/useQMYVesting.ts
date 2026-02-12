import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';

export interface VestingInfo {
  available: bigint;
  locked: bigint;
  nextUnlock: {
    amount: bigint;
    date: Date;
  } | null;
}

/**
 * Hook to fetch QMY vesting information
 * Currently returns unavailable state as vesting data is not exposed on-chain
 */
export function useQMYVesting() {
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery({
    queryKey: ['qmyVesting', identity?.getPrincipal().toString()],
    queryFn: async (): Promise<VestingInfo | null> => {
      if (!identity) {
        throw new Error('Not authenticated');
      }

      // Vesting data is not available on-chain via the QMY ledger
      // Return null to indicate unavailable state
      return null;
    },
    enabled: !!identity && !isInitializing,
    staleTime: 30000, // 30 seconds
    retry: false,
  });
}
