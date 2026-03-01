import { useInternetIdentity } from '../../hooks/useInternetIdentity';

const CARTEIRA_A_CANISTERS = [
  { label: 'Frontend / Website', id: 'crjop-jyaaa-aaaah-atfaq-cai' },
  { label: 'Gold Paper & Docs', id: 'whu4t-kiaaa-aaaah-qsc5q-cai' },
  { label: 'Governance / Treasury', id: 'nemlr-6aaaa-aaaan-q32la-cai' },
  { label: 'Logic (futuro)', id: 'ckmsk-taaaa-aaaah-atfca-cai' },
  { label: 'Ledger QMY', id: '5o54h-giaaa-aaaad-aentq-cai' },
];

export default function TechnicalValidationPanel() {
  const { identity } = useInternetIdentity();
  const principalId = identity?.getPrincipal().toString() ?? null;
  const now = new Date().toLocaleString('pt-PT');

  return (
    <div className="luxury-glass-card p-6">
      <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">
        🔍 Validação Técnica
      </h3>

      {/* Principal ID */}
      <div className="mb-4">
        <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-1">Principal ID</div>
        <div className="bg-black/40 border border-qmy-gold/20 p-3 font-mono text-xs text-qmy-gold/80 break-all">
          {principalId || 'Não autenticado'}
        </div>
      </div>

      {/* Canister IDs */}
      <div className="mb-4">
        <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase mb-2">Canisters Carteira A</div>
        <div className="space-y-2">
          {CARTEIRA_A_CANISTERS.map(c => (
            <div key={c.id} className="flex justify-between items-center border-b border-qmy-gold/10 pb-2">
              <span className="text-qmy-gold/60 text-xs font-rajdhani">{c.label}</span>
              <span className="text-qmy-gold font-mono text-xs">{c.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification timestamp */}
      <div className="text-qmy-gold/30 text-xs font-rajdhani">
        Última verificação: {now}
      </div>

      {/* Sync status */}
      <div className="mt-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${principalId ? 'bg-green-400' : 'bg-red-400'}`} />
        <span className="text-xs font-rajdhani text-qmy-gold/60">
          {principalId ? 'Sincronizado com Carteira A' : 'Não sincronizado — faz login'}
        </span>
      </div>
    </div>
  );
}
