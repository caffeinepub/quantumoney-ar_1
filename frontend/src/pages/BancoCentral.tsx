import { useLuxuryBankData } from '../hooks/useLuxuryBank';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import ProfileGlassPanel from '../components/profile/ProfileGlassPanel';
import CanisterArchitecturePanel from '../components/profile/CanisterArchitecturePanel';
import type { PlayerProfile } from '../backend';
import {
  Coins,
  TrendingUp,
  Users,
  Zap,
  Shield,
  BarChart3,
  Activity,
  Globe,
  LucideIcon,
} from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
}

function StatCard({ label, value, icon: Icon, sub }: StatCardProps) {
  return (
    <div className="bg-black/40 border border-yellow-400/30 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-yellow-400" />
        <span className="text-yellow-400/70 text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-yellow-400 font-bold text-xl">{value}</span>
      {sub && <span className="text-yellow-400/50 text-xs">{sub}</span>}
    </div>
  );
}

function useAllPlayerProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[unknown, PlayerProfile]>>({
    queryKey: ['allPlayerProfiles'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllPlayerProfiles() as Array<[unknown, PlayerProfile]>;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}

export default function BancoCentral() {
  const { data: bankData, isLoading: bankLoading } = useLuxuryBankData();
  const { data: profiles, isLoading: profilesLoading } = useAllPlayerProfiles();

  // Aggregate stats from all player profiles
  const aggregated = (() => {
    if (!profiles || profiles.length === 0) {
      return {
        totalPlayers: 0,
        totalXP: 0,
        totalAvailable: 0,
        totalPlanted: 0,
        totalBonus: 0,
        totalMonsters: 0,
        totalLocked: 0,
      };
    }
    let totalXP = 0;
    let totalAvailable = 0;
    let totalPlanted = 0;
    let totalBonus = 0;
    let totalMonsters = 0;
    for (const [, profile] of profiles) {
      totalXP += Number(profile.xp);
      totalAvailable += Number(profile.availableTokens);
      totalPlanted += Number(profile.plantedTokens);
      totalBonus += Number(profile.bonusTokens);
      totalMonsters += profile.capturedMonsters.length;
    }
    return {
      totalPlayers: profiles.length,
      totalXP,
      totalAvailable,
      totalPlanted,
      totalBonus,
      totalMonsters,
      totalLocked: totalBonus + totalPlanted,
    };
  })();

  const totalSupply = bankData?.overview?.totalSupply ?? 333_333_333_333;
  const circulatingSupply = aggregated.totalAvailable;
  const usdPrice = 0.02;

  const formatNum = (n: number) =>
    n >= 1_000_000_000
      ? (n / 1_000_000_000).toFixed(2) + 'B'
      : n >= 1_000_000
      ? (n / 1_000_000).toFixed(2) + 'M'
      : n >= 1_000
      ? (n / 1_000).toFixed(1) + 'K'
      : n.toLocaleString('pt-PT');

  const isLoading = bankLoading || profilesLoading;

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center py-2">
          <h1 className="text-yellow-400 text-2xl font-bold tracking-wider">BANCO CENTRAL QMY</h1>
          <p className="text-yellow-400/50 text-xs mt-1">
            Dados públicos sincronizados com os canisters da Carteira A
          </p>
        </div>

        {isLoading && (
          <div className="text-center text-yellow-400/50 text-sm animate-pulse py-4">
            A carregar dados do canister...
          </div>
        )}

        {/* ── SUPPLY OVERVIEW ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-4">
            <Coins size={16} className="text-yellow-400" />
            <h2 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Fornecimento de Moedas</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard
              label="Fornecimento Total"
              value={formatNum(totalSupply)}
              icon={Globe}
              sub="QMY máximo"
            />
            <StatCard
              label="Em Circulação"
              value={formatNum(circulatingSupply)}
              icon={TrendingUp}
              sub="QMY disponíveis"
            />
            <StatCard
              label="Bloqueados / Vesting"
              value={formatNum(aggregated.totalLocked)}
              icon={Shield}
              sub="QMY bloqueados"
            />
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-yellow-400/60 mb-1">
              <span>Circulação</span>
              <span>{totalSupply > 0 ? ((circulatingSupply / totalSupply) * 100).toFixed(4) : '0.0000'}%</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-2 border border-yellow-400/20">
              <div
                className="bg-yellow-400/70 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((circulatingSupply / totalSupply) * 100, 100)}%` }}
              />
            </div>
          </div>
        </ProfileGlassPanel>

        {/* ── TOKEN PRICE ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-yellow-400" />
            <h2 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Preço & Mercado</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Preço QMY"
              value={`$${usdPrice.toFixed(4)}`}
              icon={TrendingUp}
              sub="USD (simulado)"
            />
            <StatCard
              label="Market Cap"
              value={`$${formatNum(circulatingSupply * usdPrice)}`}
              icon={Coins}
              sub="Capitalização"
            />
          </div>
        </ProfileGlassPanel>

        {/* ── PLAYERS & XP ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-yellow-400" />
            <h2 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Jogadores & XP</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard
              label="Total Jogadores"
              value={aggregated.totalPlayers}
              icon={Users}
              sub="Registados"
            />
            <StatCard
              label="XP Total"
              value={formatNum(aggregated.totalXP)}
              icon={Zap}
              sub="XP acumulado"
            />
            <StatCard
              label="Monstros Capturados"
              value={aggregated.totalMonsters}
              icon={Activity}
              sub="Total global"
            />
          </div>
        </ProfileGlassPanel>

        {/* ── VESTING & BONUS ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-yellow-400" />
            <h2 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Vesting & Bónus</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="QTM Plantados"
              value={formatNum(aggregated.totalPlanted)}
              icon={Coins}
              sub="Em campo"
            />
            <StatCard
              label="Bónus Bloqueados"
              value={formatNum(aggregated.totalBonus)}
              icon={Shield}
              sub="Vesting 9 meses"
            />
          </div>

          {/* Vesting breakdown table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-yellow-400/20">
                  <th className="text-left text-yellow-400/60 py-2 pr-4">Categoria</th>
                  <th className="text-right text-yellow-400/60 py-2">QMY</th>
                  <th className="text-right text-yellow-400/60 py-2 pl-4">% Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Disponível (jogadores)', value: aggregated.totalAvailable },
                  { label: 'Plantados (campo)', value: aggregated.totalPlanted },
                  { label: 'Bónus (vesting)', value: aggregated.totalBonus },
                  { label: 'Reserva (não distribuída)', value: Math.max(0, totalSupply - aggregated.totalAvailable - aggregated.totalLocked) },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-yellow-400/10">
                    <td className="text-yellow-400/80 py-2 pr-4">{row.label}</td>
                    <td className="text-yellow-400 text-right py-2 font-mono">{formatNum(row.value)}</td>
                    <td className="text-yellow-400/60 text-right py-2 pl-4">
                      {totalSupply > 0 ? ((row.value / totalSupply) * 100).toFixed(4) : '0.0000'}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ProfileGlassPanel>

        {/* ── RECENT TRANSACTIONS ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-yellow-400" />
            <h2 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Transações Recentes</h2>
          </div>
          {bankData?.timeSeries && bankData.timeSeries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-yellow-400/20">
                    <th className="text-left text-yellow-400/60 py-2 pr-4">Período</th>
                    <th className="text-right text-yellow-400/60 py-2">Circulação QMY</th>
                    <th className="text-right text-yellow-400/60 py-2 pl-4">Bloqueado QMY</th>
                  </tr>
                </thead>
                <tbody>
                  {bankData.timeSeries.slice(0, 10).map((entry, i) => (
                    <tr key={i} className="border-b border-yellow-400/10">
                      <td className="text-yellow-400/80 py-2 pr-4">{entry.date}</td>
                      <td className="text-yellow-400 text-right py-2 font-mono">{formatNum(entry.circulating)}</td>
                      <td className="text-yellow-400/60 text-right py-2 pl-4">{formatNum(entry.locked)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-yellow-400/50 text-xs">
                Sem transações registadas. Os dados serão exibidos quando disponíveis no canister.
              </p>
            </div>
          )}
        </ProfileGlassPanel>

        {/* ── CANISTER ARCHITECTURE ── */}
        <CanisterArchitecturePanel />
      </div>
    </div>
  );
}
