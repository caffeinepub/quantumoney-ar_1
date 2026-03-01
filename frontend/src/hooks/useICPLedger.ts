import { useQuery } from '@tanstack/react-query';
import { ICPLedgerClient } from '../lib/icp/ledgerClient';

export function useICPLedger(principalId?: string) {
  return useQuery<bigint>({
    queryKey: ['icpBalance', principalId],
    queryFn: async () => {
      if (!principalId) return 0n;
      const client = ICPLedgerClient.getInstance();
      return client.getBalance(principalId);
    },
    enabled: !!principalId,
    staleTime: 30_000,
  });
}
