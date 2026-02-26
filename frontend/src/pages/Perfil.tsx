import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile, useRegisterPlayer, useSaveCallerUserProfile } from '../hooks/useQueries';
import ProfileGlassPanel from '../components/profile/ProfileGlassPanel';
import ProfileHudOverlay from '../components/profile/ProfileHudOverlay';
import ProfilePlaceholders from '../components/profile/ProfilePlaceholders';
import ARPlayerStats from '../components/profile/ARPlayerStats';
import ARCoinBalance from '../components/profile/ARCoinBalance';
import ARMonsterCollection from '../components/profile/ARMonsterCollection';
import TechnicalValidationPanel from '../components/profile/TechnicalValidationPanel';
import { useARGameData } from '../hooks/useARGameData';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYVesting } from '../hooks/useQMYVesting';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import VestingBreakdown from '../components/wallet/VestingBreakdown';
import QMYTransactionHistory from '../components/wallet/QMYTransactionHistory';
import { Coins, Wallet, User, Shield, RefreshCw, LogIn } from 'lucide-react';

function SendQMYSimulatedCard() {
  return (
    <ProfileGlassPanel>
      <div className="flex items-center gap-2 mb-3">
        <RefreshCw size={16} className="text-yellow-400" />
        <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Enviar QMY</h3>
      </div>
      <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-3 text-center">
        <p className="text-yellow-400/70 text-xs">
          Transferências QMY disponíveis em breve via ICP Ledger.
        </p>
        <p className="text-yellow-400/50 text-xs mt-1">
          Modo simulado ativo — sem transferências reais.
        </p>
      </div>
    </ProfileGlassPanel>
  );
}

