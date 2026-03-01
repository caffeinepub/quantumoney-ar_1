import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Flame, TrendingDown, BarChart2 } from 'lucide-react';

export default function QueimaDeflacao() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-10">
          <div>
            <PageTitle>Queima & Deflação</PageTitle>
            <StatusBadge status="draft" className="mt-2" />
            <BodyText className="mt-4 text-muted-foreground">
              Mecanismos de queima de tokens QMY para deflação controlada do supply.
            </BodyText>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Flame className="w-8 h-8 text-orange-400" />,
                title: 'Objetivo de Queima',
                value: '50%',
                desc: 'do supply total ao longo de 10 anos',
              },
              {
                icon: <TrendingDown className="w-8 h-8 text-red-400" />,
                title: 'Fontes de Queima',
                value: '4',
                desc: 'mecanismos automáticos de deflação',
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-primary" />,
                title: 'Queimado até hoje',
                value: '0 QMY',
                desc: 'fase conceptual — sem queima real',
              },
            ].map(item => (
              <div key={item.title} className="luxury-glass-card p-6 border border-primary/20 text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="font-cinzel text-primary font-bold text-2xl">{item.value}</p>
                <p className="font-medium text-foreground mt-1">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Burn Sources */}
          <div className="luxury-glass-card border border-primary/20">
            <div className="p-4 border-b border-primary/20">
              <SectionTitle>Fontes de Queima</SectionTitle>
            </div>
            <div className="divide-y divide-primary/10">
              {[
                { name: 'Taxas de Transação', pct: '0.1%', desc: 'De cada transferência QMY' },
                { name: 'Penalizações de Jogo', pct: 'Variável', desc: 'Ações inválidas no jogo AR' },
                { name: 'Propostas DAO Rejeitadas', pct: 'Fixo', desc: 'Taxa de submissão de proposta' },
                { name: 'Queima Manual DAO', pct: 'Votação', desc: 'Aprovada por governança' },
              ].map((src, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">{src.name}</p>
                    <p className="text-xs text-muted-foreground">{src.desc}</p>
                  </div>
                  <span className="text-primary font-bold text-sm">{src.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <p className="text-sm text-muted-foreground">
              ⚠️ Mecanismos conceptuais em desenvolvimento. Nenhuma queima real ocorreu.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
