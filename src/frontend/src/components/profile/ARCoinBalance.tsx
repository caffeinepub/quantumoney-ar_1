import { Coins, Lock, Gift } from 'lucide-react';

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
        <div className="h-32 bg-yellow-400/10 rounded"></div>
      </div>
    );
  }

  const totalCoins = data.availableCoins + data.lockedCoins + data.bonusCoins;

  return (
    <div className="bg-transparent backdrop-blur-md border border-yellow-400 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <img
          src="/assets/generated/qmy-coin-gold-3d-transparent.dim_128x128.png"
          alt="QMY Coin"
          className="w-16 h-16"
        />
        <div>
          <h3 className="text-yellow-400 text-3xl font-bold">{totalCoins.toLocaleString()} QTM</h3>
          <p className="text-yellow-400/70 text-sm">Saldo Total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">Disponível</span>
          </div>
          <p className="text-yellow-400 text-2xl font-bold">{data.availableCoins.toLocaleString()}</p>
        </div>

        <div className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">Bloqueado</span>
          </div>
          <p className="text-yellow-400 text-2xl font-bold">{data.lockedCoins.toLocaleString()}</p>
        </div>

        <div className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">Bônus</span>
          </div>
          <p className="text-yellow-400 text-2xl font-bold">{data.bonusCoins.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
