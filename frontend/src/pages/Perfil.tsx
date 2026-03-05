import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { User, Coins, Zap, Star, Clock, LogIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useGetCallerUserProfile, useClaimWelcomeBonus } from '../hooks/useQueries';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useICPLedger } from '../hooks/useICPLedger';

function formatBalance(val: bigint | undefined | null, decimals = 8): string {
  if (val === undefined || val === null) return '0';
  const n = Number(val);
  if (decimals === 0) return n.toLocaleString();
  return (n / Math.pow(10, decimals)).toFixed(4);
}

function formatXP(val: bigint | undefined | null): string {
  if (val === undefined || val === null) return '0';
  return Number(val).toLocaleString();
}

export default function Perfil() {
  const { t } = useLanguage();
  const { isAuthenticated, isInitializing, principalId, login, isLoggingIn, triggerWelcomeBonus } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: qmyBalance, isLoading: qmyLoading } = useQMYLedger(principalId ?? undefined);
  const { data: icpBalance, isLoading: icpLoading } = useICPLedger(principalId ?? undefined);
  const claimBonus = useClaimWelcomeBonus();

  const [bonusClaimed, setBonusClaimed] = useState(false);

  // Claim welcome bonus on first login
  useEffect(() => {
    if (
      isAuthenticated &&
      profileFetched &&
      profile !== null &&
      profile !== undefined &&
      !bonusClaimed &&
      !claimBonus.isPending
    ) {
      const key = `qmy_bonus_claimed_${principalId}`;
      const alreadyClaimed = localStorage.getItem(key);
      if (!alreadyClaimed) {
        claimBonus.mutate(undefined, {
          onSuccess: (result) => {
            const [qmy, xp] = result;
            localStorage.setItem(key, 'true');
            setBonusClaimed(true);
            triggerWelcomeBonus(Number(qmy), Number(xp));
          },
          onError: () => {
            // Already claimed or error — mark locally to avoid retrying
            localStorage.setItem(key, 'true');
            setBonusClaimed(true);
          },
        });
      } else {
        setBonusClaimed(true);
      }
    }
  }, [isAuthenticated, profileFetched, profile, principalId]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gold-400 font-rajdhani text-lg">{t('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <User className="w-16 h-16 text-gold-400 mb-4" />
        <h2 className="text-xl font-cinzel font-bold text-gold-400 mb-3">{t('profile')}</h2>
        <p className="text-gray-400 font-rajdhani mb-6">{t('loginRequired')}</p>
        <button
          onClick={login}
          disabled={isLoggingIn}
          className="flex items-center gap-2 bg-gold-500 text-black px-6 py-3 font-rajdhani font-bold uppercase tracking-wide hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          {isLoggingIn ? t('loggingIn') : t('loginToPlay')}
        </button>
      </div>
    );
  }

  const xp = profile?.xp ?? BigInt(0);
  const level = profile?.level ?? BigInt(1);
  const availableTokens = profile?.availableTokens ?? BigInt(0);
  const bonusTokens = profile?.bonusTokens ?? BigInt(0);
  const plantedTokens = profile?.plantedTokens ?? BigInt(0);
  const nickname = profile?.nickname || '';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gold-900/40 border border-gold-600 flex items-center justify-center">
          <User className="w-6 h-6 text-gold-400" />
        </div>
        <div>
          <h1 className="text-xl font-cinzel font-bold text-gold-400">
            {nickname || t('profile')}
          </h1>
          <p className="text-xs text-gray-500 font-rajdhani">
            {t('level')} {Number(level)}
          </p>
        </div>
      </div>

      {/* Principal ID */}
      <div className="border border-gold-800 bg-black/50 p-4 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-gold-500" />
          <span className="text-xs text-gold-500 font-rajdhani uppercase tracking-wide">{t('principal')}</span>
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{principalId}</p>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* QMY Balance */}
        <div className="border border-gold-700 bg-black/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-500 font-rajdhani uppercase tracking-wide">{t('qmyBalance')}</span>
          </div>
          {qmyLoading ? (
            <div className="text-gray-500 text-sm font-rajdhani">...</div>
          ) : (
            <div className="text-xl font-cinzel font-bold text-gold-400">
              {formatBalance(qmyBalance, 8)}
            </div>
          )}
          <div className="text-xs text-gray-500 font-rajdhani mt-1">QMY</div>
        </div>

        {/* ICP Balance */}
        <div className="border border-gold-700 bg-black/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-400 font-rajdhani uppercase tracking-wide">{t('icpBalance')}</span>
          </div>
          {icpLoading ? (
            <div className="text-gray-500 text-sm font-rajdhani">...</div>
          ) : (
            <div className="text-xl font-cinzel font-bold text-blue-400">
              {formatBalance(icpBalance, 8)}
            </div>
          )}
          <div className="text-xs text-gray-500 font-rajdhani mt-1">ICP</div>
        </div>

        {/* XP */}
        <div className="border border-gold-700 bg-black/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-500 font-rajdhani uppercase tracking-wide">{t('xpCurrent')}</span>
          </div>
          {profileLoading ? (
            <div className="text-gray-500 text-sm font-rajdhani">...</div>
          ) : (
            <div className="text-xl font-cinzel font-bold text-gold-400">
              {formatXP(xp)}
            </div>
          )}
          <div className="text-xs text-gray-500 font-rajdhani mt-1">XP</div>
        </div>

        {/* Level */}
        <div className="border border-gold-700 bg-black/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-500 font-rajdhani uppercase tracking-wide">{t('level')}</span>
          </div>
          {profileLoading ? (
            <div className="text-gray-500 text-sm font-rajdhani">...</div>
          ) : (
            <div className="text-xl font-cinzel font-bold text-gold-400">
              {Number(level)}
            </div>
          )}
          <div className="text-xs text-gray-500 font-rajdhani mt-1">LVL</div>
        </div>
      </div>

      {/* In-game wallet */}
      <div className="border border-gold-800 bg-black/50 p-4 mb-4">
        <h2 className="text-sm font-cinzel font-bold text-gold-400 mb-3 uppercase tracking-wide">
          Carteira In-Game
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-rajdhani">{t('availableTokens')}</span>
            <span className="text-sm font-cinzel text-gold-400">{Number(availableTokens).toLocaleString()} QMY</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-rajdhani">{t('lockedTokens')}</span>
            <span className="text-sm font-cinzel text-gray-400">{Number(plantedTokens).toLocaleString()} QMY</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 font-rajdhani">{t('bonusTokens')}</span>
            <span className="text-sm font-cinzel text-gold-300">{Number(bonusTokens).toLocaleString()} QMY</span>
          </div>
        </div>
      </div>

      {/* Capture History */}
      <div className="border border-gold-800 bg-black/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gold-500" />
          <h2 className="text-sm font-cinzel font-bold text-gold-400 uppercase tracking-wide">
            {t('captureHistory')}
          </h2>
        </div>
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm font-rajdhani">{t('noHistory')}</p>
        </div>
      </div>
    </div>
  );
}
