import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { HttpAgent } from '@dfinity/agent';
import { queryICRCTransactions, Transaction } from '../lib/icrc/transactions';

const QMY_LEDGER_CANISTER_ID = '5o54h-giaaa-aaaad-aentq-cai';

/**
 * Hook to fetch QMY transaction history
 * Returns null if transactions are not supported by the ledger
 */
export function useQMYTransactions(limit: number = 20) {
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery({
    queryKey: ['qmyTransactions', identity?.getPrincipal().toString(), limit],
    queryFn: async (): Promise<Transaction[] | null> => {
      if (!identity) {
        throw new Error('Not authenticated');
      }

      const principal = identity.getPrincipal();
      
      const agent = new HttpAgent({
        identity,
        host: 'https://ic0.app',
      });

      if (process.env.NODE_ENV !== 'production') {
        await agent.fetchRootKey().catch(err => {
          console.warn('Unable to fetch root key:', err);
        });
      }

      const transactions = await queryICRCTransactions(
        QMY_LEDGER_CANISTER_ID,
        agent,
        principal,
        limit
      );

      return transactions;
    },
    enabled: !!identity && !isInitializing,
    staleTime: 15000, // 15 seconds
    retry: false,
  });
}
