import { useQuery } from '@tanstack/react-query';
import { useInternetIdentity } from './useInternetIdentity';
import { HttpAgent } from '@dfinity/agent';
import { ICPLedgerClient, formatICPBalance } from '../lib/icp/ledgerClient';

/**
 * Hook to fetch real ICP balance from on-chain ledger
 */
export function useICPLedger() {
  const { identity, isInitializing } = useInternetIdentity();

  return useQuery({
    queryKey: ['icpBalance', identity?.getPrincipal().toString()],
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

      const client = new ICPLedgerClient(agent);
      const balance = await client.getBalance(principal);

      return {
        balance,
        formatted: formatICPBalance(balance),
      };
    },
    enabled: !!identity && !isInitializing,
    staleTime: 10000, // 10 seconds
    retry: 2,
  });
}
