import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { generateDeterministicMarkers } from '@/lib/map/staticMapProjection';

interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: 'coin' | 'monster';
}

interface SharedMapState {
  markers: MapMarker[];
  selectedMarkerId: string | null;
  setSelectedMarkerId: (id: string | null) => void;
  refreshMarkers: (seed: string, count: number) => void;
}

const SharedMapStateContext = createContext<SharedMapState | undefined>(undefined);

export function SharedMapStateProvider({ children }: { children: ReactNode }) {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const refreshMarkers = useCallback((seed: string, count: number) => {
    const newMarkers = generateDeterministicMarkers(seed, count);
    setMarkers(newMarkers);
  }, []);

  return (
    <SharedMapStateContext.Provider
      value={{
        markers,
        selectedMarkerId,
        setSelectedMarkerId,
        refreshMarkers,
      }}
    >
      {children}
    </SharedMapStateContext.Provider>
  );
}

export function useSharedMapState() {
  const context = useContext(SharedMapStateContext);
  if (!context) {
    throw new Error('useSharedMapState must be used within SharedMapStateProvider');
  }
  return context;
}
