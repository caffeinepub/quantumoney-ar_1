import { useQuery } from '@tanstack/react-query';
import { ICPLedgerClient } from '../lib/icp/ledgerClient';

export function useICPLedger(principalId?: string) {
  return useQuery<bigint | null>({
    queryKey: ['icpBalance', principalId],
    queryFn: async () => {
      if (!principalId) return null;
      try {
        const client = ICPLedgerClient.getInstance();
        return await client.getBalance(principalId);
      } catch {
        return BigInt(0);
      }
    },
    enabled: !!principalId,
    staleTime: 30_000,
    retry: false,
  });
}
