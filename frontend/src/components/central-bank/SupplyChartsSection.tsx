// Pure SVG supply chart — no Recharts dependency, zero extra bundle cost.

interface SupplyChartData {
  period: string;
  total: number;
  circulating: number;
  locked: number;
}

interface SupplyChartsSectionProps {
  data: SupplyChartData[];
}

export default function SupplyChartsSection({ data }: SupplyChartsSectionProps) {
  if (!data || data.length === 0) return null;

  const W = 600;
  const H = 220;
  const PAD = { top: 20, right: 20, bottom: 40, left: 70 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map(d => d.total), 1);
  const barGroupW = innerW / data.length;
  const barW = Math.min(barGroupW * 0.3, 30);

  const yScale = (v: number) => innerH - (v / maxVal) * innerH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: PAD.top + yScale(maxVal * f),
    label: maxVal * f >= 1e9
      ? `${(maxVal * f / 1e9).toFixed(1)}B`
      : maxVal * f >= 1e6
      ? `${(maxVal * f / 1e6).toFixed(0)}M`
      : Math.round(maxVal * f).toLocaleString('pt-PT'),
  }));

  // Line path for circulating
  const linePath = data
    .map((d, i) => {
      const cx = PAD.left + i * barGroupW + barGroupW / 2;
      const cy = PAD.top + yScale(d.circulating);
      return `${i === 0 ? 'M' : 'L'}${cx},${cy}`;
    })
    .join(' ');

  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-4">
        📊 Supply Total vs. Circulante
      </h2>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320 }}>
          {/* Grid */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} y1={t.y} x2={PAD.left + innerW} y2={t.y} stroke="rgba(255,215,0,0.1)" strokeDasharray="4 4" />
              <text x={PAD.left - 6} y={t.y + 4} textAnchor="end" fill="rgba(255,215,0,0.5)" fontSize={9}>{t.label}</text>
            </g>
          ))}

          {/* Bars */}
          {data.map((d, i) => {
            const cx = PAD.left + i * barGroupW + barGroupW / 2;
            const totalH = (d.total / maxVal) * innerH;
            const lockedH = (d.locked / maxVal) * innerH;
            return (
              <g key={i}>
                {/* Total bar */}
                <rect
                  x={cx - barW - 2}
                  y={PAD.top + yScale(d.total)}
                  width={barW}
                  height={totalH}
                  fill="rgba(255,215,0,0.25)"
                  stroke="rgba(255,215,0,0.5)"
                  strokeWidth={1}
                />
                {/* Locked bar */}
                <rect
                  x={cx + 2}
                  y={PAD.top + yScale(d.locked)}
                  width={barW}
                  height={lockedH}
                  fill="rgba(249,115,22,0.25)"
                  stroke="rgba(249,115,22,0.5)"
                  strokeWidth={1}
                />
                {/* X label */}
                <text x={cx} y={PAD.top + innerH + 18} textAnchor="middle" fill="rgba(255,215,0,0.5)" fontSize={11}>
                  {d.period}
                </text>
              </g>
            );
          })}

          {/* Circulating line */}
          <path d={linePath} fill="none" stroke="#22c55e" strokeWidth={2} />
          {data.map((d, i) => {
            const cx = PAD.left + i * barGroupW + barGroupW / 2;
            const cy = PAD.top + yScale(d.circulating);
            return <circle key={i} cx={cx} cy={cy} r={3} fill="#22c55e" />;
          })}

          {/* Axes */}
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + innerH} stroke="rgba(255,215,0,0.3)" />
          <line x1={PAD.left} y1={PAD.top + innerH} x2={PAD.left + innerW} y2={PAD.top + innerH} stroke="rgba(255,215,0,0.3)" />
        </svg>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs">
        <span className="flex items-center gap-1 text-yellow-400"><span className="w-3 h-3 bg-yellow-400/30 border border-yellow-400/50 inline-block" /> Supply Total</span>
        <span className="flex items-center gap-1 text-orange-400"><span className="w-3 h-3 bg-orange-400/30 border border-orange-400/50 inline-block" /> Bloqueado</span>
        <span className="flex items-center gap-1 text-green-400"><span className="w-3 h-0.5 bg-green-400 inline-block" /> Circulante</span>
      </div>
    </div>
  );
}
