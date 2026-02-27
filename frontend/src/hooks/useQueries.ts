import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlayerProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<PlayerProfile | null>({
    queryKey: ['callerUserProfile'],
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

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: PlayerProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nickname, photoUrl }: { nickname: string; photoUrl: any | null }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProfile(nickname, photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
    },
  });
}

export function useGetUserIdForCaller() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['userIdForCaller'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserIdForCaller();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetMapMarkers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['mapMarkers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMapMarkers();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetChatMessages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['chatMessages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatMessages();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 5000,
  });
}

export function useSendChatMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.sendChatMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
    },
  });
}
