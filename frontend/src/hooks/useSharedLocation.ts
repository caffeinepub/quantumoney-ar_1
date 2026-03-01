import { useState, useEffect, useRef } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface UseSharedLocationReturn {
  location: LocationState | null;
  error: string | null;
  isLoading: boolean;
}

export function useSharedLocation(): UseSharedLocationReturn {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste dispositivo.');
      setIsLoading(false);
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setError(null);
        setIsLoading(false);
      },
      () => {
        setError('Não foi possível obter a localização. Verifique as permissões de GPS.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  return { location, error, isLoading };
}
