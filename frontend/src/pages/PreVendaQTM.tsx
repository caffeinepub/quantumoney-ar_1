import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { AlertCircle } from 'lucide-react';

export default function PreVendaQTM() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-8">
          <div>
            <PageTitle>Pré-Venda QTM</PageTitle>
            <StatusBadge status="planned" className="mt-2" />
          </div>

          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded p-4">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm text-destructive">
              <p className="font-bold mb-1">Aviso / Warning</p>
              <p>Nenhuma venda real está ativa. Esta página é apenas informativa.</p>
              <p className="mt-1">No real sale is active. This page is informational only.</p>
            </div>
          </div>

          <div className="luxury-glass-card p-8 border border-primary/20">
            <BodyText>
              A pré-venda de tokens QTM está em fase de planeamento. Os detalhes serão anunciados
              após aprovação regulatória e implementação técnica completa.
            </BodyText>
            <BodyText className="mt-4">
              The QTM token pre-sale is in the planning phase. Details will be announced after
              regulatory approval and complete technical implementation.
            </BodyText>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
