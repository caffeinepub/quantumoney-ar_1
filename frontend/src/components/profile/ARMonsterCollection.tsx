import { Ghost, Calendar, Zap, Award } from 'lucide-react';

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
        <div className="h-64 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const monsters = data.capturedMonsters;
  const totalEnergyBoost = monsters.reduce((sum, m) => sum + m.energyBoost, 0);

  return (
    <div className="bg-transparent backdrop-blur-md border-2 border-yellow-400 rounded-lg p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Ghost className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-yellow-400 text-2xl font-bold">Coleção de Monstros</h2>
            <p className="text-yellow-400/70 text-sm">{monsters.length} monstros capturados</p>
          </div>
        </div>
        {monsters.length > 0 && (
          <div className="bg-yellow-400/10 rounded-lg px-4 py-2 border border-yellow-400/30">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">+{totalEnergyBoost} Energia Total</span>
            </div>
          </div>
        )}
      </div>

      {monsters.length === 0 ? (
        <div className="text-center py-16">
          <Ghost className="w-32 h-32 text-yellow-400/30 mx-auto mb-6" />
          <p className="text-yellow-400 text-xl font-semibold mb-2">Nenhum monstro capturado ainda</p>
          <p className="text-yellow-400/70 text-base">
            Jogue QuantumoneyAR.app para capturar monstros e aumentar sua energia!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {monsters.map((monster, index) => {
            const iconPath = MONSTER_ICONS[monster.name] || '/assets/generated/monster-token-transparent.dim_128x128.png';
            const captureDate = new Date(Number(monster.captureTime) / 1000000);
            const formattedDate = captureDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            const formattedTime = captureDate.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={`${monster.name}-${index}`}
                className="bg-yellow-400/10 rounded-lg p-5 border-2 border-yellow-400/30 hover:border-yellow-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20"
              >
                <div className="flex flex-col items-center space-y-3">
                  {/* Monster Icon */}
                  <div className="relative">
                    <img
                      src={iconPath}
                      alt={monster.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                      #{index + 1}
                    </div>
                  </div>

                  {/* Monster Name */}
                  <h4 className="text-yellow-400 font-bold text-center text-base leading-tight">
                    {monster.name}
                  </h4>

                  {/* Monster Details */}
                  <div className="w-full space-y-2 text-xs">
                    {/* Capture Date */}
                    <div className="flex items-center gap-2 text-yellow-400/80 bg-yellow-400/5 rounded p-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-yellow-400">Capturado em:</span>
                        <span>{formattedDate} às {formattedTime}</span>
                      </div>
                    </div>

                    {/* Energy Boost */}
                    <div className="flex items-center gap-2 text-yellow-400/80 bg-yellow-400/5 rounded p-2">
                      <Zap className="w-4 h-4 flex-shrink-0 text-yellow-400" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-yellow-400">Bônus de Energia:</span>
                        <span className="text-yellow-400 font-bold">+{monster.energyBoost} energia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Collection Progress */}
      {monsters.length > 0 && (
        <div className="bg-yellow-400/5 rounded-lg p-4 border border-yellow-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Progresso da Coleção</span>
          </div>
          <p className="text-yellow-400/70 text-sm">
            Você capturou <strong className="text-yellow-400">{monsters.length}</strong> monstros únicos. 
            Continue jogando para completar sua coleção e ganhar bônus especiais!
          </p>
        </div>
      )}
    </div>
  );
}
