import { useState } from 'react';
import { useLuxuryBankData } from '../hooks/useLuxuryBank';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// ── Types ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color = 'text-qmy-gold' }: StatCardProps) {
  return (
    <div className="luxury-glass-card p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-qmy-gold/60 text-xs font-rajdhani uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-cinzel font-bold text-2xl ${color}`}>{value}</div>
      {sub && <div className="text-qmy-gold/50 text-xs font-rajdhani">{sub}</div>}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────
function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9.5h4.5a1.5 1.5 0 010 3H10.5a1.5 1.5 0 000 3H15" />
    </svg>
  );
}
function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}
function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2C8 7 6 10 6 14a6 6 0 0012 0c0-4-2-7-6-12z" />
    </svg>
  );
}
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

// ── Static data ────────────────────────────────────────────────────────────
const vestingRows = [
  { category: 'Bónus de Boas-Vindas', total: '1,000 QMY', unlocked: '100 QMY', locked: '900 QMY', period: '9 meses' },
  { category: 'Equipa & Fundadores', total: '100,000 QMY', unlocked: '0 QMY', locked: '100,000 QMY', period: '24 meses' },
  { category: 'Reserva Ecossistema', total: '200,000 QMY', unlocked: '20,000 QMY', locked: '180,000 QMY', period: '18 meses' },
  { category: 'Pré-Venda Seed', total: '50,000 QMY', unlocked: '5,000 QMY', locked: '45,000 QMY', period: '12 meses' },
  { category: 'Recompensas AR', total: '300,000 QMY', unlocked: '30,000 QMY', locked: '270,000 QMY', period: '36 meses' },
  { category: 'Tesouraria DAO', total: '150,000 QMY', unlocked: '0 QMY', locked: '150,000 QMY', period: 'Governança' },
];

const burnRows = [
  { date: 'Jan 2026', amount: '500 QMY', reason: 'Queima mensal automática', txId: 'burn-001' },
  { date: 'Fev 2026', amount: '750 QMY', reason: 'Queima por inatividade', txId: 'burn-002' },
  { date: 'Mar 2026', amount: '1,000 QMY', reason: 'Queima de governança DAO', txId: 'burn-003' },
];

const geoData = [
  { region: 'Europa', coins: 320, monsters: 45, pct: 32 },
  { region: 'América do Norte', coins: 280, monsters: 38, pct: 28 },
  { region: 'Ásia', coins: 220, monsters: 30, pct: 22 },
  { region: 'América do Sul', coins: 100, monsters: 15, pct: 10 },
  { region: 'África', coins: 50, monsters: 8, pct: 5 },
  { region: 'Oceânia', coins: 30, monsters: 4, pct: 3 },
];

// Inline vesting chart data
const vestingChartData = [
  { month: 'Jan', unlocked: 100, locked: 900 },
  { month: 'Fev', unlocked: 200, locked: 800 },
  { month: 'Mar', unlocked: 300, locked: 700 },
  { month: 'Abr', unlocked: 400, locked: 600 },
  { month: 'Mai', unlocked: 500, locked: 500 },
  { month: 'Jun', unlocked: 600, locked: 400 },
  { month: 'Jul', unlocked: 700, locked: 300 },
  { month: 'Ago', unlocked: 800, locked: 200 },
  { month: 'Set', unlocked: 900, locked: 100 },
  { month: 'Out', unlocked: 1000, locked: 0 },
];

// Inline supply chart data
const supplyChartData = [
  { label: 'Jan', total: 1000000, locked: 900000, circulating: 100000 },
  { label: 'Fev', total: 999500, locked: 800000, circulating: 199500 },
  { label: 'Mar', total: 999000, locked: 700000, circulating: 299000 },
  { label: 'Abr', total: 998500, locked: 600000, circulating: 398500 },
  { label: 'Mai', total: 998000, locked: 500000, circulating: 498000 },
  { label: 'Jun', total: 997500, locked: 400000, circulating: 597500 },
];

