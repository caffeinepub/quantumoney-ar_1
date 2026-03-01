import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Lock, Unlock, Clock, TrendingUp } from 'lucide-react';

const VESTING_CATEGORIES = [
  { name: 'Equipa', allocation: '15%', tokens: '150,000,000', cliff: '12 meses', vesting: '36 meses' },
  { name: 'Investidores Seed', allocation: '10%', tokens: '100,000,000', cliff: '6 meses', vesting: '24 meses' },
  { name: 'Investidores Privados', allocation: '10%', tokens: '100,000,000', cliff: '3 meses', vesting: '18 meses' },
  { name: 'Ecossistema & Jogo AR', allocation: '30%', tokens: '300,000,000', cliff: '0 meses', vesting: '60 meses' },
  { name: 'Reserva DAO', allocation: '20%', tokens: '200,000,000', cliff: '0 meses', vesting: '48 meses' },
  { name: 'Venda Pública', allocation: '15%', tokens: '150,000,000', cliff: '0 meses', vesting: '12 meses' },
];

export default function VestingQTM() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-10">
          <div>
            <PageTitle>Vesting QMY</PageTitle>
            <StatusBadge status="draft" className="mt-2" />
            <BodyText className="mt-4 text-muted-foreground">
              Calendário de desbloqueio de tokens QMY ao longo do tempo. Todos os dados são conceptuais.
            </BodyText>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Supply Total', value: '1,000,000,000 QMY' },
              { icon: <Unlock className="w-5 h-5" />, label: 'Circulação Inicial', value: '~5%' },
              { icon: <Lock className="w-5 h-5" />, label: 'Em Vesting', value: '~95%' },
              { icon: <Clock className="w-5 h-5" />, label: 'Duração Máxima', value: '60 meses' },
            ].map(item => (
              <div key={item.label} className="luxury-glass-card p-4 border border-primary/20 text-center">
                <div className="text-primary mx-auto mb-2 flex justify-center">{item.icon}</div>
                <p className="font-bold text-primary text-sm">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="luxury-glass-card border border-primary/20 overflow-hidden">
            <div className="p-4 border-b border-primary/20">
              <SectionTitle>Categorias de Vesting</SectionTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/5">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Categoria</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Alocação</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Tokens</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Cliff</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Vesting</th>
                  </tr>
                </thead>
                <tbody>
                  {VESTING_CATEGORIES.map((cat, idx) => (
                    <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{cat.name}</td>
                      <td className="px-4 py-3 text-right text-primary font-bold">{cat.allocation}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{cat.tokens}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{cat.cliff}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{cat.vesting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <p className="text-sm text-muted-foreground">
              ⚠️ Estes dados são conceptuais e estão sujeitos a alteração. Não constituem oferta de valores mobiliários.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
