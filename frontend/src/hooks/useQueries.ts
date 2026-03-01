import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PlayerProfile, MapMarker, ChatMessage } from '../backend';

// ── Profile ───────────────────────────────────────────────────────────────────

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

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nickname, photoUrl }: { nickname: string; photoUrl: import('../backend').ExternalBlob | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProfile(nickname, photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ── Map Markers ───────────────────────────────────────────────────────────────

export function useGetMapMarkers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MapMarker[]>({
    queryKey: ['mapMarkers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMapMarkers();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export function useGetChatMessages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ChatMessage[]>({
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
      return actor.sendChatMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
    },
  });
}

// ── AR Spots ──────────────────────────────────────────────────────────────────

export function useGetARSpotClaims() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['arSpotClaims'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getARSpotClaims();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetARSpotDistributions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['arSpotDistributions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getARSpotDistributions();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ── Planted Coins ─────────────────────────────────────────────────────────────

export function useGetPlantedCoins() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['plantedCoins'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlantedCoins();
    },
    enabled: !!actor && !actorFetching,
  });
}
