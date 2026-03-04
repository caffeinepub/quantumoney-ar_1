import React, { useState, useRef, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import { useARGameData } from '../hooks/useARGameData';
import { ExternalBlob } from '../backend';
import { Copy, Upload, Send, Download, RefreshCw, LogIn, User, Wallet, History, Star, Camera } from 'lucide-react';

function formatBalance(val: bigint | undefined | null, decimals = 8): string {
  if (val === undefined || val === null) return '0.00000000';
  const num = Number(val) / Math.pow(10, decimals);
  return num.toFixed(8);
}

function formatQMY(val: bigint | undefined | null): string {
  if (val === undefined || val === null) return '0.00';
  const num = Number(val) / 1e8;
  return num.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function shortenPrincipal(p: string): string {
  if (!p) return '';
  if (p.length <= 20) return p;
  return p.slice(0, 10) + '...' + p.slice(-6);
}

export default function Perfil() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString() ?? '';

  const { data: profile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const { data: arData } = useARGameData();

  const { data: icpBalance, isLoading: icpLoading, refetch: refetchICP } = useICPLedger(principalId || undefined);
  const { data: qmyBalance, isLoading: qmyLoading, refetch: refetchQMY } = useQMYLedger(principalId || undefined);
  const { data: transactions } = useQMYTransactions(principalId || undefined);

  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<ExternalBlob | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet' | 'history' | 'stats'>('profile');
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [sendToken, setSendToken] = useState<'ICP' | 'QMY'>('QMY');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
      if (profile.photoUrl) {
        setPhotoPreview(profile.photoUrl.getDirectURL());
      }
    }
  }, [profile]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => setUploadProgress(pct));
      setPhotoBlob(blob);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const updatedProfile = {
        ...profile,
        nickname,
        photoUrl: photoBlob ?? profile.photoUrl,
      };
      await saveProfile.mutateAsync(updatedProfile);
      setEditingNickname(false);
      queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
    } catch (err) {
      console.error('Save profile error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyPrincipal = () => {
    if (principalId) {
      navigator.clipboard.writeText(principalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefreshBalances = () => {
    refetchICP();
    refetchQMY();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <LogIn className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-400 font-cinzel mb-3">Acesso Restrito</h2>
          <p className="text-yellow-300/70 mb-6 font-rajdhani">
            Faz login para aceder ao teu perfil, carteira e histórico de transações.
          </p>
          <button
            onClick={login}
            disabled={loginStatus === 'logging-in'}
            className="w-full py-3 border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400/10 transition-all font-rajdhani tracking-widest uppercase"
          >
            {loginStatus === 'logging-in' ? 'A entrar...' : 'Login com Internet Identity'}
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'wallet', label: 'Carteira', icon: Wallet },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'stats', label: 'Stats AR', icon: Star },
  ] as const;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 font-cinzel tracking-wide">O Meu Perfil</h1>
          <p className="text-yellow-300/60 text-sm font-rajdhani mt-1">
            Sincronizado com QuantumoneyAR.app
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-yellow-500/30 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-rajdhani font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-yellow-300/50 hover:text-yellow-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Photo + Name */}
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Photo */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-yellow-400 overflow-hidden bg-black/40 flex items-center justify-center">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-yellow-400/50" />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-yellow-400">
                      {uploadProgress}%
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 w-full">
                  <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-1">
                    Nome de Utilizador
                  </label>
                  {editingNickname ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        className="flex-1 bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400"
                        placeholder="O teu nome..."
                        maxLength={50}
                      />
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="px-4 py-2 border border-yellow-400 text-yellow-400 text-sm font-rajdhani hover:bg-yellow-400/10 transition-all disabled:opacity-50"
                      >
                        {isSaving ? '...' : 'Guardar'}
                      </button>
                      <button
                        onClick={() => setEditingNickname(false)}
                        className="px-3 py-2 border border-yellow-400/30 text-yellow-400/50 text-sm hover:border-yellow-400/60 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 text-xl font-cinzel">
                        {nickname || 'Sem nome'}
                      </span>
                      <button
                        onClick={() => setEditingNickname(true)}
                        className="text-yellow-400/50 hover:text-yellow-400 text-xs border border-yellow-400/30 px-2 py-1 font-rajdhani hover:border-yellow-400/60 transition-all"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Principal ID */}
            <div className="glass-card p-5">
              <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-2">
                Principal ID (Login ID)
              </label>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-yellow-400 text-xs font-mono break-all bg-black/20 px-3 py-2 border border-yellow-400/20">
                  {principalId}
                </code>
                <button
                  onClick={handleCopyPrincipal}
                  className="flex items-center gap-1 px-3 py-2 border border-yellow-400/50 text-yellow-400 text-xs hover:bg-yellow-400/10 transition-all font-rajdhani"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <p className="text-yellow-300/40 text-xs mt-2 font-rajdhani">
                Este é o teu ID único — idêntico no site e na PWA QuantumoneyAR.app
              </p>
            </div>

            {/* XP & Level */}
            {profile && (
              <div className="glass-card p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'XP Total', value: profile.xp?.toString() ?? '0' },
                    { label: 'Nível', value: profile.level?.toString() ?? '1' },
                    { label: 'Tokens Disponíveis', value: profile.availableTokens?.toString() ?? '0' },
                    { label: 'Tokens Plantados', value: profile.plantedTokens?.toString() ?? '0' },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className="text-yellow-400 font-bold text-xl font-cinzel">{item.value}</div>
                      <div className="text-yellow-300/50 text-xs font-rajdhani uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Balances */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-yellow-400 font-bold font-cinzel">Saldos da Carteira</h3>
                <button
                  onClick={handleRefreshBalances}
                  className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-yellow-400/30 p-4 bg-black/20">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/generated/icp-coin-gold.dim_128x128.png" alt="ICP" className="w-8 h-8" />
                    <span className="text-yellow-300/70 text-sm font-rajdhani uppercase tracking-wider">ICP</span>
                  </div>
                  <div className="text-yellow-400 text-2xl font-bold font-cinzel">
                    {icpLoading ? '...' : formatBalance(icpBalance)}
                  </div>
                  <div className="text-yellow-300/40 text-xs font-rajdhani mt-1">Internet Computer Protocol</div>
                </div>
                <div className="border border-yellow-400/30 p-4 bg-black/20">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/generated/qmy-coin-gold.dim_128x128.png" alt="QMY" className="w-8 h-8" />
                    <span className="text-yellow-300/70 text-sm font-rajdhani uppercase tracking-wider">QMY</span>
                  </div>
                  <div className="text-yellow-400 text-2xl font-bold font-cinzel">
                    {qmyLoading ? '...' : formatQMY(qmyBalance)}
                  </div>
                  <div className="text-yellow-300/40 text-xs font-rajdhani mt-1">Quantumoney Token</div>
                </div>
              </div>
            </div>

            {/* Receive */}
            <div className="glass-card p-6">
              <h3 className="text-yellow-400 font-bold font-cinzel mb-4 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Receber Tokens
              </h3>
              <p className="text-yellow-300/60 text-sm font-rajdhani mb-3">
                Partilha o teu Principal ID para receber ICP ou QMY:
              </p>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-yellow-400 text-xs font-mono break-all bg-black/20 px-3 py-2 border border-yellow-400/20">
                  {principalId}
                </code>
                <button
                  onClick={handleCopyPrincipal}
                  className="flex items-center gap-1 px-3 py-2 border border-yellow-400/50 text-yellow-400 text-xs hover:bg-yellow-400/10 transition-all font-rajdhani whitespace-nowrap"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Send */}
            <div className="glass-card p-6">
              <h3 className="text-yellow-400 font-bold font-cinzel mb-4 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Tokens
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-1">
                    Token
                  </label>
                  <div className="flex gap-2">
                    {(['ICP', 'QMY'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setSendToken(t)}
                        className={`px-4 py-2 text-sm font-rajdhani font-bold border transition-all ${
                          sendToken === t
                            ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                            : 'border-yellow-400/30 text-yellow-400/50 hover:border-yellow-400/60'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-1">
                    Destinatário (Principal ID)
                  </label>
                  <input
                    type="text"
                    value={sendTo}
                    onChange={e => setSendTo(e.target.value)}
                    placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                    className="w-full bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-mono focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={e => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.00000001"
                    className="w-full bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div className="bg-yellow-400/5 border border-yellow-400/20 p-3">
                  <p className="text-yellow-300/60 text-xs font-rajdhani">
                    ⚠️ As transferências são irreversíveis. Verifica sempre o endereço antes de enviar.
                    As transferências reais requerem integração com o ledger ICP/QMY.
                  </p>
                </div>
                <button
                  disabled
                  className="w-full py-3 border border-yellow-400/30 text-yellow-400/40 font-rajdhani font-bold uppercase tracking-wider cursor-not-allowed text-sm"
                >
                  Enviar {sendToken} (Em breve)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="glass-card p-6">
            <h3 className="text-yellow-400 font-bold font-cinzel mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              Histórico de Transações
            </h3>
            {transactions === null ? (
              <div className="text-center py-8">
                <p className="text-yellow-300/50 font-rajdhani">
                  Histórico de transações não disponível neste momento.
                </p>
                <p className="text-yellow-300/30 text-xs font-rajdhani mt-2">
                  O ledger QMY não suporta consulta de histórico via ICRC-1 neste canister.
                </p>
              </div>
            ) : transactions && transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between border border-yellow-400/20 p-3 bg-black/20">
                    <div>
                      <span className={`text-xs font-rajdhani font-bold uppercase px-2 py-0.5 border ${
                        tx.kind === 'transfer' ? 'border-yellow-400/50 text-yellow-400' :
                        tx.kind === 'mint' ? 'border-green-400/50 text-green-400' :
                        'border-red-400/50 text-red-400'
                      }`}>
                        {tx.kind}
                      </span>
                      <p className="text-yellow-300/50 text-xs font-mono mt-1">
                        {tx.from ? shortenPrincipal(tx.from) : '—'} → {tx.to ? shortenPrincipal(tx.to) : '—'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold font-cinzel text-sm">
                        {formatQMY(tx.amount)} QMY
                      </div>
                      <div className="text-yellow-300/40 text-xs font-rajdhani">
                        {tx.timestamp ? new Date(Number(tx.timestamp) / 1_000_000).toLocaleDateString('pt-PT') : '—'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-yellow-300/50 font-rajdhani">Sem transações registadas.</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-yellow-400 font-bold font-cinzel mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Estatísticas AR
              </h3>
              {arData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'XP', value: arData.xp?.toString() ?? '0' },
                      { label: 'Nível', value: arData.level?.toString() ?? '1' },
                      { label: 'Energia', value: arData.energy?.toString() ?? '100' },
                      { label: 'Tokens Disponíveis', value: arData.availableTokens?.toString() ?? '0' },
                      { label: 'Tokens Plantados', value: arData.plantedTokens?.toString() ?? '0' },
                      { label: 'Monstros Capturados', value: arData.capturedMonsters?.length?.toString() ?? '0' },
                    ].map(item => (
                      <div key={item.label} className="border border-yellow-400/20 p-3 text-center bg-black/20">
                        <div className="text-yellow-400 font-bold text-xl font-cinzel">{item.value}</div>
                        <div className="text-yellow-300/50 text-xs font-rajdhani uppercase tracking-wider mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Level progress */}
                  <div>
                    <div className="flex justify-between text-xs font-rajdhani text-yellow-300/60 mb-1">
                      <span>Progresso para Nível {(Number(arData.level ?? 1) + 1)}</span>
                      <span>{arData.xp?.toString() ?? '0'} XP</span>
                    </div>
                    <div className="w-full bg-black/40 border border-yellow-400/20 h-2">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${Math.min(100, (Number(arData.xp ?? 0) % 1000) / 10)}%` }}
                      />
                    </div>
                  </div>

                  {/* Monsters */}
                  {arData.capturedMonsters && arData.capturedMonsters.length > 0 && (
                    <div>
                      <h4 className="text-yellow-400 font-bold font-cinzel text-sm mb-3">Monstros Capturados</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {arData.capturedMonsters.map((cm, i) => (
                          <div key={i} className="border border-yellow-400/20 p-2 bg-black/20 text-center">
                            <div className="text-yellow-400 text-sm font-rajdhani font-bold">{cm.monster.name}</div>
                            <div className="text-yellow-300/50 text-xs font-rajdhani">+{cm.monster.energyBoost?.toString()} energia</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-yellow-300/50 font-rajdhani">
                    Dados AR não disponíveis. Joga no QuantumoneyAR.app para ver as tuas estatísticas aqui.
                  </p>
                  <a
                    href="https://quantumoneyar.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 border border-yellow-400 text-yellow-400 text-sm font-rajdhani hover:bg-yellow-400/10 transition-all"
                  >
                    Ir para QuantumoneyAR.app
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
