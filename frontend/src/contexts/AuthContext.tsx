import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextValue {
  identity: ReturnType<typeof useInternetIdentity>['identity'];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginStatus: string;
  isLoggingIn: boolean;
  isLoginError: boolean;
  isLoginSuccess: boolean;
  isInitializing: boolean;
  principalId: string | null;
  noProfileError: string | null;
  clearNoProfileError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { login: iiLogin, clear, loginStatus, identity, isInitializing, isLoggingIn, isLoginError, isLoginSuccess } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [noProfileError, setNoProfileError] = useState<string | null>(null);

  const principalId = identity ? identity.getPrincipal().toString() : null;

  // When identity changes (login/logout), clear the no-profile error
  useEffect(() => {
    if (!identity) {
      setNoProfileError(null);
    }
  }, [identity]);

  const login = async () => {
    try {
      await iiLogin();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error?.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => iiLogin(), 300);
      }
    }
  };

  const logout = async () => {
    await clear();
    queryClient.clear();
    setNoProfileError(null);
  };

  const clearNoProfileError = () => setNoProfileError(null);

  return (
    <AuthContext.Provider
      value={{
        identity,
        login,
        logout,
        loginStatus,
        isLoggingIn,
        isLoginError,
        isLoginSuccess,
        isInitializing,
        principalId,
        noProfileError,
        clearNoProfileError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
