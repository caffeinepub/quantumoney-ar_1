import React, { createContext, useContext, useCallback, useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isInitializing: boolean;
  principalId: string | null;
  // Legacy compatibility fields
  identity: ReturnType<typeof useInternetIdentity>['identity'];
  loginStatus: string;
  noProfileError: string | null;
  clearNoProfileError: () => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  showWelcomeBonus: boolean;
  welcomeBonusQmy: number;
  welcomeBonusXp: number;
  dismissWelcomeBonus: () => void;
  triggerWelcomeBonus: (qmy: number, xp: number) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login: iiLogin, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(false);
  const [welcomeBonusQmy, setWelcomeBonusQmy] = useState(1000);
  const [welcomeBonusXp, setWelcomeBonusXp] = useState(100);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const principalId = identity?.getPrincipal().toString() ?? null;

  const login = useCallback(async () => {
    try {
      await iiLogin();
    } catch (error: unknown) {
      const err = error as Error;
      if (err?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => iiLogin(), 300);
      } else {
        throw error;
      }
    }
  }, [iiLogin, clear]);

  const logout = useCallback(async () => {
    await clear();
    queryClient.clear();
  }, [clear, queryClient]);

  const triggerWelcomeBonus = useCallback((qmy: number, xp: number) => {
    setWelcomeBonusQmy(qmy);
    setWelcomeBonusXp(xp);
    setShowWelcomeBonus(true);
  }, []);

  const dismissWelcomeBonus = useCallback(() => {
    setShowWelcomeBonus(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoggingIn,
        isInitializing,
        principalId,
        // Legacy compatibility
        identity,
        loginStatus,
        noProfileError: null,
        clearNoProfileError: () => {},
        login,
        logout,
        showWelcomeBonus,
        welcomeBonusQmy,
        welcomeBonusXp,
        dismissWelcomeBonus,
        triggerWelcomeBonus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
