import { useUnifiedPlayerState as usePlayerStateContext } from '@/contexts/PlayerStateContext';

export function useUnifiedPlayerState() {
  return usePlayerStateContext();
}
