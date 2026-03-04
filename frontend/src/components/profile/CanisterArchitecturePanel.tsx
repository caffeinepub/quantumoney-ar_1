import { Server } from 'lucide-react';

const CANISTERS = [
  {
    name: 'Frontend / Website',
    id: 'crjop-jyaaa-aaaah-atfaq-cai',
    function: 'Interface principal Quantumoney.app',
    color: 'text-yellow-400',
  },
  {
    name: 'Gold Paper & Docs',
    id: 'whu4t-kiaaa-aaaah-qsc5q-cai',
    function: 'Documentação e Gold Paper',
    color: 'text-amber-400',
  },
  {
    name: 'Logic / QMY',
    id: 'ckmsk-taaaa-aaaah-atfca-cai',
    function: 'Lógica QMY, XP, vesting, bónus',
    color: 'text-blue-400',
  },
  {
    name: 'Governance / Treasury',
    id: 'nemlr-6aaaa-aaaan-q32la-cai',
    function: 'Governança e tesouraria DAO',
    color: 'text-purple-400',
  },
  {
    name: 'Ledger Token Standard',
    id: '5o54h-giaaa-aaaad-aentq-cai',
    function: 'Ledger ICP / ICRC-1 standard',
    color: 'text-green-400',
  },
];

export default function CanisterArchitecturePanel() {
  return (
    <div className="border border-yellow-400/30 bg-black/20 backdrop-blur-sm rounded-sm p-4">
      <h3 className="text-yellow-400 font-cinzel font-bold text-sm mb-3 flex items-center gap-2">
        <Server className="w-4 h-4" /> Arquitetura Carteira A – Canisters
      </h3>
      <div className="space-y-2">
        {CANISTERS.map(c => (
          <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-yellow-400/10 last:border-0">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold ${c.color}`}>{c.name}</p>
              <p className="text-yellow-400/40 text-xs">{c.function}</p>
            </div>
            <code className="text-yellow-300/60 text-xs font-mono bg-black/30 px-2 py-0.5 rounded-sm shrink-0">
              {c.id}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
