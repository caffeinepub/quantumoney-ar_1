// No import from config needed — canister IDs are defined inline
const canisters = [
  {
    name: 'Frontend / Website',
    id: 'crjop-jyaaa-aaaah-atfaq-cai',
    function: 'Interface principal do Quantumoney.app',
    icon: '🌐',
  },
  {
    name: 'Gold Paper & Docs',
    id: 'whu4t-kiaaa-aaaah-qsc5q-cai',
    function: 'Documentação técnica e Gold Paper',
    icon: '📜',
  },
  {
    name: 'Governance / Treasury',
    id: 'nemlr-6aaaa-aaaan-q32la-cai',
    function: 'Governança DAO e tesouraria',
    icon: '🏛️',
  },
  {
    name: 'Logic (futuro)',
    id: 'ckmsk-taaaa-aaaah-atfca-cai',
    function: 'Lógica de jogo e regras (conceptual)',
    icon: '⚙️',
  },
  {
    name: 'Ledger QMY',
    id: '5o54h-giaaa-aaaad-aentq-cai',
    function: 'Token QMY standard ICRC-1',
    icon: '💰',
  },
];

export default function CanisterArchitecturePanel() {
  return (
    <div className="luxury-glass-card p-6">
      <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-4">
        🏗️ Arquitetura Carteira A
      </h3>
      <p className="text-qmy-gold/60 text-xs font-rajdhani mb-4">
        Todos os módulos Quantumoney usam os canisters oficiais da Carteira A no Internet Computer.
      </p>
      <div className="space-y-3">
        {canisters.map(c => (
          <div key={c.id} className="border border-qmy-gold/20 p-4 hover:border-qmy-gold/40 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-qmy-gold font-cinzel font-bold text-sm">{c.name}</div>
                <div className="text-qmy-gold/50 text-xs font-rajdhani mb-1">{c.function}</div>
                <div className="text-qmy-gold/70 font-mono text-xs break-all">{c.id}</div>
              </div>
              <a
                href={`https://${c.id}.icp0.io`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-qmy-gold/40 hover:text-qmy-gold text-xs flex-shrink-0"
                title="Abrir no ICP"
              >
                🔗
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-qmy-gold/30 font-rajdhani">
        Canister IDs verificados — Carteira A (Quantumoney.app)
      </div>
    </div>
  );
}
