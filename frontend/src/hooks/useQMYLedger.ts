import { useQuery } from '@tanstack/react-query';
import { ICRCLedgerClient } from '../lib/icrc/ledgerClient';

export function useQMYLedger(principalId?: string) {
  return useQuery<bigint | null>({
    queryKey: ['qmyBalance', principalId],
    queryFn: async () => {
      if (!principalId) return null;
      try {
        const client = ICRCLedgerClient.getInstance();
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
