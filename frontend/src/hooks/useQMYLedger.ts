import { useQuery } from '@tanstack/react-query';
import { ICRCLedgerClient } from '../lib/icrc/ledgerClient';

export function useQMYLedger(principalId?: string) {
  return useQuery<bigint>({
    queryKey: ['qmyBalance', principalId],
    queryFn: async () => {
      if (!principalId) return 0n;
      const client = ICRCLedgerClient.getInstance();
      return client.getBalance(principalId);
    },
    enabled: !!principalId,
    staleTime: 30_000,
  });
}
