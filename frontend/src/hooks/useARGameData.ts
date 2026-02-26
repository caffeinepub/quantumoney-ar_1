import { useQuery } from '@tanstack/react-query';
import { HttpAgent, Actor } from '@dfinity/agent';
import { useInternetIdentity } from './useInternetIdentity';
import type { PlayerProfile } from '../backend';

// Carteira A — Logic/Backend canister
const LOGIC_CANISTER_ID = 'ckmsk-taaaa-aaaah-atfca-cai';
const IC_HOST = 'https://ic0.app';

// Use any-typed IDL factory to avoid type incompatibility with @dfinity/candid versions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const idlFactory = ({ IDL }: any) => {
  const CapturedMonster = IDL.Record({
    monster: IDL.Record({
      name: IDL.Text,
      energyBoost: IDL.Nat,
      spawnFrequency: IDL.Nat,
    }),
    captureTime: IDL.Int,
  });

  const PlayerProfileIDL = IDL.Record({
    xp: IDL.Nat,
    nickname: IDL.Text,
    level: IDL.Nat,
    capturedMonsters: IDL.Vec(CapturedMonster),
    availableTokens: IDL.Nat,
    plantedTokens: IDL.Nat,
    bonusTokens: IDL.Nat,
    registered: IDL.Bool,
    energy: IDL.Nat,
  });

  return IDL.Service({
    getCallerUserProfile: IDL.Func([], [IDL.Opt(PlayerProfileIDL)], ['query']),
  });
};

export function useARGameData() {
  const { identity } = useInternetIdentity();

  return useQuery<PlayerProfile | null>({
    queryKey: ['arGameData', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) return null;

      try {
        const agent = await HttpAgent.create({
          identity,
          host: IC_HOST,
        });

        // Only fetch root key in local development
        if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
          try { await agent.fetchRootKey(); } catch { /* ignore */ }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actor = Actor.createActor(idlFactory as any, {
          agent,
          canisterId: LOGIC_CANISTER_ID,
        }) as unknown as { getCallerUserProfile: () => Promise<[PlayerProfile] | []> };

        const result = await actor.getCallerUserProfile();

        if (Array.isArray(result) && result.length > 0) {
          return result[0] as PlayerProfile;
        }
        return null;
      } catch (err) {
        console.error('useARGameData error:', err);
        return null;
      }
    },
    enabled: !!identity,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
