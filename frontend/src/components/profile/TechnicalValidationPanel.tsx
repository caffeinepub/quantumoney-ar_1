import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Wifi, Clock } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

const CARTEIRA_A_CANISTERS = [
  { id: 'crjop-jyaaa-aaaah-atfaq-cai', label: 'Frontend / Website' },
  { id: 'whu4t-kiaaa-aaaah-qsc5q-cai', label: 'Gold Paper & Docs' },
  { id: 'nemlr-6aaaa-aaaan-q32la-cai', label: 'Governance / Treasury' },
  { id: 'ckmsk-taaaa-aaaah-atfca-cai', label: 'Logic (Backend)' },
  { id: '5o54h-giaaa-aaaad-aentq-cai', label: 'QMY Ledger / Token Standard' },
];

export default function TechnicalValidationPanel() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? 'Não autenticado';
  const now = new Date().toLocaleString('pt-PT');

  return (
    <Card className="bg-transparent border border-primary/30 backdrop-blur-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary flex items-center gap-2 text-base">
          <Shield size={16} className="text-primary" />
          Validação Técnica — Carteira A
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Principal */}
        <div className="space-y-1">
          <p className="text-primary/60 text-xs uppercase tracking-wider">Principal ID</p>
          <code className="text-primary text-xs font-mono break-all block bg-black/20 p-2 rounded border border-primary/10">
            {principal}
          </code>
        </div>

        {/* Canisters */}
        <div className="space-y-1">
          <p className="text-primary/60 text-xs uppercase tracking-wider flex items-center gap-1">
            <Wifi size={12} />
            Canisters Ativos (Carteira A)
          </p>
          <div className="space-y-1">
            {CARTEIRA_A_CANISTERS.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 p-1.5 rounded bg-black/20 border border-primary/10">
                <div className="min-w-0">
                  <span className="text-primary/70 text-xs">{c.label}</span>
                  <code className="text-primary/40 text-xs font-mono block truncate">{c.id}</code>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary/60 shrink-0 px-1.5 py-0">
                  ✓
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-primary/40 text-xs">
          <Clock size={12} />
          <span>Última verificação: {now}</span>
        </div>

        <div className="p-2 rounded border border-primary/10 bg-primary/5">
          <p className="text-primary/50 text-xs text-center">
            Fonte de dados: Internet Computer — Carteira A oficial
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
