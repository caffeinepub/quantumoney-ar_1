import { useQuery } from '@tanstack/react-query';

export interface QMYTransaction {
  kind: string;
  amount: bigint;
  timestamp: bigint;
  from?: string;
  to?: string;
}

/**
 * Hook to fetch QMY transaction history for a given principal.
 * Returns null when not supported by the ledger canister.
 */
export function useQMYTransactions(principalId?: string) {
  return useQuery<QMYTransaction[] | null>({
    queryKey: ['qmyTransactions', principalId ?? ''],
    queryFn: async (): Promise<QMYTransaction[] | null> => {
      if (!principalId) return null;
      // Simulated — real implementation requires icrc1_get_transactions
      // support on the QMY ledger canister
      return null;
    },
    enabled: !!principalId,
    staleTime: 30_000,
  });
}
