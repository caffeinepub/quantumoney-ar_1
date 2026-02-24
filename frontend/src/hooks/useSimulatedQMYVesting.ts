import { useState, useEffect } from 'react';
import { calculateVesting, type VestingInfo } from '@/lib/qmy/simulatedVesting';

const STORAGE_KEY = 'qmy_simulation_start_date';
const ENABLED_KEY = 'qmy_simulation_enabled';

export function useSimulatedQMYVesting() {
  const [simulationEnabled, setSimulationEnabled] = useState(false);
  const [vestingInfo, setVestingInfo] = useState<VestingInfo>({
    available: 100,
    locked: 900,
    nextUnlock: null,
  });

  useEffect(() => {
    const enabled = localStorage.getItem(ENABLED_KEY) === 'true';
    setSimulationEnabled(enabled);

    if (enabled) {
      let startDateStr = localStorage.getItem(STORAGE_KEY);
      if (!startDateStr) {
        const now = new Date();
        startDateStr = now.toISOString();
        localStorage.setItem(STORAGE_KEY, startDateStr);
      }
      const startDate = new Date(startDateStr);
      const info = calculateVesting(startDate);
      setVestingInfo(info);
    }
  }, [simulationEnabled]);

  const toggleSimulation = () => {
    const newEnabled = !simulationEnabled;
    setSimulationEnabled(newEnabled);
    localStorage.setItem(ENABLED_KEY, String(newEnabled));

    if (newEnabled) {
      const now = new Date();
      localStorage.setItem(STORAGE_KEY, now.toISOString());
      const info = calculateVesting(now);
      setVestingInfo(info);
    }
  };

  return {
    simulationEnabled,
    toggleSimulation,
    available: vestingInfo.available,
    locked: vestingInfo.locked,
    nextUnlock: vestingInfo.nextUnlock,
  };
}
