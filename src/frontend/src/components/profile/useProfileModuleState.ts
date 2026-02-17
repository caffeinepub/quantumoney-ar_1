import { PlayerProfile } from '@/backend';
import type { Identity } from '@icp-sdk/core/agent';

export function useProfileModuleState(
  identity: Identity | undefined,
  userProfile: PlayerProfile | null | undefined,
  profileLoading: boolean,
  isFetched: boolean
) {
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const isRegistered = isAuthenticated && userProfile !== null && userProfile !== undefined;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return {
    isAuthenticated,
    isRegistered,
    showProfileSetup,
  };
}
