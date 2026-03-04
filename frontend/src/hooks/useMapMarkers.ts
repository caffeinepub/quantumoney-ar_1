import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MapMarker } from '../backend';

export function useMapMarkers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MapMarker[]>({
    queryKey: ['mapMarkers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMapMarkers();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}