// ── Download helper ────────────────────────────────────────────────────────
function downloadCSV(rows: Record<string, string>[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]).join(',');
  const body = rows.map(r => Object.values(r).join(',')).join('\n');
  const blob = new Blob([headers + '\n' + body], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Inline Vesting Chart ───────────────────────────────────────────────────
function InlineVestingChart() {
  const maxVal = 1000;
  const w = 600;
  const h = 200;
  const pad = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / vestingChartData.length - 4;

  return (
    <div className="luxury-glass-card p-6">
      <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📈 Calendário de Desbloqueio</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 300 }}>
          <g transform={`translate(${pad.left},${pad.top})`}>
            {vestingChartData.map((d, i) => {
              const x = i * (chartW / vestingChartData.length) + 2;
              const unlockedH = (d.unlocked / maxVal) * chartH;
              const lockedH = (d.locked / maxVal) * chartH;
              return (
                <g key={d.month}>
                  <rect
                    x={x}
                    y={chartH - unlockedH}
                    width={barW / 2}
                    height={unlockedH}
                    fill="oklch(60% 0.18 145)"
                    opacity={0.8}
                  />
                  <rect
                    x={x + barW / 2}
                    y={chartH - lockedH}
                    width={barW / 2}
                    height={lockedH}
                    fill="oklch(75% 0.18 75)"
                    opacity={0.8}
                  />
                  <text
                    x={x + barW / 2}
                    y={chartH + 15}
                    textAnchor="middle"
                    fontSize={9}
                    fill="oklch(66% 0.19 85 / 0.7)"
                  >
                    {d.month}
                  </text>
                </g>
              );
            })}
            {[0, 250, 500, 750, 1000].map(v => (
              <g key={v}>
                <line
                  x1={0} y1={chartH - (v / maxVal) * chartH}
                  x2={chartW} y2={chartH - (v / maxVal) * chartH}
                  stroke="oklch(66% 0.19 85 / 0.15)"
                  strokeDasharray="4 4"
                />
                <text
                  x={-5}
                  y={chartH - (v / maxVal) * chartH + 4}
                  textAnchor="end"
                  fontSize={8}
                  fill="oklch(66% 0.19 85 / 0.6)"
                >
                  {v}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="flex gap-4 mt-2 justify-center text-xs font-rajdhani">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block" style={{ background: 'oklch(60% 0.18 145)' }} />
          <span className="text-qmy-gold/70">Desbloqueado</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block" style={{ background: 'oklch(75% 0.18 75)' }} />
          <span className="text-qmy-gold/70">Bloqueado</span>
        </span>
      </div>
    </div>
  );
}

// ── Inline Supply Chart ────────────────────────────────────────────────────
function InlineSupplyChart() {
  const maxVal = 1_000_000;
  const w = 600;
  const h = 200;
  const pad = { top: 20, right: 20, bottom: 30, left: 70 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / supplyChartData.length - 6;

  const circulatingPoints = supplyChartData.map((d, i) => {
    const x = i * (chartW / supplyChartData.length) + barW / 2 + pad.left;
    const y = chartH - (d.circulating / maxVal) * chartH + pad.top;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="luxury-glass-card p-6">
      <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📊 Evolução do Supply</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 300 }}>
          <g>
            {supplyChartData.map((d, i) => {
              const x = i * (chartW / supplyChartData.length) + pad.left + 3;
              const totalH = (d.total / maxVal) * chartH;
              const lockedH = (d.locked / maxVal) * chartH;
              return (
                <g key={d.label}>
                  <rect
                    x={x}
                    y={pad.top + chartH - totalH}
                    width={barW / 2}
                    height={totalH}
                    fill="oklch(66% 0.19 85 / 0.3)"
                  />
                  <rect
                    x={x + barW / 2}
                    y={pad.top + chartH - lockedH}
                    width={barW / 2}
                    height={lockedH}
                    fill="oklch(75% 0.18 75 / 0.6)"
                  />
                  <text
                    x={x + barW / 2}
                    y={pad.top + chartH + 15}
                    textAnchor="middle"
                    fontSize={9}
                    fill="oklch(66% 0.19 85 / 0.7)"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}
            <polyline
              points={circulatingPoints}
              fill="none"
              stroke="oklch(60% 0.18 145)"
              strokeWidth={2}
            />
            {[0, 250000, 500000, 750000, 1000000].map(v => (
              <g key={v}>
                <line
                  x1={pad.left} y1={pad.top + chartH - (v / maxVal) * chartH}
                  x2={pad.left + chartW} y2={pad.top + chartH - (v / maxVal) * chartH}
                  stroke="oklch(66% 0.19 85 / 0.1)"
                  strokeDasharray="4 4"
                />
                <text
                  x={pad.left - 5}
                  y={pad.top + chartH - (v / maxVal) * chartH + 4}
                  textAnchor="end"
                  fontSize={7}
                  fill="oklch(66% 0.19 85 / 0.5)"
                >
                  {(v / 1000).toFixed(0)}k
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="flex gap-4 mt-2 justify-center text-xs font-rajdhani">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block" style={{ background: 'oklch(66% 0.19 85 / 0.3)' }} />
          <span className="text-qmy-gold/70">Supply Total</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block" style={{ background: 'oklch(75% 0.18 75 / 0.6)' }} />
          <span className="text-qmy-gold/70">Bloqueado</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 inline-block" style={{ background: 'oklch(60% 0.18 145)' }} />
          <span className="text-qmy-gold/70">Circulante</span>
        </span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function BancoCentral() {
  const { data: bankData, isLoading } = useLuxuryBankData();
  const [activeSection, setActiveSection] = useState<string>('overview');

  const totalSupply = 1_000_000;
  const circulatingSupply = bankData?.totalAvailable ?? 0;
  const lockedSupply = bankData?.totalLocked ?? 0;
  const burnedSupply = 2_250;
  const vestingSupply = Math.max(0, totalSupply - circulatingSupply - lockedSupply - burnedSupply);

  const sections = [
    { id: 'overview', label: '📊 Visão Geral' },
    { id: 'vesting', label: '🔐 Vesting' },
    { id: 'burns', label: '🔥 Queimas' },
    { id: 'distribution', label: '🌍 Distribuição' },
    { id: 'charts', label: '📈 Gráficos' },
    { id: 'docs', label: '📄 Documentos' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-qmy-gold text-4xl md:text-5xl font-bold luxury-title-glow mb-3">
            Banco Central QMY
          </h1>
          <p className="text-qmy-gold/60 font-rajdhani text-lg max-w-2xl mx-auto">
            Transparência total do ecossistema Quantumoney. Dados em tempo real sobre supply, vesting, queimas e distribuição geográfica.
          </p>
          <div className="luxury-divider mt-6" />
        </div>

        {/* Section Nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2 text-sm font-rajdhani border transition-colors ${
                activeSection === s.id
                  ? 'border-qmy-gold bg-qmy-gold/20 text-qmy-gold'
                  : 'border-qmy-gold/30 text-qmy-gold/60 hover:border-qmy-gold/60 hover:text-qmy-gold/80'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard label="Supply Total" value="1,000,000" sub="QMY" icon={CoinsIcon} />
              <StatCard label="Circulante" value={circulatingSupply.toLocaleString()} sub="QMY disponível" icon={TrendingUpIcon} color="text-green-400" />
              <StatCard label="Bloqueado" value={lockedSupply.toLocaleString()} sub="QMY em vesting" icon={LockIcon} color="text-yellow-400" />
              <StatCard label="Queimado" value={burnedSupply.toLocaleString()} sub="QMY destruído" icon={FireIcon} color="text-red-400" />
              <StatCard label="Jogadores" value={isLoading ? '...' : String(bankData?.totalPlayers ?? 0)} sub="registados" icon={UsersIcon} color="text-blue-400" />
            </div>

            {/* Supply bar */}
            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">Distribuição do Supply</h3>
              <div className="space-y-3">
                {[
                  { label: 'Circulante', value: circulatingSupply, color: 'bg-green-500', pct: ((circulatingSupply / totalSupply) * 100).toFixed(1) },
                  { label: 'Bloqueado/Vesting', value: lockedSupply + vestingSupply, color: 'bg-yellow-500', pct: (((lockedSupply + vestingSupply) / totalSupply) * 100).toFixed(1) },
                  { label: 'Queimado', value: burnedSupply, color: 'bg-red-500', pct: ((burnedSupply / totalSupply) * 100).toFixed(1) },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-rajdhani text-qmy-gold/70 mb-1">
                      <span>{item.label}</span>
                      <span>{item.value.toLocaleString()} QMY ({item.pct}%)</span>
                    </div>
                    <div className="h-3 bg-black/40 border border-qmy-gold/20 overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canister IDs */}
            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">⚙️ Canisters Carteira A</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { label: 'Frontend / Website', id: 'crjop-jyaaa-aaaah-atfaq-cai' },
                  { label: 'Gold Paper & Docs', id: 'whu4t-kiaaa-aaaah-qsc5q-cai' },
                  { label: 'Governance / Treasury', id: 'nemlr-6aaaa-aaaan-q32la-cai' },
                  { label: 'Logic (futuro)', id: 'ckmsk-taaaa-aaaah-atfca-cai' },
                  { label: 'Ledger QMY', id: '5o54h-giaaa-aaaad-aentq-cai' },
                ].map(c => (
                  <div key={c.id} className="flex flex-col gap-1 border border-qmy-gold/20 p-3">
                    <span className="text-qmy-gold/50 font-rajdhani text-xs uppercase">{c.label}</span>
                    <span className="text-qmy-gold break-all">{c.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VESTING */}
        {activeSection === 'vesting' && (
          <div className="space-y-6">
            <div className="luxury-glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-cinzel text-qmy-gold font-bold text-lg">Calendário de Vesting</h3>
                <button
                  className="luxury-cta-btn px-4 py-2 text-xs"
                  onClick={() => downloadCSV(vestingRows.map(r => ({ ...r })), 'qmy-vesting.csv')}
                >
                  ⬇ CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-qmy-gold/20">
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Categoria</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Total</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Desbloqueado</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Bloqueado</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Período</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vestingRows.map(row => (
                      <TableRow key={row.category} className="border-qmy-gold/10 hover:bg-qmy-gold/5">
                        <TableCell className="text-qmy-gold font-rajdhani">{row.category}</TableCell>
                        <TableCell className="text-qmy-gold/80 font-rajdhani">{row.total}</TableCell>
                        <TableCell className="text-green-400 font-rajdhani">{row.unlocked}</TableCell>
                        <TableCell className="text-yellow-400 font-rajdhani">{row.locked}</TableCell>
                        <TableCell className="text-qmy-gold/60 font-rajdhani">{row.period}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <InlineVestingChart />
          </div>
        )}

        {/* BURNS */}
        {activeSection === 'burns' && (
          <div className="space-y-6">
            <div className="luxury-glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-cinzel text-qmy-gold font-bold text-lg">🔥 Histórico de Queimas</h3>
                <button
                  className="luxury-cta-btn px-4 py-2 text-xs"
                  onClick={() => downloadCSV(burnRows.map(r => ({ ...r })), 'qmy-burns.csv')}
                >
                  ⬇ CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-qmy-gold/20">
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Data</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Quantidade</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Motivo</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">TX ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {burnRows.map(row => (
                      <TableRow key={row.txId} className="border-qmy-gold/10 hover:bg-qmy-gold/5">
                        <TableCell className="text-qmy-gold font-rajdhani">{row.date}</TableCell>
                        <TableCell className="text-red-400 font-bold font-rajdhani">{row.amount}</TableCell>
                        <TableCell className="text-qmy-gold/70 font-rajdhani">{row.reason}</TableCell>
                        <TableCell className="text-qmy-gold/40 font-mono text-xs">{row.txId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30">
                <div className="text-red-400 font-cinzel font-bold text-xl">Total Queimado: 2,250 QMY</div>
                <div className="text-qmy-gold/50 text-xs font-rajdhani mt-1">0.225% do supply total destruído permanentemente</div>
              </div>
            </div>

            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">Mecanismos de Queima</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🔥', title: 'Queima Mensal', desc: 'Automática, 0.05% do supply circulante por mês.' },
                  { icon: '⏰', title: 'Inatividade', desc: 'Contas inativas por 12+ meses têm tokens queimados.' },
                  { icon: '🗳️', title: 'Governança DAO', desc: 'Propostas aprovadas podem ordenar queimas especiais.' },
                ].map(m => (
                  <div key={m.title} className="border border-qmy-gold/20 p-4">
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <div className="text-qmy-gold font-cinzel font-bold text-sm mb-1">{m.title}</div>
                    <div className="text-qmy-gold/60 text-xs font-rajdhani">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DISTRIBUTION */}
        {activeSection === 'distribution' && (
          <div className="space-y-6">
            <div className="luxury-glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-cinzel text-qmy-gold font-bold text-lg">🌍 Distribuição Geográfica</h3>
                <button
                  className="luxury-cta-btn px-4 py-2 text-xs"
                  onClick={() =>
                    downloadCSV(
                      geoData.map(r => ({
                        region: r.region,
                        coins: String(r.coins),
                        monsters: String(r.monsters),
                        pct: String(r.pct),
                      })),
                      'qmy-distribution.csv'
                    )
                  }
                >
                  ⬇ CSV
                </button>
              </div>
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-qmy-gold/20">
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Região</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Moedas</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">Monstros</TableHead>
                      <TableHead className="text-qmy-gold/70 font-rajdhani">% Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {geoData.map(row => (
                      <TableRow key={row.region} className="border-qmy-gold/10 hover:bg-qmy-gold/5">
                        <TableCell className="text-qmy-gold font-rajdhani">
                          <span className="flex items-center gap-2">
                            <GlobeIcon className="w-4 h-4 text-qmy-gold/50" />
                            {row.region}
                          </span>
                        </TableCell>
                        <TableCell className="text-yellow-400 font-rajdhani">{row.coins}</TableCell>
                        <TableCell className="text-purple-400 font-rajdhani">{row.monsters}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-black/40 border border-qmy-gold/20 overflow-hidden">
                              <div className="h-full bg-qmy-gold" style={{ width: `${row.pct}%` }} />
                            </div>
                            <span className="text-qmy-gold/70 text-xs font-rajdhani w-8">{row.pct}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Moedas', value: '1,000', color: 'text-yellow-400' },
                  { label: 'Total Monstros', value: '140', color: 'text-purple-400' },
                  { label: 'Países Ativos', value: '50+', color: 'text-green-400' },
                  { label: 'Pontos AR', value: '500+', color: 'text-blue-400' },
                ].map(s => (
                  <div key={s.label} className="luxury-glass-card p-4 text-center">
                    <div className={`font-cinzel font-bold text-2xl ${s.color}`}>{s.value}</div>
                    <div className="text-qmy-gold/50 text-xs font-rajdhani">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHARTS */}
        {activeSection === 'charts' && (
          <div className="space-y-6">
            <InlineSupplyChart />
            <InlineVestingChart />
          </div>
        )}

        {/* DOCS */}
        {activeSection === 'docs' && (
          <div className="space-y-6">
            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-6">📄 Documentos & Downloads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Gold Paper QMY',
                    desc: 'Documento técnico completo sobre o token QMY, tokenomics e ecossistema.',
                    icon: '📜',
                    action: () => window.open('https://whu4t-kiaaa-aaaah-qsc5q-cai.icp0.io', '_blank'),
                  },
                  {
                    title: 'Vesting Schedule CSV',
                    desc: 'Calendário completo de desbloqueio de tokens em formato CSV.',
                    icon: '📊',
                    action: () => downloadCSV(vestingRows.map(r => ({ ...r })), 'qmy-vesting.csv'),
                  },
                  {
                    title: 'Burn History CSV',
                    desc: 'Histórico completo de queimas de tokens QMY.',
                    icon: '🔥',
                    action: () => downloadCSV(burnRows.map(r => ({ ...r })), 'qmy-burns.csv'),
                  },
                  {
                    title: 'Distribution CSV',
                    desc: 'Distribuição geográfica de moedas e monstros.',
                    icon: '🌍',
                    action: () =>
                      downloadCSV(
                        geoData.map(r => ({
                          region: r.region,
                          coins: String(r.coins),
                          monsters: String(r.monsters),
                          pct: String(r.pct),
                        })),
                        'qmy-distribution.csv'
                      ),
                  },
                ].map(doc => (
                  <div key={doc.title} className="border border-qmy-gold/30 p-5 hover:border-qmy-gold/60 transition-colors">
                    <div className="text-3xl mb-3">{doc.icon}</div>
                    <h4 className="font-cinzel text-qmy-gold font-bold mb-2">{doc.title}</h4>
                    <p className="text-qmy-gold/60 text-sm font-rajdhani mb-4">{doc.desc}</p>
                    <button className="luxury-cta-btn px-4 py-2 text-xs w-full" onClick={doc.action}>
                      ⬇ Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">❓ Perguntas Frequentes</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {[
                  {
                    q: 'O que é o token QMY?',
                    a: 'QMY é o token nativo do ecossistema Quantumoney, construído no Internet Computer Protocol (ICP). É usado para recompensar jogadores, governança DAO e transações no jogo.',
                  },
                  {
                    q: 'Como funciona o vesting?',
                    a: 'Os tokens em vesting são desbloqueados gradualmente ao longo do tempo. O bónus de boas-vindas de 1000 QMY tem 100 QMY disponíveis imediatamente e 900 QMY desbloqueados ao ritmo de 100 QMY por mês durante 9 meses.',
                  },
                  {
                    q: 'O que são as queimas de tokens?',
                    a: 'As queimas são mecanismos deflacionários que reduzem o supply total de QMY permanentemente. Incluem queimas mensais automáticas, por inatividade e por decisão da governança DAO.',
                  },
                  {
                    q: 'Como sincroniza com QuantumoneyAR.app?',
                    a: 'O Quantumoney.app e o QuantumoneyAR.app partilham os mesmos canisters da Carteira A no ICP. O teu perfil, carteira e progresso são sincronizados automaticamente entre as duas plataformas.',
                  },
                  {
                    q: 'Posso transferir QMY para outros jogadores?',
                    a: 'As transferências reais de QMY entre jogadores estarão disponíveis em breve via o canister Ledger QMY (5o54h-giaaa-aaaad-aentq-cai). Atualmente, os saldos são consultados em modo de leitura.',
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-qmy-gold/20">
                    <AccordionTrigger className="text-qmy-gold font-rajdhani px-4 hover:no-underline hover:text-qmy-gold">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-qmy-gold/70 font-rajdhani px-4 pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
