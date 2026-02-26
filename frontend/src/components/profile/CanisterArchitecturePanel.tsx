import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, CheckCircle } from 'lucide-react';

const CARTEIRA_A_CANISTERS = [
  {
    id: 'crjop-jyaaa-aaaah-atfaq-cai',
    name: 'Frontend / Website',
    function: 'Interface principal do Quantumoney.app',
    status: 'active',
  },
  {
    id: 'whu4t-kiaaa-aaaah-qsc5q-cai',
    name: 'Gold Paper & Docs',
    function: 'Documentação e Gold Paper oficial',
    status: 'active',
  },
  {
    id: 'nemlr-6aaaa-aaaan-q32la-cai',
    name: 'Governance / Treasury',
    function: 'Governança DAO e Tesouraria',
    status: 'active',
  },
  {
    id: 'ckmsk-taaaa-aaaah-atfca-cai',
    name: 'Logic (Backend)',
    function: 'Lógica principal e perfis de jogadores',
    status: 'active',
  },
  {
    id: '5o54h-giaaa-aaaad-aentq-cai',
    name: 'QMY Ledger / Token Standard',
    function: 'Ledger ICRC-1 do token QMY',
    status: 'active',
  },
];

export default function CanisterArchitecturePanel() {
  return (
    <Card className="bg-transparent border border-primary/30 backdrop-blur-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary flex items-center gap-2 text-base">
          <Server size={16} className="text-primary" />
          Arquitetura de Canisters — Carteira A
        </CardTitle>
        <p className="text-primary/60 text-xs">
          Todos os dados são sincronizados via os canisters oficiais da Carteira A no Internet Computer.
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {CARTEIRA_A_CANISTERS.map((canister) => (
          <div
            key={canister.id}
            className="flex items-start gap-3 p-3 rounded-md border border-primary/20 bg-black/20"
          >
            <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-primary text-sm font-medium">{canister.name}</span>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary/70 px-1.5 py-0">
                  ativo
                </Badge>
              </div>
              <p className="text-primary/50 text-xs mt-0.5">{canister.function}</p>
              <code className="text-primary/40 text-xs font-mono break-all">{canister.id}</code>
            </div>
          </div>
        ))}
        <div className="mt-3 p-2 rounded border border-primary/10 bg-primary/5">
          <p className="text-primary/50 text-xs text-center">
            QuantumoneyAR.app sincroniza diretamente com estes canisters para perfil unificado.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
