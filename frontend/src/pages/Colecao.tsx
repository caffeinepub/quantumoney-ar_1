import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle } from '../components/Typography';
import { Shield, Lock, Zap, Trophy, AlertCircle } from 'lucide-react';

interface MonsterDef {
  id: string;
  name: string;
  symbol: string;
  rarity: 'common' | 'rare' | 'legendary';
  energyBoost: number;
  emoji: string;
}

const MONSTERS: MonsterDef[] = [
  { id: 'btc', name: 'Bitcoin Beast', symbol: 'BTC', rarity: 'legendary', energyBoost: 50, emoji: '₿' },
  { id: 'eth', name: 'Ethereum Elemental', symbol: 'ETH', rarity: 'legendary', energyBoost: 40, emoji: 'Ξ' },
  { id: 'icp', name: 'ICP Infinity', symbol: 'ICP', rarity: 'legendary', energyBoost: 45, emoji: '∞' },
  { id: 'sol', name: 'Solana Specter', symbol: 'SOL', rarity: 'rare', energyBoost: 30, emoji: '◎' },
  { id: 'bnb', name: 'BNB Behemoth', symbol: 'BNB', rarity: 'rare', energyBoost: 25, emoji: '⬡' },
  { id: 'xrp', name: 'XRP Xenomorph', symbol: 'XRP', rarity: 'rare', energyBoost: 20, emoji: '✕' },
  { id: 'doge', name: 'Doge Dragon', symbol: 'DOGE', rarity: 'common', energyBoost: 15, emoji: 'Ð' },
  { id: 'ltc', name: 'Litecoin Leviathan', symbol: 'LTC', rarity: 'common', energyBoost: 12, emoji: 'Ł' },
  { id: 'link', name: 'Chainlink Chimera', symbol: 'LINK', rarity: 'common', energyBoost: 10, emoji: '⬡' },
  { id: 'dot', name: 'Polkadot Phantom', symbol: 'DOT', rarity: 'rare', energyBoost: 22, emoji: '●' },
  { id: 'ada', name: 'Cardano Colossus', symbol: 'ADA', rarity: 'rare', energyBoost: 18, emoji: '₳' },
  { id: 'avax', name: 'Avalanche Avatar', symbol: 'AVAX', rarity: 'rare', energyBoost: 20, emoji: '△' },
  { id: 'matic', name: 'Polygon Poltergeist', symbol: 'MATIC', rarity: 'common', energyBoost: 10, emoji: '⬡' },
  { id: 'uni', name: 'Uniswap Unicorn', symbol: 'UNI', rarity: 'common', energyBoost: 8, emoji: '🦄' },
  { id: 'atom', name: 'Cosmos Creature', symbol: 'ATOM', rarity: 'common', energyBoost: 10, emoji: '⚛' },
  { id: 'near', name: 'NEAR Nightmare', symbol: 'NEAR', rarity: 'common', energyBoost: 8, emoji: 'N' },
  { id: 'ftm', name: 'Fantom Fiend', symbol: 'FTM', rarity: 'common', energyBoost: 7, emoji: 'F' },
  { id: 'algo', name: 'Algorand Apparition', symbol: 'ALGO', rarity: 'common', energyBoost: 7, emoji: 'A' },
  { id: 'xlm', name: 'Stellar Specter', symbol: 'XLM', rarity: 'common', energyBoost: 6, emoji: '*' },
  { id: 'trx', name: 'TRON Titan', symbol: 'TRX', rarity: 'common', energyBoost: 6, emoji: 'T' },
];

const RARITY_COLORS = {
  common: 'border-muted-foreground/30 text-muted-foreground',
  rare: 'border-blue-400/50 text-blue-400',
  legendary: 'border-yellow-400/70 text-yellow-400',
};

const RARITY_LABELS = {
  common: 'Comum',
  rare: 'Raro',
  legendary: 'Lendário',
};

export default function Colecao() {
  const { identity } = useAuth();
  const { profile, isLoading } = useProfile();
  const [filter, setFilter] = useState<'all' | 'captured' | 'missing'>('all');

  const capturedNames = new Set(
    (profile?.capturedMonsters ?? []).map(cm => cm.monster.name)
  );

  const filtered = MONSTERS.filter(m => {
    if (filter === 'captured') return capturedNames.has(m.name);
    if (filter === 'missing') return !capturedNames.has(m.name);
    return true;
  });

  const capturedCount = MONSTERS.filter(m => capturedNames.has(m.name)).length;
  const totalEnergyBonus = MONSTERS
    .filter(m => capturedNames.has(m.name))
    .reduce((sum, m) => sum + m.energyBoost, 0);

  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-primary" />
            <PageTitle>Coleção de Monstros</PageTitle>
          </div>

          {!identity && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded p-4 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Faça login para ver a sua coleção.</span>
            </div>
          )}

          {/* Progress */}
          <div className="luxury-glass-card p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-cinzel text-primary font-bold">Progresso da Coleção</span>
              </div>
              <span className="text-primary font-bold">{capturedCount} / {MONSTERS.length}</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all"
                style={{ width: `${(capturedCount / MONSTERS.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Bónus de energia total: <span className="text-yellow-400 font-bold">+{totalEnergyBonus}%</span></span>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {(['all', 'captured', 'missing'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/20 text-muted-foreground hover:text-foreground border border-primary/20'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'captured' ? 'Capturados' : 'Em Falta'}
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">A carregar coleção...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map(monster => {
                const isCaptured = capturedNames.has(monster.name);
                return (
                  <div
                    key={monster.id}
                    className={`luxury-glass-card p-4 border rounded text-center transition-all ${
                      isCaptured
                        ? RARITY_COLORS[monster.rarity]
                        : 'border-muted/20 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-3xl mb-2">{isCaptured ? monster.emoji : '❓'}</div>
                    <p className={`text-xs font-bold mb-1 ${isCaptured ? '' : 'text-muted-foreground'}`}>
                      {isCaptured ? monster.name : '???'}
                    </p>
                    <p className="text-xs text-muted-foreground">{monster.symbol}</p>
                    <div className={`text-xs mt-2 px-2 py-0.5 rounded-full border inline-block ${RARITY_COLORS[monster.rarity]}`}>
                      {RARITY_LABELS[monster.rarity]}
                    </div>
                    {isCaptured && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-yellow-400">
                        <Zap className="w-3 h-3" />
                        <span>+{monster.energyBoost}%</span>
                      </div>
                    )}
                    {!isCaptured && (
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground/50">
                        <Lock className="w-3 h-3" />
                        <span>Bloqueado</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </PageShell>
  );
}
