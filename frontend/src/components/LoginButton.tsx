import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface LoginButtonProps {
  className?: string;
  showText?: boolean;
}

export default function LoginButton({ className = '', showText = true }: LoginButtonProps) {
  const { login, logout, loginStatus, identity, noProfileError } = useAuth();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleAuth}
        disabled={isLoggingIn}
        className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
          isAuthenticated
            ? 'bg-muted hover:bg-muted/80 text-foreground border border-border'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
        } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoggingIn ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isAuthenticated ? (
          <LogOut className="w-4 h-4" />
        ) : (
          <LogIn className="w-4 h-4" />
        )}
        {showText && (
          <span className="text-sm">
            {isLoggingIn ? 'A entrar...' : isAuthenticated ? 'Sair' : 'Entrar'}
          </span>
        )}
      </button>
      {noProfileError && (
        <p className="text-xs text-destructive max-w-xs text-right">{noProfileError}</p>
      )}
    </div>
  );
}
