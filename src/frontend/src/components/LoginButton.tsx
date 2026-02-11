import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const isDisabled = isLoggingIn || isInitializing;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const principalText = identity
    ? `${identity.getPrincipal().toString().slice(0, 6)}...${identity.getPrincipal().toString().slice(-4)}`
    : '';

  return (
    <Button
      onClick={handleAuth}
      disabled={isDisabled}
      variant={isAuthenticated ? 'outline' : 'default'}
      size="sm"
      className={`${
        isAuthenticated
          ? 'border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold-subtle hover:shadow-gold'
      } transition-all duration-300 font-medium`}
    >
      {isInitializing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="hidden sm:inline">Initializing...</span>
        </>
      ) : isLoggingIn ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="hidden sm:inline">Logging in...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Logout</span>
          {principalText && <span className="hidden lg:inline ml-2 text-xs opacity-70">({principalText})</span>}
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </>
      )}
    </Button>
  );
}
