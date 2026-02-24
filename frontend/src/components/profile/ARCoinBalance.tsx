import { Coins, Lock, Gift, Wallet } from 'lucide-react';

interface ARCoinBalanceProps {
  data: {
    availableCoins: number;
    lockedCoins: number;
    bonusCoins: number;
  } | undefined;
}

export default function ARCoinBalance({ data }: ARCoinBalanceProps) {
  if (!data) {
    return (
      <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 animate-pulse">
        <div className="h-48 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const totalCoins = data.availableCoins + data.lockedCoins + data.bonusCoins;

  return (
    <div className="bg-transparent backdrop-blur-md border-2 border-yellow-400 rounded-lg p-8 space-y-6">
      <h2 className="text-yellow-400 text-2xl font-bold mb-4 flex items-center gap-2">
        <Wallet className="w-6 h-6" />
        Saldo de Moedas QTM
      </h2>

      {/* Total Balance */}
      <div className="bg-yellow-400/20 rounded-lg p-6 border-2 border-yellow-400">
        <div className="flex items-center gap-4">
          <img
            src="/assets/generated/qmy-coin-gold-3d-transparent.dim_128x128.png"
            alt="QMY Coin"
            className="w-20 h-20"
          />
          <div>
            <h3 className="text-yellow-400 text-4xl font-bold">{totalCoins.toLocaleString()}</h3>
            <p className="text-yellow-400/70 text-lg">Saldo Total QTM</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Available Tokens */}
        <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30 hover:border-yellow-400 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <Coins className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-base font-semibold">Desbloqueado</span>
          </div>
          <p className="text-yellow-400 text-3xl font-bold mb-2">{data.availableCoins.toLocaleString()}</p>
          <p className="text-yellow-400/70 text-xs">Disponível para uso imediato</p>
        </div>

        {/* Locked Tokens (Planted) */}
        <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30 hover:border-yellow-400 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-base font-semibold">Bloqueado</span>
          </div>
          <p className="text-yellow-400 text-3xl font-bold mb-2">{data.lockedCoins.toLocaleString()}</p>
          <p className="text-yellow-400/70 text-xs">Moedas plantadas (30 dias)</p>
        </div>

        {/* Bonus Tokens */}
        <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30 hover:border-yellow-400 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-base font-semibold">Bônus</span>
          </div>
          <p className="text-yellow-400 text-3xl font-bold mb-2">{data.bonusCoins.toLocaleString()}</p>
          <p className="text-yellow-400/70 text-xs">Tokens de bônus (vesting)</p>
        </div>
      </div>

      {/* Summary Info */}
      <div className="bg-yellow-400/5 rounded-lg p-4 border border-yellow-400/20">
        <p className="text-yellow-400/70 text-sm">
          <strong className="text-yellow-400">Nota:</strong> Saldo desbloqueado pode ser usado imediatamente. 
          Saldo bloqueado são moedas plantadas que serão liberadas após 30 dias. 
          Bônus são tokens em vesting que serão liberados gradualmente.
        </p>
      </div>
    </div>
  );
}
