import { useState, useRef, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import { ExternalBlob } from '../backend';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import CanisterArchitecturePanel from '../components/profile/CanisterArchitecturePanel';
import TechnicalValidationPanel from '../components/profile/TechnicalValidationPanel';
import VestingBreakdown from '../components/wallet/VestingBreakdown';

function formatBalance(val: bigint | undefined | null, decimals = 8): string {
  if (val === undefined || val === null) return '—';
  const n = Number(val) / Math.pow(10, decimals);
  return n.toLocaleString('pt-PT', { maximumFractionDigits: 4 });
}

function xpForLevel(level: number): number {
  return level * 100;
}

// Inline transaction history to avoid prop type mismatch
function TransactionHistoryInline({ principalId }: { principalId?: string }) {
  const { data: transactions, isLoading, error } = useQMYTransactions(principalId);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-sm font-rajdhani">Erro ao carregar transações.</p>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-qmy-gold/60 font-rajdhani">Nenhuma transação encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx, i) => (
        <div key={i} className="border border-qmy-gold/20 p-3 flex justify-between items-center">
          <div>
            <div className="text-qmy-gold font-rajdhani text-sm capitalize">{tx.kind}</div>
            <div className="text-qmy-gold/50 text-xs font-mono">
              {new Date(Number(tx.timestamp) / 1_000_000).toLocaleString('pt-PT')}
            </div>
          </div>
          <div className="text-qmy-gold font-cinzel font-bold">
            {(Number(tx.amount) / 1e8).toFixed(4)} QMY
          </div>
        </div>
      ))}
    </div>
  );
}

