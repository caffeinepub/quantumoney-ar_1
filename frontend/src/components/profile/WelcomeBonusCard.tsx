import { Gift, Lock, Unlock, Star, TrendingUp } from 'lucide-react';

interface WelcomeBonusCardProps {
  unlockedQMY: number;
  lockedQMY: number;
  xp: number;
}

export default function WelcomeBonusCard({ unlockedQMY, lockedQMY, xp }: WelcomeBonusCardProps) {
  const totalBonus = 1000;
  const vestingMonths = 9;
  const monthlyUnlock = 100;
  const unlockedPercent = Math.min(100, (unlockedQMY / totalBonus) * 100);

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-4">
      <h3 className="text-yellow-400 font-cinzel font-bold text-sm mb-4 flex items-center gap-2">
        <Gift className="w-4 h-4" /> Bónus de Boas-Vindas
      </h3>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Unlock className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-bold">Desbloqueado</span>
          </div>
          <p className="text-yellow-400 font-bold text-lg">{unlockedQMY}</p>
          <p className="text-yellow-400/50 text-xs">QMY</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Lock className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs font-bold">Bloqueado</span>
          </div>
          <p className="text-yellow-400 font-bold text-lg">{lockedQMY}</p>
          <p className="text-yellow-400/50 text-xs">QMY</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold">XP</span>
          </div>
          <p className="text-yellow-400 font-bold text-lg">{xp}</p>
          <p className="text-yellow-400/50 text-xs">pontos</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-yellow-400/60 mb-1">
          <span>Progresso de Vesting</span>
          <span>{unlockedPercent.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-black/50 border border-yellow-400/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500"
            style={{ width: `${unlockedPercent}%` }}
          />
        </div>
      </div>

      {/* Vesting schedule */}
      <div className="border-t border-yellow-400/20 pt-3">
        <div className="flex items-center gap-1 mb-2">
          <TrendingUp className="w-3 h-3 text-yellow-400/60" />
          <span className="text-yellow-400/60 text-xs">Vesting: {monthlyUnlock} QMY/mês × {vestingMonths} meses</span>
        </div>
        <p className="text-yellow-400/40 text-xs">
          Total do bónus: {totalBonus} QMY • 100 desbloqueados + 900 em vesting mensal
        </p>
      </div>
    </div>
  );
}
