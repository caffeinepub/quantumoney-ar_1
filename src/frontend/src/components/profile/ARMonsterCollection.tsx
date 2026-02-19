import { Ghost, Calendar, Zap } from 'lucide-react';

interface ARMonsterCollectionProps {
  data: {
    capturedMonsters: Array<{
      name: string;
      captureTime: number;
      energyBoost: number;
    }>;
  } | undefined;
}

const MONSTER_ICONS: Record<string, string> = {
  'Bitcoin Monster': '/assets/generated/btc-monster-transparent.dim_128x128.png',
  'Ethereum Monster': '/assets/generated/eth-monster-transparent.dim_128x128.png',
  'Solana Monster': '/assets/generated/sol-monster-transparent.dim_128x128.png',
  'BNB Monster': '/assets/generated/bnb-monster-transparent.dim_128x128.png',
  'XRP Monster': '/assets/generated/xrp-monster-transparent.dim_128x128.png',
  'Dogecoin Monster': '/assets/generated/doge-monster-transparent.dim_128x128.png',
  'Cardano Monster': '/assets/generated/dolo-monster-transparent.dim_128x128.png',
  'Litecoin Monster': '/assets/generated/ltc-monster-transparent.dim_128x128.png',
  'Chainlink Monster': '/assets/generated/link-monster-transparent.dim_128x128.png',
  'ICP Monster': '/assets/generated/icp-monster-transparent.dim_128x128.png',
  'Sui Monster': '/assets/generated/sui-monster-transparent.dim_128x128.png',
  'Tao Monster': '/assets/generated/tao-monster-transparent.dim_128x128.png',
  'Trump Monster': '/assets/generated/trump-monster-transparent.dim_128x128.png',
  'Ondo Monster': '/assets/generated/ondo-monster-transparent.dim_128x128.png',
  'Ena Monster': '/assets/generated/ena-monster-transparent.dim_128x128.png',
  'WLFI Monster': '/assets/generated/wlfi-monster-transparent.dim_128x128.png',
};

export default function ARMonsterCollection({ data }: ARMonsterCollectionProps) {
  if (!data) {
    return (
      <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 animate-pulse">
        <div className="h-48 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const monsters = data.capturedMonsters;

  return (
    <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ghost className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-yellow-400 text-2xl font-bold">Monstros Capturados</h3>
            <p className="text-yellow-400/70 text-sm">{monsters.length} monstros na coleção</p>
          </div>
        </div>
      </div>

      {monsters.length === 0 ? (
        <div className="text-center py-12">
          <Ghost className="w-24 h-24 text-yellow-400/30 mx-auto mb-4" />
          <p className="text-yellow-400 text-lg">Nenhum monstro capturado ainda</p>
          <p className="text-yellow-400/70 text-sm mt-2">
            Jogue QuantumoneyAR.app para capturar monstros!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {monsters.map((monster, index) => {
            const iconPath = MONSTER_ICONS[monster.name] || '/assets/generated/monster-token-transparent.dim_128x128.png';
            const captureDate = new Date(Number(monster.captureTime) / 1000000);

            return (
              <div
                key={index}
                className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/30 hover:border-yellow-400 transition-all hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-3">
                  <img
                    src={iconPath}
                    alt={monster.name}
                    className="w-20 h-20 object-contain"
                  />
                  <h4 className="text-yellow-400 font-bold text-center text-sm">
                    {monster.name}
                  </h4>
                  <div className="w-full space-y-2 text-xs">
                    <div className="flex items-center justify-between text-yellow-400/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Capturado</span>
                      </div>
                      <span>{captureDate.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center justify-between text-yellow-400/70">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>Energia</span>
                      </div>
                      <span>+{monster.energyBoost}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
