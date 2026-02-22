import { useQuery } from '@tanstack/react-query';
import { HttpAgent, Actor } from '@dfinity/agent';
import { useInternetIdentity } from './useInternetIdentity';

// AR Game Canister IDs - all four canisters from QuantumoneyAR.app
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

    // Try to fetch from all four canisters and aggregate data
    const results = await Promise.allSettled([
      // Profile canister
      (async () => {
        const actor = Actor.createActor(arGameIdl, {
          agent,
          canisterId: AR_CANISTERS.profile,
        });
        return actor.getCallerUserProfile();
      })(),
      // DAO canister
      (async () => {
        const actor = Actor.createActor(arGameIdl, {
          agent,
          canisterId: AR_CANISTERS.dao,
        });
        return actor.getCallerUserProfile();
      })(),
      // Bridge canister
      (async () => {
        const actor = Actor.createActor(arGameIdl, {
          agent,
          canisterId: AR_CANISTERS.bridge,
        });
        return actor.getCallerUserProfile();
      })(),
      // Additional canister
      (async () => {
        const actor = Actor.createActor(arGameIdl, {
          agent,
          canisterId: AR_CANISTERS.additional,
        });
        return actor.getCallerUserProfile();
      })(),
    ]);

    // Aggregate data from all successful canister calls
    let aggregatedData: ARGameData = {
      xp: 0,
      level: 1,
      availableCoins: 0,
      lockedCoins: 0,
      bonusCoins: 0,
      capturedMonsters: [],
    };

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const profileResult: any = result.value;

        // Handle array format (Option type from Candid)
        if (Array.isArray(profileResult) && profileResult.length > 0 && profileResult[0]) {
          const profile = profileResult[0];
          aggregatedData.xp += Number(profile.xp || 0);
          aggregatedData.level = Math.max(aggregatedData.level, Number(profile.level || 1));
          aggregatedData.availableCoins += Number(profile.availableTokens || 0);
          aggregatedData.lockedCoins += Number(profile.plantedTokens || 0);
          aggregatedData.bonusCoins += Number(profile.bonusTokens || 0);
          
          if (profile.capturedMonsters && Array.isArray(profile.capturedMonsters)) {
            const monsters = profile.capturedMonsters.map((cm: any) => ({
              name: cm.monster.name,
              captureTime: Number(cm.captureTime),
              energyBoost: Number(cm.monster.energyBoost),
            }));
            aggregatedData.capturedMonsters.push(...monsters);
          }
        }
        // Handle object format
        else if (profileResult && typeof profileResult === 'object' && !Array.isArray(profileResult)) {
          aggregatedData.xp += Number(profileResult.xp || 0);
          aggregatedData.level = Math.max(aggregatedData.level, Number(profileResult.level || 1));
          aggregatedData.availableCoins += Number(profileResult.availableTokens || 0);
          aggregatedData.lockedCoins += Number(profileResult.plantedTokens || 0);
          aggregatedData.bonusCoins += Number(profileResult.bonusTokens || 0);
          
          if (profileResult.capturedMonsters && Array.isArray(profileResult.capturedMonsters)) {
            const monsters = profileResult.capturedMonsters.map((cm: any) => ({
              name: cm.monster.name,
              captureTime: Number(cm.captureTime),
              energyBoost: Number(cm.monster.energyBoost),
            }));
            aggregatedData.capturedMonsters.push(...monsters);
          }
        }
      }
    }

    // Remove duplicate monsters based on name and capture time
    const uniqueMonsters = aggregatedData.capturedMonsters.filter(
      (monster, index, self) =>
        index === self.findIndex((m) => m.name === monster.name && m.captureTime === monster.captureTime)
    );
    aggregatedData.capturedMonsters = uniqueMonsters;

    return aggregatedData;
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
