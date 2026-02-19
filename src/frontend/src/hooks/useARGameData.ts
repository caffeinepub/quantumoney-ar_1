import { useQuery } from '@tanstack/react-query';
import { HttpAgent, Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { useInternetIdentity } from './useInternetIdentity';

// AR Game Canister IDs
const AR_CANISTERS = {
  profile: 'ippxc-5iaaa-aaaae-qgwqq-cai',
  dao: 'x5shd-hqaaa-aaaap-qrdgq-cai',
  bridge: 'i7nyb-2yaaa-aaaaj-qowiq-cai',
  additional: 'lkawl-3qaaa-aaaac-qdsoq-cai',
};

interface ARGameData {
  xp: number;
  level: number;
  availableCoins: number;
  lockedCoins: number;
  bonusCoins: number;
  capturedMonsters: Array<{
    name: string;
    captureTime: number;
    energyBoost: number;
  }>;
}

// Simplified IDL for AR game canisters
const arGameIdl = ({ IDL }: any) => {
  const Monster = IDL.Record({
    name: IDL.Text,
    energyBoost: IDL.Nat,
    spawnFrequency: IDL.Nat,
  });

  const CapturedMonster = IDL.Record({
    monster: Monster,
    captureTime: IDL.Int,
  });

  const PlayerProfile = IDL.Record({
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
    getCallerUserProfile: IDL.Func([], [IDL.Opt(PlayerProfile)], ['query']),
    getPlayerState: IDL.Func([], [IDL.Opt(PlayerProfile)], ['query']),
  });
};

async function fetchARGameData(identity: any): Promise<ARGameData> {
  try {
    const agent = await HttpAgent.create({
      identity,
      host: 'https://ic0.app',
    });

    // In development, fetch the root key
    if (process.env.NODE_ENV !== 'production') {
      await agent.fetchRootKey().catch(() => {
        console.warn('Unable to fetch root key in development');
      });
    }

    // Try to fetch from the main profile canister
    const profileActor = Actor.createActor(arGameIdl, {
      agent,
      canisterId: AR_CANISTERS.profile,
    });

    const profileResult: any = await profileActor.getCallerUserProfile();

    // Check if profileResult is an array (Option type from Candid)
    if (Array.isArray(profileResult) && profileResult.length > 0 && profileResult[0]) {
      const profile = profileResult[0];
      return {
        xp: Number(profile.xp),
        level: Number(profile.level),
        availableCoins: Number(profile.availableTokens),
        lockedCoins: Number(profile.plantedTokens),
        bonusCoins: Number(profile.bonusTokens),
        capturedMonsters: profile.capturedMonsters.map((cm: any) => ({
          name: cm.monster.name,
          captureTime: Number(cm.captureTime),
          energyBoost: Number(cm.monster.energyBoost),
        })),
      };
    }

    // Check if profileResult is a direct object (null check)
    if (profileResult && typeof profileResult === 'object' && !Array.isArray(profileResult)) {
      return {
        xp: Number(profileResult.xp || 0),
        level: Number(profileResult.level || 1),
        availableCoins: Number(profileResult.availableTokens || 0),
        lockedCoins: Number(profileResult.plantedTokens || 0),
        bonusCoins: Number(profileResult.bonusTokens || 0),
        capturedMonsters: (profileResult.capturedMonsters || []).map((cm: any) => ({
          name: cm.monster.name,
          captureTime: Number(cm.captureTime),
          energyBoost: Number(cm.monster.energyBoost),
        })),
      };
    }

    // Return default data if no profile found
    return {
      xp: 0,
      level: 1,
      availableCoins: 0,
      lockedCoins: 0,
      bonusCoins: 0,
      capturedMonsters: [],
    };
  } catch (error) {
    console.error('Error fetching AR game data:', error);
    throw new Error('Não foi possível conectar aos canisters do jogo AR');
  }
}

export function useARGameData() {
  const { identity } = useInternetIdentity();

  return useQuery<ARGameData>({
    queryKey: ['arGameData', identity?.getPrincipal().toString()],
    queryFn: () => {
      if (!identity) {
        throw new Error('Identidade não disponível');
      }
      return fetchARGameData(identity);
    },
    enabled: !!identity,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    retry: 2,
  });
}
