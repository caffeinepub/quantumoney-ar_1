import React, { createContext, useContext, ReactNode } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetPlayerState } from '@/hooks/useQueries';
import { PlayerProfile } from '@/backend';

interface PlayerStateContextType {
  playerState: PlayerProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  principal: string | null;
  refresh: () => void;
}

const PlayerStateContext = createContext<PlayerStateContextType | undefined>(undefined);

export function PlayerStateProvider({ children }: { children: ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: playerState, isLoading, refetch } = useGetPlayerState();

  const isAuthenticated = !!identity && !isInitializing;
  const principal = identity?.getPrincipal().toString() || null;

  const value: PlayerStateContextType = {
    playerState: playerState || null,
    isLoading: isLoading || isInitializing,
    isAuthenticated,
    principal,
    refresh: () => refetch(),
  };

  return (
    <PlayerStateContext.Provider value={value}>
      {children}
    </PlayerStateContext.Provider>
  );
}

export function useUnifiedPlayerState() {
  const context = useContext(PlayerStateContext);
  if (!context) {
    throw new Error('useUnifiedPlayerState must be used within PlayerStateProvider');
  }
  return context;
}
