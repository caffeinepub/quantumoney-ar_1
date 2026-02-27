import { TrendingUp, Lock, Flame, CircleDollarSign } from 'lucide-react';

interface TokenomicsData {
  totalSupply: number;
  circulatingSupply: number;
  lockedSupply: number;
  vestingSupply: number;
  burnedTokens: number;
}

interface TokenomicsSectionProps {
  data: TokenomicsData;
}

export default function TokenomicsSection({ data }: TokenomicsSectionProps) {
  const fmt = (n: number) => n.toLocaleString('pt-PT');
  const pct = (n: number) => data.totalSupply > 0 ? ((n / data.totalSupply) * 100).toFixed(2) : '0.00';

  const metrics = [
    {
      label: 'Supply Total',
      value: fmt(data.totalSupply),
      pct: '100.00',
      icon: CircleDollarSign,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-400/40',
    },
    {
      label: 'Em Circulação',
      value: fmt(data.circulatingSupply),
      pct: pct(data.circulatingSupply),
      icon: TrendingUp,
      color: 'text-green-400',
      borderColor: 'border-green-400/40',
    },
    {
      label: 'Bloqueado',
      value: fmt(data.lockedSupply),
      pct: pct(data.lockedSupply),
      icon: Lock,
      color: 'text-orange-400',
      borderColor: 'border-orange-400/40',
    },
    {
      label: 'Em Vesting',
      value: fmt(data.vestingSupply),
      pct: pct(data.vestingSupply),
      icon: TrendingUp,
      color: 'text-blue-400',
      borderColor: 'border-blue-400/40',
    },
    {
      label: 'Queimados',
      value: fmt(data.burnedTokens),
      pct: pct(data.burnedTokens),
      icon: Flame,
      color: 'text-red-400',
      borderColor: 'border-red-400/40',
    },
  ];

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-6 flex items-center gap-2">
        <CircleDollarSign className="w-5 h-5" /> Tokenomics QMY
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`border ${m.borderColor} bg-black/20 p-4 rounded-sm text-center`}>
              <Icon className={`w-5 h-5 ${m.color} mx-auto mb-2`} />
              <p className={`font-bold text-xl ${m.color}`}>{m.value}</p>
              <p className="text-yellow-400/40 text-xs mt-0.5">{m.pct}%</p>
              <p className="text-yellow-400/60 text-xs mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Supply bar */}
      <div className="mt-6">
        <div className="flex text-xs text-yellow-400/60 justify-between mb-1">
          <span>Distribuição do Supply</span>
          <span>{fmt(data.totalSupply)} QMY total</span>
        </div>
        <div className="h-4 bg-black/50 border border-yellow-400/20 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-green-500/70 transition-all"
            style={{ width: `${pct(data.circulatingSupply)}%` }}
            title={`Circulação: ${pct(data.circulatingSupply)}%`}
          />
          <div
            className="h-full bg-orange-500/70 transition-all"
            style={{ width: `${pct(data.lockedSupply)}%` }}
            title={`Bloqueado: ${pct(data.lockedSupply)}%`}
          />
          <div
            className="h-full bg-blue-500/70 transition-all"
            style={{ width: `${pct(data.vestingSupply)}%` }}
            title={`Vesting: ${pct(data.vestingSupply)}%`}
          />
          <div
            className="h-full bg-red-500/70 transition-all"
            style={{ width: `${pct(data.burnedTokens)}%` }}
            title={`Queimado: ${pct(data.burnedTokens)}%`}
          />
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-xs">
          {[
            { color: 'bg-green-500/70', label: 'Circulação' },
            { color: 'bg-orange-500/70', label: 'Bloqueado' },
            { color: 'bg-blue-500/70', label: 'Vesting' },
            { color: 'bg-red-500/70', label: 'Queimado' },
          ].map(l => (
            <span key={l.label} className="flex items-center gap-1 text-yellow-400/60">
              <span className={`w-2 h-2 rounded-full ${l.color}`} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
