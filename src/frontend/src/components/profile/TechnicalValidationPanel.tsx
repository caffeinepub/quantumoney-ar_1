import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useARGameData } from '@/hooks/useARGameData';
import ProfileGlassPanel from './ProfileGlassPanel';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function TechnicalValidationPanel() {
  const { identity } = useInternetIdentity();
  const { data: arData, isLoading, error, dataUpdatedAt } = useARGameData();

  if (!identity) {
    return null;
  }

  const principalId = identity.getPrincipal().toString();

  // AR Game Canister IDs
  const canisters = [
    { id: 'ippxc-5iaaa-aaaae-qgwqq-cai', name: 'Profile Canister' },
    { id: 'x5shd-hqaaa-aaaap-qrdgq-cai', name: 'DAO Canister' },
    { id: 'i7nyb-2yaaa-aaaaj-qowiq-cai', name: 'Bridge Canister' },
    { id: 'lkawl-3qaaa-aaaac-qdsoq-cai', name: 'Additional Canister' },
  ];

  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return 'Nunca carregado';
    return new Date(timestamp).toLocaleString('pt-PT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <ProfileGlassPanel className="border-yellow-500">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-yellow-400/30 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              Painel de Validação Técnica (Temporário)
            </h2>
            <p className="text-yellow-400/70 text-sm mt-1">
              Para fins de validação - pode ser removido após validação completa
            </p>
          </div>
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </div>

        {/* Principal ID */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-400">Principal ID (Quantumoney.app)</h3>
          <div className="bg-black/30 rounded-md p-3 border border-yellow-400/20">
            <code className="text-yellow-300 text-sm font-mono break-all">{principalId}</code>
          </div>
        </div>

        {/* Internal UserID */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-400">UserID Interno Associado</h3>
          <div className="bg-black/30 rounded-md p-3 border border-yellow-400/20">
            <code className="text-yellow-300 text-sm font-mono break-all">
              {principalId}
            </code>
            <p className="text-yellow-400/60 text-xs mt-2">
              (O Principal ID serve como identificador único do utilizador)
            </p>
          </div>
        </div>

        {/* Active Canisters */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-400">Canisters Ativos em Uso</h3>
          <div className="space-y-2">
            {canisters.map((canister) => (
              <div
                key={canister.id}
                className="bg-black/30 rounded-md p-3 border border-yellow-400/20 flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="text-yellow-400 font-medium text-sm">{canister.name}</p>
                  <code className="text-yellow-300/80 text-xs font-mono break-all">
                    {canister.id}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Data Read Timestamp */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-400">Timestamp da Última Leitura</h3>
          <div className="bg-black/30 rounded-md p-3 border border-yellow-400/20">
            <p className="text-yellow-300 text-sm">
              {dataUpdatedAt ? formatTimestamp(dataUpdatedAt) : 'Nunca carregado'}
            </p>
            {dataUpdatedAt && (
              <p className="text-yellow-400/60 text-xs mt-2">
                Atualização automática a cada 60 segundos
              </p>
            )}
          </div>
        </div>

        {/* Data Source Confirmation */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-400">Confirmação da Fonte de Dados</h3>
          <div className="bg-black/30 rounded-md p-4 border border-yellow-400/20">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                <div>
                  <p className="text-yellow-400 font-medium">A conectar aos canisters...</p>
                  <p className="text-yellow-400/60 text-sm">A carregar dados em tempo real</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Falha na Conexão</p>
                  <p className="text-red-400/70 text-sm">{error.message}</p>
                </div>
              </div>
            ) : arData ? (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Fonte de Dados: Canisters Ativos</p>
                  <p className="text-yellow-400/70 text-sm">
                    Conectado diretamente aos canisters partilhados do QuantumoneyAR.app
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 font-medium">Sem Dados</p>
                  <p className="text-yellow-400/60 text-sm">Nenhum dado carregado ainda</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Summary (if available) */}
        {arData && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-yellow-400">Resumo dos Dados Sincronizados</h3>
            <div className="bg-black/30 rounded-md p-4 border border-yellow-400/20 grid grid-cols-2 gap-4">
              <div>
                <p className="text-yellow-400/70 text-xs">XP Total</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.xp}</p>
              </div>
              <div>
                <p className="text-yellow-400/70 text-xs">Nível</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.level}</p>
              </div>
              <div>
                <p className="text-yellow-400/70 text-xs">Moedas Disponíveis</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.availableCoins}</p>
              </div>
              <div>
                <p className="text-yellow-400/70 text-xs">Moedas Bloqueadas</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.lockedCoins}</p>
              </div>
              <div>
                <p className="text-yellow-400/70 text-xs">Moedas Bónus</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.bonusCoins}</p>
              </div>
              <div>
                <p className="text-yellow-400/70 text-xs">Monstros Capturados</p>
                <p className="text-yellow-300 font-mono text-lg">{arData.capturedMonsters.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileGlassPanel>
  );
}
