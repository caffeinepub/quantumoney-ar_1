import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { HttpAgent } from '@dfinity/agent';
import { ICRCLedgerClient, formatBalance } from '../lib/icrc/ledgerClient';

// QMY Ledger canister ID
const QMY_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

/**
 * Hook to fetch real QMY balance from on-chain ledger
 */
export function useQMYLedger() {
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery({
    queryKey: ['qmyBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) {
        throw new Error('Not authenticated');
      }

      const principal = identity.getPrincipal();
      
      // Create agent with the authenticated identity
      const agent = new HttpAgent({
        identity,
        host: 'https://ic0.app',
      });

      // In development, fetch root key
      if (process.env.NODE_ENV !== 'production') {
        await agent.fetchRootKey().catch(err => {
          console.warn('Unable to fetch root key:', err);
        });
      }

      const client = new ICRCLedgerClient(QMY_LEDGER_CANISTER_ID, agent);
      const balanceData = await client.getBalanceWithMetadata(principal);

      return {
        balance: balanceData.balance,
        decimals: balanceData.decimals,
        symbol: balanceData.symbol,
        formatted: formatBalance(balanceData.balance, balanceData.decimals),
      };
    },
    enabled: !!identity && !isInitializing,
    staleTime: 10000, // 10 seconds
    retry: 2,
  });
}
