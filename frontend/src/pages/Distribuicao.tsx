import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Globe, Users, Map } from 'lucide-react';

const REGIONAL_ALLOCATIONS = [
  { region: 'Ásia', pct: 40, color: 'bg-yellow-400' },
  { region: 'América do Norte', pct: 20, color: 'bg-blue-400' },
  { region: 'Europa', pct: 15, color: 'bg-green-400' },
  { region: 'América Latina', pct: 10, color: 'bg-orange-400' },
  { region: 'África', pct: 10, color: 'bg-red-400' },
  { region: 'Outros', pct: 5, color: 'bg-purple-400' },
];

export default function Distribuicao() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-10">
          <div>
            <PageTitle>Distribuição Global</PageTitle>
            <StatusBadge status="draft" className="mt-2" />
            <BodyText className="mt-4 text-muted-foreground">
              Modelo de distribuição global de tokens QMY através do jogo AR.
            </BodyText>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Globe className="w-8 h-8 text-primary" />, label: 'Regiões', value: '6' },
              { icon: <Map className="w-8 h-8 text-primary" />, label: 'Locais AR', value: 'Global' },
              { icon: <Users className="w-8 h-8 text-primary" />, label: 'Modelo', value: 'GPS-Based' },
            ].map(item => (
              <div key={item.label} className="luxury-glass-card p-6 border border-primary/20 text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="font-cinzel text-primary font-bold text-2xl">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Regional Allocations */}
          <div className="luxury-glass-card border border-primary/20">
            <div className="p-4 border-b border-primary/20">
              <SectionTitle>Alocação Regional</SectionTitle>
            </div>
            <div className="p-4 space-y-4">
              {REGIONAL_ALLOCATIONS.map(item => (
                <div key={item.region}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.region}</span>
                    <span className="text-primary font-bold">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <p className="text-sm text-muted-foreground">
              ⚠️ Modelo conceptual. A distribuição real depende de aprovação regulatória e implementação técnica.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
