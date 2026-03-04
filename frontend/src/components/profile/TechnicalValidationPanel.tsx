import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { ShieldCheck } from 'lucide-react';

const CANISTERS = [
  { label: 'Frontend', id: 'crjop-jyaaa-aaaah-atfaq-cai' },
  { label: 'Gold Paper', id: 'whu4t-kiaaa-aaaah-qsc5q-cai' },
  { label: 'Logic QMY', id: 'ckmsk-taaaa-aaaah-atfca-cai' },
  { label: 'Governance', id: 'nemlr-6aaaa-aaaan-q32la-cai' },
  { label: 'ICP Ledger', id: '5o54h-giaaa-aaaad-aentq-cai' },
];

export default function TechnicalValidationPanel() {
  const { identity } = useInternetIdentity();
  const principalId = identity?.getPrincipal().toString() ?? 'Não autenticado';
  const now = new Date().toLocaleString('pt-PT');

  return (
    <div className="border border-yellow-400/20 bg-black/20 backdrop-blur-sm rounded-sm p-4">
      <h3 className="text-yellow-400/70 font-cinzel font-bold text-xs mb-3 flex items-center gap-2">
        <ShieldCheck className="w-3 h-3" /> Validação Técnica
      </h3>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between gap-2">
          <span className="text-yellow-400/50">Principal ID:</span>
          <span className="text-yellow-300/60 font-mono text-right break-all max-w-[60%]">{principalId}</span>
        </div>
        {CANISTERS.map(c => (
          <div key={c.id} className="flex justify-between gap-2">
            <span className="text-yellow-400/50">{c.label}:</span>
            <code className="text-yellow-300/50 font-mono text-right">{c.id}</code>
          </div>
        ))}
        <div className="flex justify-between gap-2 pt-1 border-t border-yellow-400/10">
          <span className="text-yellow-400/50">Última verificação:</span>
          <span className="text-yellow-300/50">{now}</span>
        </div>
      </div>
    </div>
  );
}
