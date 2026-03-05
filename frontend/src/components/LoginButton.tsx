import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface LoginButtonProps {
  className?: string;
  showText?: boolean;
}

export default function LoginButton({ className = '', showText = true }: LoginButtonProps) {
  const { login, logout, isAuthenticated, isLoggingIn } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`flex items-center gap-2 px-4 py-2 font-rajdhani font-bold transition-all duration-200 ${
        isAuthenticated
          ? 'bg-transparent border border-gold-600 text-gold-400 hover:bg-gold-900/20'
          : 'bg-gold-500 hover:bg-gold-400 text-black'
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
  );
}
