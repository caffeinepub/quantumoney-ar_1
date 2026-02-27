// Pure SVG vesting chart — no Recharts dependency, zero extra bundle cost.

interface VestingChartProps {
  data: Array<{ month: string; unlocked: number; locked: number }>;
}

export default function VestingChart({ data }: VestingChartProps) {
  if (!data || data.length === 0) return null;

  const W = 600;
  const H = 220;
  const PAD = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map(d => Math.max(d.unlocked, d.locked)), 1);

  const xStep = innerW / Math.max(data.length - 1, 1);
  const yScale = (v: number) => innerH - (v / maxVal) * innerH;

  const toPath = (key: 'unlocked' | 'locked') =>
    data
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${PAD.left + i * xStep},${PAD.top + yScale(d[key])}`)
      .join(' ');

  const toArea = (key: 'unlocked' | 'locked') => {
    const line = data
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${PAD.left + i * xStep},${PAD.top + yScale(d[key])}`)
      .join(' ');
    const lastX = PAD.left + (data.length - 1) * xStep;
    return `${line} L${lastX},${PAD.top + innerH} L${PAD.left},${PAD.top + innerH} Z`;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: PAD.top + yScale(maxVal * f),
    label: Math.round(maxVal * f).toLocaleString('pt-PT'),
  }));

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-4">
        📈 Gráfico de Vesting
      </h2>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320 }}>
          {/* Grid lines */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} y1={t.y} x2={PAD.left + innerW} y2={t.y} stroke="rgba(255,215,0,0.1)" strokeDasharray="4 4" />
              <text x={PAD.left - 6} y={t.y + 4} textAnchor="end" fill="rgba(255,215,0,0.5)" fontSize={10}>{t.label}</text>
            </g>
          ))}

          {/* Areas */}
          <path d={toArea('locked')} fill="rgba(249,115,22,0.15)" />
          <path d={toArea('unlocked')} fill="rgba(34,197,94,0.15)" />

          {/* Lines */}
          <path d={toPath('locked')} fill="none" stroke="#f97316" strokeWidth={2} />
          <path d={toPath('unlocked')} fill="none" stroke="#22c55e" strokeWidth={2} />

          {/* X axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={PAD.left + i * xStep}
              y={PAD.top + innerH + 18}
              textAnchor="middle"
              fill="rgba(255,215,0,0.5)"
              fontSize={10}
            >
              {d.month}
            </text>
          ))}

          {/* Axes */}
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + innerH} stroke="rgba(255,215,0,0.3)" />
          <line x1={PAD.left} y1={PAD.top + innerH} x2={PAD.left + innerW} y2={PAD.top + innerH} stroke="rgba(255,215,0,0.3)" />
        </svg>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-2 text-xs">
        <span className="flex items-center gap-1 text-green-400"><span className="w-3 h-0.5 bg-green-400 inline-block" /> Desbloqueado</span>
        <span className="flex items-center gap-1 text-orange-400"><span className="w-3 h-0.5 bg-orange-400 inline-block" /> Bloqueado</span>
      </div>
    </div>
  );
}
