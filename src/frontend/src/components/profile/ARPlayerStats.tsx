import { Trophy, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ARPlayerStatsProps {
  data: {
    xp: number;
    level: number;
  } | undefined;
}

export default function ARPlayerStats({ data }: ARPlayerStatsProps) {
  if (!data) {
    return (
      <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 animate-pulse">
        <div className="h-32 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const xpForNextLevel = data.level * 100;
  const currentLevelXP = data.xp % xpForNextLevel;
  const xpProgress = (currentLevelXP / xpForNextLevel) * 100;

  return (
    <div className="bg-transparent backdrop-blur-md border-2 border-yellow-400 rounded-lg p-8 space-y-6">
      <h2 className="text-yellow-400 text-2xl font-bold mb-4 flex items-center gap-2">
        <Zap className="w-6 h-6" />
        Estatísticas do Jogador
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* XP Section */}
        <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/generated/xp-icon-transparent.dim_32x32.png"
              alt="XP"
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-yellow-400 text-3xl font-bold">{data.xp.toLocaleString()}</h3>
              <p className="text-yellow-400/70 text-sm">Pontos XP Totais</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-yellow-400">
              <span>XP para Nível {data.level + 1}</span>
              <span>{currentLevelXP.toLocaleString()} / {xpForNextLevel.toLocaleString()}</span>
            </div>
            <Progress value={xpProgress} className="h-3 bg-yellow-400/20">
              <div className="h-full bg-yellow-400 transition-all rounded-full" style={{ width: `${xpProgress}%` }} />
            </Progress>
          </div>
        </div>

        {/* Level Section */}
        <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <div>
              <h3 className="text-yellow-400 text-3xl font-bold">Nível {data.level}</h3>
              <p className="text-yellow-400/70 text-sm">Nível Atual</p>
            </div>
          </div>
          <div className="text-yellow-400/70 text-sm space-y-1">
            <p>• Raio de resgate: {data.xp} metros</p>
            <p>• Progresso: {Math.floor(xpProgress)}%</p>
            <p>• Próximo nível: {xpForNextLevel - currentLevelXP} XP restantes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
