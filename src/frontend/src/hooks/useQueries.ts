import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PlayerProfile } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

// Get caller's user profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<PlayerProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Save caller's user profile
export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: PlayerProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Register player
export function useRegisterPlayer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nickname: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerPlayer(nickname);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
    },
  });
}

// Get player state
export function useGetPlayerState() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PlayerProfile | null>({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPlayerState();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3000,
    refetchInterval: 3000,
  });
}

// Get QMY balance for caller (from PlayerProfile)
export function useGetQMYBalance() {
  const { data: profile, isLoading, error } = useGetPlayerState();

  return {
    balance: profile?.availableTokens ?? BigInt(0),
    lockedBalance: profile?.bonusTokens ?? BigInt(0),
    isLoading,
    error,
  };
}

// Get ICP balance placeholder (backend returns mock data currently)
export function useGetICPBalance() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['icpBalance'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // Backend currently returns mock ICP data via qmy_accounts
      const accounts = await actor.qmy_accounts();
      if (accounts.length > 0) {
        return accounts[0].confirmed_balance;
      }
      return BigInt(0);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 5000,
  });
}

// Transfer QMY (using plantCoin as transfer mechanism for now)
export function useTransferQMY() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipient, amount }: { recipient: string; amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      
      // Using plantCoin as the transfer mechanism
      // In production, this would be a dedicated transfer method
      await actor.plantCoin({
        latitude: 0,
        longitude: 0,
        address: recipient,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Get swap quote (placeholder - backend needs implementation)
export function useGetSwapQuote() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ 
      fromToken, 
      toToken, 
      amountIn 
    }: { 
      fromToken: 'QMY' | 'ICP'; 
      toToken: 'QMY' | 'ICP'; 
      amountIn: bigint 
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      // Placeholder calculation - backend needs real swap quote method
      const rate = fromToken === 'QMY' ? 0.02 : 50; // 1 QMY = 0.02 ICP or 1 ICP = 50 QMY
      const amountOut = fromToken === 'QMY' 
        ? BigInt(Math.floor(Number(amountIn) * rate))
        : BigInt(Math.floor(Number(amountIn) * rate));
      
      const fee = amountOut / BigInt(100); // 1% fee
      const minAmountOut = amountOut - fee;

      return {
        amountOut,
        fee,
        minAmountOut,
        rate,
      };
    },
  });
}

// Execute swap (placeholder - backend needs implementation)
export function useExecuteSwap() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      fromToken, 
      toToken, 
      amountIn,
      minAmountOut 
    }: { 
      fromToken: 'QMY' | 'ICP'; 
      toToken: 'QMY' | 'ICP'; 
      amountIn: bigint;
      minAmountOut: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      // Placeholder - backend needs real swap execution method
      // For now, we'll throw an error indicating backend implementation needed
      throw new Error('Swap execution requires backend implementation');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
      queryClient.invalidateQueries({ queryKey: ['icpBalance'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
