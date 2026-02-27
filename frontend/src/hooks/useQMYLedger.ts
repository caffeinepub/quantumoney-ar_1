import { useQuery } from '@tanstack/react-query';
import { ICRCLedgerClient } from '../lib/icrc/ledgerClient';
import { HttpAgent } from '@dfinity/agent';

export function useQMYLedger(principalId?: string) {
  return useQuery<bigint>({
    queryKey: ['qmyBalance', principalId ?? ''],
    queryFn: async () => {
      if (!principalId || principalId === '2vxsx-fae') return 0n;
      try {
        const agent = await HttpAgent.create({ host: 'https://ic0.app' });
        const client = new ICRCLedgerClient(agent);
        return await client.getBalance(principalId);
      } catch {
        return 0n;
      }
    },
    enabled: !!principalId && principalId !== '2vxsx-fae',
    staleTime: 30_000,
    retry: 1,
  });
}
