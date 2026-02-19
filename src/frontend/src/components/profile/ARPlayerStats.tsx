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
        <div className="h-24 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const xpForNextLevel = data.level * 100;
  const xpProgress = (data.xp % 100) / 100 * 100;

  return (
    <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/xp-icon-transparent.dim_32x32.png"
            alt="XP"
            className="w-12 h-12"
          />
          <div>
            <h3 className="text-yellow-400 text-2xl font-bold">{data.xp.toLocaleString()} XP</h3>
            <p className="text-yellow-400/70 text-sm">Experiência Total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="w-12 h-12 text-yellow-400" />
          <div>
            <h3 className="text-yellow-400 text-2xl font-bold">Nível {data.level}</h3>
            <p className="text-yellow-400/70 text-sm">Nível Atual</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-yellow-400">
          <span>Progresso para Nível {data.level + 1}</span>
          <span>{Math.floor(xpProgress)}%</span>
        </div>
        <Progress value={xpProgress} className="h-3 bg-yellow-400/20">
          <div className="h-full bg-yellow-400 transition-all" style={{ width: `${xpProgress}%` }} />
        </Progress>
      </div>
    </div>
  );
}