export default function Perfil() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { mutateAsync: registerPlayer, isPending: isRegistering } = useRegisterPlayer();
  const { mutateAsync: saveProfile, isPending: isSaving } = useSaveCallerUserProfile();

  const { data: arProfile } = useARGameData();
  const { data: qmyBalance, isLoading: qmyLoading } = useQMYLedger();
  const { data: icpBalance, isLoading: icpLoading } = useICPLedger();
  const { data: vestingData } = useQMYVesting();
  const { data: transactions, isLoading: txLoading } = useQMYTransactions();

  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [registerNickname, setRegisterNickname] = useState('');

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;
  const isRegistered = userProfile?.registered === true;

  const handleRegister = async () => {
    if (!registerNickname.trim()) return;
    try {
      await registerPlayer(registerNickname.trim());
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    } catch (e) {
      console.error('Registration error:', e);
    }
  };

  const handleSave = async () => {
    if (!userProfile || !nickname.trim()) return;
    try {
      await saveProfile({ ...userProfile, nickname: nickname.trim() });
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    } catch (e) {
      console.error('Save error:', e);
    }
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <ProfileGlassPanel className="max-w-md w-full text-center">
          <div className="flex flex-col items-center gap-4 py-6">
            <LogIn size={40} className="text-yellow-400" />
            <h2 className="text-yellow-400 text-xl font-bold">Acesso Restrito</h2>
            <p className="text-yellow-400/70 text-sm">
              Faça login para aceder ao seu perfil e carteira.
            </p>
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="mt-2 px-6 py-2 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {isLoggingIn ? 'A entrar...' : 'Entrar com Internet Identity'}
            </button>
          </div>
        </ProfileGlassPanel>
      </div>
    );
  }

  // Loading
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-yellow-400 text-sm animate-pulse">A carregar perfil...</div>
      </div>
    );
  }

  // Registration flow
  if (showProfileSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <ProfileGlassPanel className="max-w-md w-full">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-yellow-400" />
              <h2 className="text-yellow-400 text-lg font-bold">Criar Perfil</h2>
            </div>
            <p className="text-yellow-400/70 text-sm">
              Bem-vindo ao Quantumoney! Escolhe o teu nickname para começar.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-yellow-400/80 text-xs uppercase tracking-wider">Nickname</label>
              <input
                type="text"
                value={registerNickname}
                onChange={(e) => setRegisterNickname(e.target.value)}
                placeholder="O teu nickname..."
                className="bg-black/40 border border-yellow-400/40 text-yellow-400 rounded-lg px-3 py-2 text-sm placeholder:text-yellow-400/30 focus:outline-none focus:border-yellow-400/70"
                maxLength={30}
              />
            </div>
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3 text-xs text-yellow-400/70">
              <p className="font-semibold text-yellow-400 mb-1">Bónus de Boas-Vindas:</p>
              <p>• 100 QTM disponíveis imediatamente</p>
              <p>• 900 QTM bloqueados (vesting 9 meses)</p>
              <p>• 100 XP iniciais</p>
              <p>• 100% energia</p>
            </div>
            <button
              onClick={handleRegister}
              disabled={isRegistering || !registerNickname.trim()}
              className="px-6 py-2 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {isRegistering ? 'A registar...' : 'Criar Perfil'}
            </button>
          </div>
        </ProfileGlassPanel>
      </div>
    );
  }

  const principalId = identity?.getPrincipal().toString() ?? '';

  // Build data objects matching the exact prop shapes of each component
  const arStatsData = arProfile
    ? { xp: Number(arProfile.xp), level: Number(arProfile.level) }
    : undefined;

  const arCoinData = arProfile
    ? {
        availableCoins: Number(arProfile.availableTokens),
        lockedCoins: Number(arProfile.plantedTokens),
        bonusCoins: Number(arProfile.bonusTokens),
      }
    : undefined;

  const arMonsterData = arProfile
    ? {
        capturedMonsters: arProfile.capturedMonsters.map((cm) => ({
          name: cm.monster.name,
          captureTime: Number(cm.captureTime),
          energyBoost: Number(cm.monster.energyBoost),
        })),
      }
    : undefined;

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      {isRegistered && arProfile && (
        <ProfileHudOverlay profile={arProfile} />
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-2">
          <h1 className="text-yellow-400 text-2xl font-bold tracking-wider">MEU PERFIL</h1>
          <p className="text-yellow-400/50 text-xs mt-1">Perfil & Carteira Integrados</p>
        </div>

        {/* ── PROFILE SECTION ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-yellow-400" />
            <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Informações do Utilizador</h3>
          </div>

          {userProfile ? (
            <div className="space-y-3">
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder={userProfile.nickname}
                    className="bg-black/40 border border-yellow-400/40 text-yellow-400 rounded-lg px-3 py-2 text-sm placeholder:text-yellow-400/30 focus:outline-none focus:border-yellow-400/70"
                    maxLength={30}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !nickname.trim()}
                      className="flex-1 px-4 py-1.5 bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-colors disabled:opacity-50 text-xs"
                    >
                      {isSaving ? 'A guardar...' : 'Guardar'}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 px-4 py-1.5 bg-black/40 border border-yellow-400/20 text-yellow-400/60 rounded-lg hover:bg-black/60 transition-colors text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 font-semibold">{userProfile.nickname}</p>
                    <p className="text-yellow-400/50 text-xs mt-0.5">
                      Nível {Number(userProfile.level)} · {Number(userProfile.xp)} XP
                    </p>
                  </div>
                  <button
                    onClick={() => { setNickname(userProfile.nickname); setEditMode(true); }}
                    className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400/70 rounded-lg hover:bg-yellow-400/20 transition-colors text-xs"
                  >
                    Editar
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-center">
                  <p className="text-yellow-400 font-bold text-sm">{Number(userProfile.availableTokens)}</p>
                  <p className="text-yellow-400/50 text-xs">QTM Livres</p>
                </div>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-center">
                  <p className="text-yellow-400 font-bold text-sm">{Number(userProfile.plantedTokens)}</p>
                  <p className="text-yellow-400/50 text-xs">Plantados</p>
                </div>
                <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-center">
                  <p className="text-yellow-400 font-bold text-sm">{Number(userProfile.bonusTokens)}</p>
                  <p className="text-yellow-400/50 text-xs">Bónus</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-center">
                  <p className="text-yellow-400 font-bold text-sm">{Number(userProfile.energy)}%</p>
                  <p className="text-yellow-400/50 text-xs">Energia</p>
                </div>
                <div className="flex-1 bg-black/30 border border-yellow-400/20 rounded-lg p-2 text-center">
                  <p className="text-yellow-400 font-bold text-sm">{userProfile.capturedMonsters.length}</p>
                  <p className="text-yellow-400/50 text-xs">Monstros</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-yellow-400/50 text-sm">Perfil não encontrado.</p>
          )}
        </ProfileGlassPanel>

        {/* ── AR STATS ── */}
        <ARPlayerStats data={arStatsData} />

        {/* ── AR COIN BALANCE ── */}
        <ARCoinBalance data={arCoinData} />

        {/* ── WALLET SECTION ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={16} className="text-yellow-400" />
            <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Carteira</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* QMY Balance */}
            <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Coins size={12} className="text-yellow-400" />
                <p className="text-yellow-400/70 text-xs uppercase tracking-wider">QMY</p>
              </div>
              {qmyLoading ? (
                <p className="text-yellow-400/50 text-xs animate-pulse">A carregar...</p>
              ) : (
                <p className="text-yellow-400 font-bold text-lg">
                  {qmyBalance !== undefined && qmyBalance !== null
                    ? (qmyBalance as { formatted?: string }).formatted ?? String(qmyBalance)
                    : '—'}
                </p>
              )}
            </div>

            {/* ICP Balance */}
            <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Shield size={12} className="text-yellow-400" />
                <p className="text-yellow-400/70 text-xs uppercase tracking-wider">ICP</p>
              </div>
              {icpLoading ? (
                <p className="text-yellow-400/50 text-xs animate-pulse">A carregar...</p>
              ) : (
                <p className="text-yellow-400 font-bold text-lg">
                  {icpBalance !== undefined && icpBalance !== null
                    ? (icpBalance as { formatted?: string }).formatted ?? String(icpBalance)
                    : '—'}
                </p>
              )}
            </div>
          </div>
        </ProfileGlassPanel>

        {/* ── VESTING BREAKDOWN ── */}
        {vestingData && (
          <ProfileGlassPanel>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-yellow-400" />
              <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Vesting</h3>
            </div>
            <VestingBreakdown
              available={vestingData.available}
              locked={vestingData.locked}
              nextUnlock={vestingData.nextUnlock}
            />
          </ProfileGlassPanel>
        )}

        {/* ── SEND QMY (Simulated) ── */}
        <SendQMYSimulatedCard />

        {/* ── TRANSACTION HISTORY ── */}
        <ProfileGlassPanel>
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw size={16} className="text-yellow-400" />
            <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Histórico de Transações</h3>
          </div>
          <QMYTransactionHistory
            transactions={transactions ?? null}
            isLoading={txLoading}
          />
        </ProfileGlassPanel>

        {/* ── MONSTER COLLECTION ── */}
        <ARMonsterCollection data={arMonsterData} />

        {/* ── TECHNICAL PANEL ── */}
        <TechnicalValidationPanel />

        {/* ── PLACEHOLDERS ── */}
        <ProfilePlaceholders />
      </div>
    </div>
  );
}
