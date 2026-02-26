import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Shield, Layers, AlertTriangle } from 'lucide-react';

// Carteira A — Official Quantumoney Canister IDs
const CARTEIRA_A_CANISTERS = [
  {
    id: 'crjop-jyaaa-aaaah-atfaq-cai',
    name: 'Frontend / Website',
    description: 'Interface principal do Quantumoney.app — canister de frontend',
    type: 'Frontend',
  },
  {
    id: 'whu4t-kiaaa-aaaah-qsc5q-cai',
    name: 'Gold Paper & Docs',
    description: 'Documentação oficial e Gold Paper do projeto QMY',
    type: 'Docs',
  },
  {
    id: 'nemlr-6aaaa-aaaan-q32la-cai',
    name: 'Governance / Treasury',
    description: 'Governança DAO e gestão da tesouraria (conceptual)',
    type: 'Governance',
  },
  {
    id: 'ckmsk-taaaa-aaaah-atfca-cai',
    name: 'Logic (Backend)',
    description: 'Lógica principal do jogo AR, perfis de jogadores e distribuição de moedas',
    type: 'Logic',
  },
  {
    id: '5o54h-giaaa-aaaad-aentq-cai',
    name: 'QMY Ledger / Token Standard',
    description: 'Ledger ICRC-1 do token QMY — standard de token no Internet Computer',
    type: 'Ledger',
  },
];

export default function TechnicalPage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="border-yellow-500/40 text-yellow-400/70 text-xs">
              Arquitetura Técnica
            </Badge>
            <PageTitle>Infraestrutura Técnica</PageTitle>
            <BodyText className="text-primary/60 max-w-2xl mx-auto">
              O Quantumoney opera exclusivamente no Internet Computer Protocol (ICP),
              utilizando os canisters oficiais da Carteira A.
            </BodyText>
          </div>

          {/* Disclaimer */}
          <Card className="bg-transparent border border-yellow-500/30 backdrop-blur-md">
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary/80 text-sm font-medium mb-1">Aviso Importante</p>
                  <p className="text-primary/60 text-xs">
                    Esta página descreve a arquitetura técnica conceptual do projeto.
                    Os canisters de Governance/Treasury são conceptuais e completamente separados
                    da lógica do jogo AR. Nenhum token real foi emitido.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carteira A Canisters */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-primary" />
              <SectionTitle>Canisters da Carteira A</SectionTitle>
            </div>
            <BodyText className="text-primary/60 text-sm">
              Todos os cinco canisters abaixo pertencem à Carteira A oficial do Quantumoney.
              O site Quantumoney.app e a aplicação QuantumoneyAR.app sincronizam diretamente com estes canisters.
            </BodyText>
            <div className="grid gap-3">
              {CARTEIRA_A_CANISTERS.map((canister) => (
                <Card key={canister.id} className="bg-transparent border border-primary/20 backdrop-blur-md">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-primary font-semibold text-sm">{canister.name}</span>
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary/60 px-1.5 py-0">
                            {canister.type}
                          </Badge>
                        </div>
                        <p className="text-primary/60 text-xs mb-2">{canister.description}</p>
                        <code className="text-primary/50 text-xs font-mono bg-black/20 px-2 py-1 rounded border border-primary/10 break-all">
                          {canister.id}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Architecture Overview */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-primary" />
              <SectionTitle>Visão Geral da Arquitetura</SectionTitle>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-transparent border border-primary/20 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-sm flex items-center gap-2">
                    <Shield size={14} />
                    Internet Computer Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-primary/60 text-xs">
                    <li>• Blockchain descentralizado de alta performance</li>
                    <li>• Smart contracts em Motoko (canisters)</li>
                    <li>• Autenticação via Internet Identity</li>
                    <li>• Dados on-chain permanentes e imutáveis</li>
                    <li>• Sem taxas de gas para utilizadores</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-transparent border border-primary/20 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-sm flex items-center gap-2">
                    <Server size={14} />
                    Sincronização Unificada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-primary/60 text-xs">
                    <li>• Quantumoney.app — site institucional</li>
                    <li>• QuantumoneyAR.app — aplicação de jogo AR</li>
                    <li>• Perfil único via Internet Identity</li>
                    <li>• Dados partilhados via Carteira A</li>
                    <li>• Sincronização automática em tempo real</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Institutional Expansion Note */}
          <Card className="bg-transparent border border-primary/10 backdrop-blur-md">
            <CardContent className="pt-4">
              <p className="text-primary/40 text-xs text-center">
                Os canisters de Governance e Treasury são conceptuais nesta fase.
                A lógica operacional do jogo AR é gerida pelo canister Logic (ckmsk-taaaa-aaaah-atfca-cai).
                Nenhuma funcionalidade de governança está ativa no momento.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
