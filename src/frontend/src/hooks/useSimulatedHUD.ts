import { useState, useEffect } from 'react';

export interface HUDData {
  metersWalked: number;
  nearbySpawns: number;
}

export function useSimulatedHUD() {
  const [hudData, setHudData] = useState<HUDData>({
    metersWalked: 0,
    nearbySpawns: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHudData((prev) => ({
        metersWalked: prev.metersWalked + Math.floor(Math.random() * 5),
        nearbySpawns: Math.floor(Math.random() * 4),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return hudData;
}
