import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Coins, Clock, Shield, AlertCircle } from 'lucide-react';

const PHASES = [
  { name: 'Seed', price: '0.00005 ICP', supply: '50,000,000 QMY', bonus: '+50%', status: 'Planeado' },
  { name: 'Privado', price: '0.00008 ICP', supply: '100,000,000 QMY', bonus: '+25%', status: 'Planeado' },
  { name: 'Público', price: '0.0001 ICP', supply: '150,000,000 QMY', bonus: '+10%', status: 'Planeado' },
];

export default function Presale() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-10">
          <div>
            <PageTitle>Pré-Venda QMY</PageTitle>
            <StatusBadge status="planned" className="mt-2" />
            <BodyText className="mt-4 text-muted-foreground">
              Estrutura conceptual da pré-venda de tokens QMY. Nenhuma venda real está ativa.
            </BodyText>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded p-4">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm text-destructive">
              <p className="font-bold mb-1">Aviso Importante</p>
              <p>Esta página é informativa. Não existe venda real de tokens. Não envie fundos.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Coins className="w-8 h-8 text-primary" />, label: 'Supply Pré-Venda', value: '300M QMY' },
              { icon: <Clock className="w-8 h-8 text-primary" />, label: 'Duração', value: '60 dias' },
              { icon: <Shield className="w-8 h-8 text-primary" />, label: 'Padrão', value: 'ICRC-1' },
            ].map(item => (
              <div key={item.label} className="luxury-glass-card p-6 border border-primary/20 text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="font-cinzel text-primary font-bold text-2xl">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Phases */}
          <div className="luxury-glass-card border border-primary/20 overflow-hidden">
            <div className="p-4 border-b border-primary/20">
              <SectionTitle>Fases da Pré-Venda</SectionTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/5">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Fase</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Preço</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Supply</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Bónus</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {PHASES.map((phase, idx) => (
                    <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{phase.name}</td>
                      <td className="px-4 py-3 text-right text-primary font-bold">{phase.price}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{phase.supply}</td>
                      <td className="px-4 py-3 text-right text-green-400 font-medium">{phase.bonus}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{phase.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <p className="text-sm text-muted-foreground">
              ⚠️ Estrutura conceptual sujeita a alteração. Conformidade MiCA em desenvolvimento.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
