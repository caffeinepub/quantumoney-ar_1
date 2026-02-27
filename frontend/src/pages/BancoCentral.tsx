import { useMemo } from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { useLuxuryBankData } from '../hooks/useLuxuryBank';
import TokenomicsSection from '../components/central-bank/TokenomicsSection';
import VestingTable from '../components/central-bank/VestingTable';
import VestingChart from '../components/central-bank/VestingChart';
import BurnHistoryTable from '../components/central-bank/BurnHistoryTable';
import SupplyChartsSection from '../components/central-bank/SupplyChartsSection';
import ExplanatorySection from '../components/central-bank/ExplanatorySection';
import DownloadButtons from '../components/central-bank/DownloadButtons';
import { Landmark, Users, Coins, Zap, Shield } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}

function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <div className="border border-yellow-400/30 bg-black/30 backdrop-blur-sm p-4 rounded-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-yellow-400/60" />
        <span className="text-yellow-400/60 text-xs">{label}</span>
      </div>
      <p className="text-yellow-400 font-bold text-2xl">{value}</p>
      {sub && <p className="text-yellow-400/40 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function BancoCentral() {
  const { data: bankData, isLoading } = useLuxuryBankData();

  const totalPlayers = bankData?.totalPlayers ?? 0;
  const totalXP = bankData?.totalXP ?? 0;
  const circulatingSupply = bankData?.totalAvailable ?? 0;
  const lockedSupply = bankData?.totalLocked ?? 0;

  const TOTAL_SUPPLY = 1_000_000_000;
  const vestingSupply = lockedSupply;
  const burnedTokens = 0;

  // Vesting table rows (9 months, 100 QMY/month per user)
  const vestingRows = useMemo(() => {
    const startDate = new Date(2026, 0, 1);
    return Array.from({ length: 9 }, (_, i) => {
      const unlockDate = new Date(startDate);
      unlockDate.setMonth(startDate.getMonth() + i + 1);
      const perUserUnlock = 100;
      const totalUnlock = perUserUnlock * Math.max(1, totalPlayers);
      const cumulative = totalUnlock * (i + 1);
      return {
        month: i + 1,
        unlockDate: unlockDate.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }),
        amountUnlocked: totalUnlock,
        amountLocked: Math.max(0, vestingSupply - cumulative),
        cumulativeUnlocked: cumulative,
        percentUnlocked: vestingSupply > 0 ? Math.min(100, (cumulative / vestingSupply) * 100) : 0,
      };
    });
  }, [totalPlayers, vestingSupply]);

  // Vesting chart data
  const vestingChartData = useMemo(() => {
    const base = 100 * Math.max(1, totalPlayers);
    return [
      { month: 'Início', unlocked: base, locked: 900 * Math.max(1, totalPlayers) },
      ...vestingRows.map(r => ({
        month: `M${r.month}`,
        unlocked: r.cumulativeUnlocked + base,
        locked: Math.max(0, r.amountLocked),
      })),
    ];
  }, [vestingRows, totalPlayers]);

  // Supply chart data
  const supplyChartData = useMemo(() => [
    { period: 'Atual', total: TOTAL_SUPPLY, circulating: circulatingSupply, locked: lockedSupply },
    { period: 'M3', total: TOTAL_SUPPLY, circulating: circulatingSupply + 300 * Math.max(1, totalPlayers), locked: Math.max(0, lockedSupply - 300 * Math.max(1, totalPlayers)) },
    { period: 'M6', total: TOTAL_SUPPLY, circulating: circulatingSupply + 600 * Math.max(1, totalPlayers), locked: Math.max(0, lockedSupply - 600 * Math.max(1, totalPlayers)) },
    { period: 'M9', total: TOTAL_SUPPLY, circulating: circulatingSupply + 900 * Math.max(1, totalPlayers), locked: 0 },
  ], [circulatingSupply, lockedSupply, totalPlayers]);

  const burnEntries: Array<{ date: string; amount: number; reason: string; percentageRemoved: number }> = [];

  const downloadData = {
    totalSupply: TOTAL_SUPPLY,
    circulatingSupply,
    lockedSupply,
    vestingSupply,
    burnedTokens,
    vestingRows,
    burnEntries,
  };

  return (
    <PageShell>
      <Container size="lg">
        <div className="py-6 space-y-6">
          {/* Header */}
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Landmark className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-cinzel font-bold text-yellow-400 tracking-wider">
                Banco Central QMY
              </h1>
            </div>
            <p className="text-yellow-400/60 text-sm max-w-2xl mx-auto">
              Dashboard institucional com dados em tempo real dos canisters da Carteira A.
              Transparência total sobre supply, vesting, queima e distribuição.
            </p>
            <div className="h-0.5 w-48 mx-auto mt-3 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>

          {/* Quick stats */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-yellow-400/20 bg-black/20 p-4 rounded-sm animate-pulse h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Utilizadores" value={totalPlayers.toString()} sub="registados" />
              <StatCard icon={Coins} label="QMY Circulante" value={circulatingSupply.toLocaleString('pt-PT')} sub="tokens ativos" />
              <StatCard icon={Zap} label="XP Total" value={totalXP.toLocaleString('pt-PT')} sub="pontos acumulados" />
              <StatCard icon={Shield} label="Supply Total" value={`${(TOTAL_SUPPLY / 1e9).toFixed(1)}B`} sub="QMY conceptual" />
            </div>
          )}

          {/* Tokenomics */}
          <TokenomicsSection
            data={{
              totalSupply: TOTAL_SUPPLY,
              circulatingSupply,
              lockedSupply,
              vestingSupply,
              burnedTokens,
            }}
          />

          {/* Vesting Table */}
          <VestingTable rows={vestingRows} />

          {/* Vesting Chart */}
          <VestingChart data={vestingChartData} />

          {/* Supply Charts */}
          <SupplyChartsSection data={supplyChartData} />

          {/* Burn History */}
          <BurnHistoryTable entries={burnEntries} totalSupply={TOTAL_SUPPLY} />

          {/* Explanatory Section */}
          <ExplanatorySection />

          {/* Downloads */}
          <DownloadButtons data={downloadData} />
        </div>
      </Container>
    </PageShell>
  );
}
