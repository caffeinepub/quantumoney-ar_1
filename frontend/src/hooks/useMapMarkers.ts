import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { MapMarker } from '../backend';

export function useGetMapMarkers() {
  const { actor, isFetching } = useActor();

  return useQuery<MapMarker[]>({
    queryKey: ['mapMarkers'],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMapMarkers();
      return result;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}
