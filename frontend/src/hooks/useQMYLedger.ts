import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { HttpAgent } from '@dfinity/agent';
import { ICRCLedgerClient, formatBalance } from '../lib/icrc/ledgerClient';

// Carteira A — QMY Ledger / Token Standard
const QMY_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

export function useQMYLedger() {
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery({
    queryKey: ['qmyLedger', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) return null;

      const agent = new HttpAgent({
        identity,
        host: 'https://ic0.app',
      });

      if (process.env.NODE_ENV !== 'production') {
        await agent.fetchRootKey().catch(() => {
          // ignore in dev
        });
      }

      const client = new ICRCLedgerClient(QMY_LEDGER_CANISTER_ID, agent);
      const balanceData = await client.getBalanceWithMetadata(identity.getPrincipal());

      return {
        balance: balanceData.balance,
        decimals: balanceData.decimals,
        symbol: balanceData.symbol,
        formatted: formatBalance(balanceData.balance, balanceData.decimals),
      };
    },
    enabled: !!identity && !isInitializing,
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 2,
  });
}
