import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { PlayerProfile } from '../backend';

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
