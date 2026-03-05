import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle } from '../components/Typography';
import { Vote } from 'lucide-react';

export default function DAOProposalDetailPage() {
  return (
    <PageShell>
      <Container size="md">
        <div className="py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Vote className="w-10 h-10 text-primary" />
            <PageTitle>Detalhe da Proposta</PageTitle>
          </div>
          <div className="luxury-glass-card p-12 border border-primary/20 text-center">
            <div className="text-6xl mb-6">🏛️</div>
            <h2 className="font-cinzel text-primary font-bold text-2xl mb-4">Em Breve</h2>
            <p className="text-muted-foreground font-rajdhani max-w-md mx-auto">
              Os detalhes de propostas DAO estarão disponíveis numa próxima versão.
            </p>
            <a
              href="/map"
              className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground font-rajdhani font-bold hover:bg-primary/90 transition-colors"
            >
              Ir para o Mapa
            </a>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
