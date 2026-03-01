import { useGetMapMarkers } from './useQueries';

// Re-export the unified map markers hook
export { useGetMapMarkers };

export function useMapMarkers() {
  const { data: markers = [], isLoading, error } = useGetMapMarkers();
  return { markers, isLoading, error };
}
