import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { ArrowLeftRight, ExternalLink } from 'lucide-react';

export default function SwapQTMICP() {
  return (
    <PageShell>
      <Container size="md">
        <div className="py-12 space-y-8">
          <div className="flex items-center gap-4">
            <ArrowLeftRight className="w-10 h-10 text-primary" />
            <div>
              <PageTitle>Swap QTM / ICP</PageTitle>
              <StatusBadge status="coming-soon" className="mt-2" />
            </div>
          </div>

          <div className="luxury-glass-card p-8 border border-primary/20 space-y-4">
            <BodyText>
              O swap direto entre QTM e ICP estará disponível em breve através de DEX compatíveis
              com o Internet Computer Protocol.
            </BodyText>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 border border-primary/20 rounded text-center">
                <p className="font-cinzel text-primary font-bold text-lg">QTM</p>
                <p className="text-xs text-muted-foreground mt-1">Quantumoney Token</p>
              </div>
              <div className="p-4 border border-primary/20 rounded text-center">
                <p className="font-cinzel text-primary font-bold text-lg">ICP</p>
                <p className="text-xs text-muted-foreground mt-1">Internet Computer</p>
              </div>
            </div>

            <a
              href="https://icpswap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary font-cinzel font-bold hover:bg-primary/10 transition-colors mt-4"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir ICPSwap
            </a>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