// Inline AR stats to avoid prop type mismatch
function ARStatsInline({ profile }: { profile: ReturnType<typeof useGetCallerUserProfile>['data'] }) {
  if (!profile) {
    return (
      <div className="luxury-glass-card p-6 text-center">
        <p className="text-qmy-gold/60 font-rajdhani">Carregando estatísticas...</p>
      </div>
    );
  }

  const level = Number(profile.level);
  const xp = Number(profile.xp);
  const xpNeeded = level * 100;
  const xpProgress = Math.min(100, (xp / xpNeeded) * 100);

  return (
    <div className="space-y-4">
      <div className="luxury-glass-card p-6">
        <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">🎮 Estatísticas AR</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Nível', value: String(level), color: 'text-qmy-gold' },
            { label: 'XP Total', value: String(xp), color: 'text-blue-400' },
            { label: 'Energia', value: String(Number(profile.energy)), color: 'text-green-400' },
            { label: 'Monstros', value: String(profile.capturedMonsters.length), color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="luxury-glass-card p-4 text-center">
              <div className={`font-cinzel font-bold text-2xl ${s.color}`}>{s.value}</div>
              <div className="text-qmy-gold/50 text-xs font-rajdhani">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-xs text-qmy-gold/60 font-rajdhani mb-1">
            <span>Progresso para Nível {level + 1}</span>
            <span>{xp} / {xpNeeded} XP</span>
          </div>
          <Progress value={xpProgress} className="h-3 bg-black/40" />
        </div>
      </div>

      <div className="luxury-glass-card p-6">
        <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">💰 Saldo de Moedas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Disponível', value: Number(profile.availableTokens), color: 'text-green-400', icon: '✅' },
            { label: 'Plantado', value: Number(profile.plantedTokens), color: 'text-yellow-400', icon: '🌱' },
            { label: 'Bónus', value: Number(profile.bonusTokens), color: 'text-purple-400', icon: '🎁' },
          ].map(b => (
            <div key={b.label} className="border border-qmy-gold/20 p-4 text-center">
              <div className="text-2xl mb-1">{b.icon}</div>
              <div className={`font-cinzel font-bold text-2xl ${b.color}`}>{b.value}</div>
              <div className="text-qmy-gold/50 text-xs font-rajdhani">{b.label} QMY</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline monster collection
function MonsterCollectionInline({ profile }: { profile: ReturnType<typeof useGetCallerUserProfile>['data'] }) {
  if (!profile) {
    return (
      <div className="luxury-glass-card p-6 text-center">
        <p className="text-qmy-gold/60 font-rajdhani">Carregando coleção...</p>
      </div>
    );
  }

  const monsters = profile.capturedMonsters;

  return (
    <div className="luxury-glass-card p-6">
      <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">
        🐉 Coleção de Monstros ({monsters.length})
      </h3>
      {monsters.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🥚</div>
          <p className="text-qmy-gold/60 font-rajdhani">Ainda não capturaste nenhum monstro.</p>
          <p className="text-qmy-gold/40 text-xs font-rajdhani mt-1">Usa o modo AR para capturar monstros!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {monsters.map((cm, i) => (
            <div key={i} className="border border-qmy-gold/20 p-4">
              <div className="text-2xl mb-2">🐉</div>
              <div className="text-qmy-gold font-cinzel font-bold text-sm">{cm.monster.name}</div>
              <div className="text-qmy-gold/60 text-xs font-rajdhani mt-1">
                Energia: +{Number(cm.monster.energyBoost)}
              </div>
              <div className="text-qmy-gold/40 text-xs font-rajdhani">
                {new Date(Number(cm.captureTime) / 1_000_000).toLocaleDateString('pt-PT')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Perfil() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const principalId = identity?.getPrincipal().toString() ?? null;

  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: icpBalance, isLoading: icpLoading } = useICPLedger(principalId ?? undefined);
  const { data: qmyBalance, isLoading: qmyLoading } = useQMYLedger(principalId ?? undefined);

  const [activeTab, setActiveTab] = useState('profile');
  const [nickname, setNickname] = useState('');
  const [editingNick, setEditingNick] = useState(false);
  const [savingNick, setSavingNick] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [sendMsg, setSendMsg] = useState('');
  const [receiveMsg, setReceiveMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile?.nickname) setNickname(profile.nickname);
    if (profile?.photoUrl) {
      const url = profile.photoUrl.getDirectURL();
      setPhotoPreview(url);
    }
  }, [profile]);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="luxury-glass-card p-10 text-center max-w-md">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="font-cinzel text-qmy-gold text-2xl font-bold mb-3">Acesso Restrito</h2>
          <p className="text-qmy-gold/70 font-rajdhani">Faz login para aceder ao teu perfil e carteira.</p>
        </div>
      </div>
    );
  }

  const level = profile ? Number(profile.level) : 1;
  const xp = profile ? Number(profile.xp) : 0;
  const xpNeeded = xpForLevel(level);
  const xpProgress = Math.min(100, (xp / xpNeeded) * 100);

  async function handleSaveNickname() {
    if (!actor || !nickname.trim()) return;
    setSavingNick(true);
    try {
      await actor.updateProfile(nickname.trim(), profile?.photoUrl ?? null);
      await queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
      setEditingNick(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNick(false);
    }
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !actor) return;
    setUploadingPhoto(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      await actor.updateProfile(nickname || profile?.nickname || 'Player', blob);
      await queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSend() {
    setSendMsg('');
    if (!sendAmount || !sendTo) {
      setSendMsg('⚠️ Preenche o destinatário e o valor.');
      return;
    }
    setSendMsg('⚠️ Transferências reais ainda não disponíveis nesta versão. Em breve!');
  }

  function handleReceive() {
    if (principalId) {
      navigator.clipboard.writeText(principalId).then(() => {
        setReceiveMsg('✅ Principal ID copiado para a área de transferência!');
        setTimeout(() => setReceiveMsg(''), 3000);
      });
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="luxury-glass-card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-24 h-24 rounded-full border-2 border-qmy-gold overflow-hidden bg-black/40 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Clica para alterar foto"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">👤</span>
              )}
              {uploadingPhoto && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                  <div className="w-6 h-6 border-2 border-qmy-gold border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button
              className="absolute bottom-0 right-0 bg-qmy-gold text-black rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold border-2 border-black"
              onClick={() => fileInputRef.current?.click()}
              title="Editar foto"
            >
              ✏️
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Name & Principal */}
          <div className="flex-1 text-center sm:text-left">
            {editingNick ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  className="bg-black/40 border border-qmy-gold/50 text-qmy-gold px-3 py-1 font-cinzel text-lg rounded focus:outline-none focus:border-qmy-gold"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSaveNickname()}
                  autoFocus
                />
                <button
                  className="luxury-cta-btn px-3 py-1 text-sm"
                  onClick={handleSaveNickname}
                  disabled={savingNick}
                >
                  {savingNick ? '...' : '✓'}
                </button>
                <button
                  className="border border-qmy-gold/40 text-qmy-gold/60 px-3 py-1 text-sm hover:border-qmy-gold/70"
                  onClick={() => setEditingNick(false)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <h1 className="font-cinzel text-qmy-gold text-2xl font-bold">
                  {profileLoading ? <Skeleton className="h-7 w-32" /> : (profile?.nickname || 'Jogador')}
                </h1>
                <button
                  className="text-qmy-gold/50 hover:text-qmy-gold text-sm"
                  onClick={() => setEditingNick(true)}
                  title="Editar nome"
                >
                  ✏️
                </button>
              </div>
            )}
            <p className="text-qmy-gold/50 text-xs font-rajdhani break-all">
              ID: {principalId ? `${principalId.slice(0, 20)}...` : '—'}
            </p>
            {/* XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-qmy-gold/60 font-rajdhani mb-1">
                <span>Nível {level}</span>
                <span>{xp} / {xpNeeded} XP</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-black/40" />
            </div>
          </div>

          {/* Quick balances */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="luxury-glass-card px-4 py-2 text-center">
              <div className="text-qmy-gold/50 text-xs font-rajdhani uppercase">ICP</div>
              <div className="text-qmy-gold font-cinzel font-bold text-lg">
                {icpLoading ? <Skeleton className="h-5 w-16 mx-auto" /> : formatBalance(icpBalance)}
              </div>
            </div>
            <div className="luxury-glass-card px-4 py-2 text-center">
              <div className="text-qmy-gold/50 text-xs font-rajdhani uppercase">QMY</div>
              <div className="text-qmy-gold font-cinzel font-bold text-lg">
                {qmyLoading ? <Skeleton className="h-5 w-16 mx-auto" /> : formatBalance(qmyBalance)}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-black/40 border border-qmy-gold/30 mb-6 flex flex-wrap h-auto gap-1 p-1">
            {[
              { value: 'profile', label: '👤 Perfil' },
              { value: 'wallet', label: '💰 Carteira' },
              { value: 'history', label: '📋 Histórico' },
              { value: 'stats', label: '🎮 Stats AR' },
              { value: 'monsters', label: '🐉 Monstros' },
              { value: 'technical', label: '⚙️ Técnico' },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-qmy-gold/70 data-[state=active]:text-qmy-gold data-[state=active]:bg-qmy-gold/20 font-rajdhani text-xs sm:text-sm flex-1"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="luxury-glass-card p-6">
                <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">Informações do Jogador</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Nome', value: profile?.nickname || '—' },
                    { label: 'Nível', value: String(level) },
                    { label: 'XP Total', value: String(xp) },
                    { label: 'Energia', value: profile ? String(Number(profile.energy)) : '—' },
                    { label: 'Moedas Disponíveis', value: profile ? `${Number(profile.availableTokens)} QMY` : '—' },
                    { label: 'Moedas Plantadas', value: profile ? `${Number(profile.plantedTokens)} QMY` : '—' },
                    { label: 'Bónus', value: profile ? `${Number(profile.bonusTokens)} QMY` : '—' },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className={`flex justify-between items-center ${i < arr.length - 1 ? 'border-b border-qmy-gold/20 pb-2' : ''}`}
                    >
                      <span className="text-qmy-gold/60 text-sm font-rajdhani">{item.label}</span>
                      <span className="text-qmy-gold font-rajdhani">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="luxury-glass-card p-6">
                <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">🎁 Bónus de Boas-Vindas</h3>
                <div className="bg-qmy-gold/10 border border-qmy-gold/30 p-4 rounded mb-4">
                  <div className="text-qmy-gold font-cinzel font-bold text-2xl text-center mb-1">1.000 QMY</div>
                  <div className="text-qmy-gold/70 text-sm text-center font-rajdhani">Bónus de registo</div>
                </div>
                <div className="space-y-2 text-sm font-rajdhani">
                  {[
                    { label: 'Desbloqueado imediatamente', value: '100 QMY', color: 'text-green-400' },
                    { label: 'Em vesting (9 meses)', value: '900 QMY', color: 'text-yellow-400' },
                    { label: 'XP de bónus', value: '+100 XP', color: 'text-blue-400' },
                    { label: 'Desbloqueio mensal', value: '100 QMY / 30 dias', color: 'text-qmy-gold' },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className={`flex justify-between ${i === arr.length - 1 ? 'border-t border-qmy-gold/20 pt-2' : ''}`}
                    >
                      <span className="text-qmy-gold/60">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-qmy-gold/40 font-rajdhani">
                  * Bónus atribuído automaticamente no primeiro registo. Apenas uma vez por conta.
                </div>
              </div>
            </div>
          </TabsContent>

          {/* WALLET TAB */}
          <TabsContent value="wallet">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="luxury-glass-card p-6 text-center">
                  <img src="/assets/generated/icp-coin-gold.dim_128x128.png" alt="ICP" className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-1">Saldo ICP</div>
                  <div className="text-qmy-gold font-cinzel font-bold text-3xl">
                    {icpLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : formatBalance(icpBalance)}
                  </div>
                  <div className="text-qmy-gold/40 text-xs mt-1">Internet Computer Protocol</div>
                </div>
                <div className="luxury-glass-card p-6 text-center">
                  <img src="/assets/generated/qmy-coin-gold.dim_128x128.png" alt="QMY" className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-1">Saldo QMY</div>
                  <div className="text-qmy-gold font-cinzel font-bold text-3xl">
                    {qmyLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : formatBalance(qmyBalance)}
                  </div>
                  <div className="text-qmy-gold/40 text-xs mt-1">Quantumoney Token</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="luxury-glass-card p-6">
                  <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📤 Enviar QMY</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-qmy-gold/60 text-xs font-rajdhani uppercase block mb-1">Destinatário (Principal ID)</label>
                      <input
                        className="w-full bg-black/40 border border-qmy-gold/30 text-qmy-gold px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-qmy-gold"
                        placeholder="aaaaa-bbbbb-ccccc-..."
                        value={sendTo}
                        onChange={e => setSendTo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-qmy-gold/60 text-xs font-rajdhani uppercase block mb-1">Valor (QMY)</label>
                      <input
                        className="w-full bg-black/40 border border-qmy-gold/30 text-qmy-gold px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-qmy-gold"
                        placeholder="0.00"
                        type="number"
                        min="0"
                        value={sendAmount}
                        onChange={e => setSendAmount(e.target.value)}
                      />
                    </div>
                    <button className="luxury-cta-btn w-full py-2 text-sm" onClick={handleSend}>
                      Enviar
                    </button>
                    {sendMsg && <p className="text-xs text-qmy-gold/70 font-rajdhani">{sendMsg}</p>}
                  </div>
                </div>

                <div className="luxury-glass-card p-6">
                  <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📥 Receber QMY</h3>
                  <p className="text-qmy-gold/60 text-sm font-rajdhani mb-3">
                    Partilha o teu Principal ID para receber tokens QMY de outros jogadores.
                  </p>
                  <div className="bg-black/40 border border-qmy-gold/20 p-3 break-all text-qmy-gold/80 text-xs font-mono mb-3">
                    {principalId || '—'}
                  </div>
                  <button className="luxury-cta-btn w-full py-2 text-sm" onClick={handleReceive}>
                    📋 Copiar Principal ID
                  </button>
                  {receiveMsg && <p className="text-xs text-green-400 font-rajdhani mt-2">{receiveMsg}</p>}
                  <div className="mt-4 text-xs text-qmy-gold/40 font-rajdhani">
                    * Transferências reais disponíveis em breve via canister QMY Ledger.
                  </div>
                </div>
              </div>

              <VestingBreakdown
                available={profile ? profile.availableTokens : undefined}
                locked={profile ? profile.plantedTokens : undefined}
              />
            </div>
          </TabsContent>

          {/* HISTORY TAB */}
          <TabsContent value="history">
            <div className="luxury-glass-card p-6">
              <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">📋 Histórico de Transações</h3>
              <TransactionHistoryInline principalId={principalId ?? undefined} />
            </div>
          </TabsContent>

          {/* AR STATS TAB */}
          <TabsContent value="stats">
            <ARStatsInline profile={profile} />
          </TabsContent>

          {/* MONSTERS TAB */}
          <TabsContent value="monsters">
            <MonsterCollectionInline profile={profile} />
          </TabsContent>

          {/* TECHNICAL TAB */}
          <TabsContent value="technical">
            <div className="space-y-6">
              <TechnicalValidationPanel />
              <CanisterArchitecturePanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
