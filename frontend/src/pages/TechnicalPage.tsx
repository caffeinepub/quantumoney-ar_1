import { Code, Server, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InstitutionalExpansionSection from '@/components/InstitutionalExpansionSection';

// Canister configuration
const CANISTER_IDS = {
  frontend: 'crjop-jyaaa-aaaah-atfaq-cai',
  docs: 'whu4t-kiaaa-aaaah-qsc5q-cai',
  qmyLogic: 'ckmsk-taaaa-aaaah-atfca-cai',
  governance: 'nemlr-6aaaa-aaaan-q32la-cai',
} as const;

const DOCS_BASE_URL = `https://${CANISTER_IDS.docs}.icp0.io`;

export default function TechnicalPage() {
  const { language } = useLanguage();

  const title = language === 'pt' ? 'Arquitetura Técnica' : 'Technical Architecture';
  const subtitle = language === 'pt' 
    ? 'Construído na Internet Computer com Motoko' 
    : 'Built on Internet Computer with Motoko';

  const wiringTitle = language === 'pt' ? 'Arquitetura de Canisters' : 'Canister Architecture';
  const wiringSubtitle = language === 'pt' 
    ? 'Verificação da estrutura de deployment' 
    : 'Deployment structure verification';

  const canisters = [
    {
      id: CANISTER_IDS.frontend,
      name: language === 'pt' ? 'Frontend / Website' : 'Frontend / Website',
      description: language === 'pt' 
        ? 'Hospeda o website institucional, UI, navegação e páginas públicas'
        : 'Hosts the institutional website, UI, navigation, and public pages',
      type: 'primary',
    },
    {
      id: CANISTER_IDS.docs,
      name: language === 'pt' ? 'Gold Paper & Documentação' : 'Gold Paper & Documentation',
      description: language === 'pt'
        ? 'Hospeda Gold Paper v1.0 e documentos técnicos/legais (read-only)'
        : 'Hosts Gold Paper v1.0 and technical/legal documents (read-only)',
      type: 'docs',
      url: DOCS_BASE_URL,
    },
    {
      id: CANISTER_IDS.qmyLogic,
      name: language === 'pt' ? 'QMY Logic (Conceptual)' : 'QMY Logic (Conceptual)',
      description: language === 'pt'
        ? 'Placeholders lógicos conceptuais e não-operacionais. Sem execução de tokens, swap ou wallets'
        : 'Conceptual, non-operational logic placeholders. No token execution, swap, or wallets',
      type: 'conceptual',
    },
    {
      id: CANISTER_IDS.governance,
      name: language === 'pt' ? 'Governance / Treasury (Theoretical)' : 'Governance / Treasury (Theoretical)',
      description: language === 'pt'
        ? 'Modelos visuais e descritivos de governança e tesouraria apenas. Sem execução DAO, votação ou lógica financeira'
        : 'Visual and descriptive governance & treasury models only. No DAO execution, voting, or financial logic',
      type: 'theoretical',
    },
  ];

  const complianceNote = language === 'pt'
    ? 'Todos os componentes são visuais/institucionais apenas. Sem execução cripto, wallets, swap ou bridge. Conforme MiCA (UE) & GDPR.'
    : 'All components are visual/institutional only. No crypto execution, wallets, swap, or bridge. MiCA (EU) & GDPR compliant.';

  const expansionContent = {
    pt: {
      title: 'Expansão Institucional / Apêndice Conceptual',
      clarification: {
        title: 'Clarificação de Mecânicas Conceptuais',
        intro: 'As mecânicas de governança, tesouraria e token descritas neste contexto institucional são conceptuais apenas:',
        points: [
          'Os canisters de governança e tesouraria listados acima não executam operações financeiras reais, votação on-chain, ou lógica de desembolso.',
          'Todas as descrições de vesting, desbloqueio e fluxos de tesouraria são modelos teóricos apresentados para fins educativos.',
          'Nenhuma integração de wallet, swap, bridge ou operação de token ocorre através destes canisters institucionais.',
          'O canister de documentação (Gold Paper) hospeda conteúdo estático apenas e não executa qualquer lógica de protocolo.',
        ],
        separation: 'Separação do Jogo AR',
        separationText: 'Os canisters institucionais descritos acima são completamente separados das mecânicas de gameplay do jogo AR. O jogo AR opera através de lógica de backend separada que gere recompensas de jogo, captura de monstros e operações de moeda plantada sem qualquer conexão com os modelos conceptuais de tokenomics ou governança.',
      },
    },
    en: {
      title: 'Institutional Expansion / Conceptual Appendix',
      clarification: {
        title: 'Clarification of Conceptual Mechanics',
        intro: 'The governance, treasury, and token mechanics described in this institutional context are conceptual only:',
        points: [
          'The governance and treasury canisters listed above do not execute real financial operations, on-chain voting, or disbursement logic.',
          'All descriptions of vesting, unlocking, and treasury flows are theoretical models presented for educational purposes.',
          'No wallet integration, swap, bridge, or token operations occur through these institutional canisters.',
          'The documentation canister (Gold Paper) hosts static content only and does not execute any protocol logic.',
        ],
        separation: 'Separation from AR Game',
        separationText: 'The institutional canisters described above are completely separate from the AR game gameplay mechanics. The AR game operates through separate backend logic that manages game rewards, monster captures, and planted coin operations without any connection to the conceptual tokenomics or governance models.',
      },
    },
  };

  const t = expansionContent[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Code className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 mb-12">
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {language === 'pt' 
                ? 'Sistema construído na Internet Computer Protocol (ICP) com canisters Motoko. Backend com autenticação Internet Identity, gestão de estado, integração GPS para AR Spots, e sistema de votação DAO on-chain. Frontend em React + TypeScript com React Query, Leaflet para mapas, e integração de câmera AR.'
                : 'System built on Internet Computer Protocol (ICP) with Motoko canisters. Backend with Internet Identity authentication, state management, GPS integration for AR Spots, and on-chain DAO voting system. Frontend in React + TypeScript with React Query, Leaflet for maps, and AR camera integration.'}
            </p>
          </div>
        </div>

        {/* Canister Architecture Wiring Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-gold-600/20 border-2 border-gold-600 mb-4">
              <Server className="w-12 h-12 text-gold-500" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-gold-500 mb-4">
              {wiringTitle}
            </h3>
            <p className="text-xl text-gray-300">
              {wiringSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {canisters.map((canister) => (
              <Card 
                key={canister.id}
                className={`glass-card border ${
                  canister.type === 'primary' 
                    ? 'border-gold-500/50 bg-gold-900/10' 
                    : canister.type === 'docs'
                    ? 'border-blue-500/50 bg-blue-900/10'
                    : canister.type === 'conceptual'
                    ? 'border-purple-500/50 bg-purple-900/10'
                    : 'border-gray-500/50 bg-gray-900/10'
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-gold-400 flex items-center justify-between">
                    {canister.name}
                    {canister.url && (
                      <a 
                        href={canister.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {canister.description}
                  </p>
                  <div className="pt-4 border-t border-gold-500/20">
                    <p className="text-xs text-gray-400 font-mono break-all">
                      {canister.id}
                    </p>
                    {canister.url && (
                      <a 
                        href={canister.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 font-mono break-all block mt-2"
                      >
                        {canister.url}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-gold-900/20 via-gold-800/30 to-gold-900/20 rounded-lg border border-gold-500/30">
            <p className="text-sm text-gold-300 text-center italic">
              {complianceNote}
            </p>
          </div>
        </div>

        {/* Institutional Expansion Section */}
        <InstitutionalExpansionSection title={t.title}>
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.clarification.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.clarification.intro}
              </p>

              <ul className="space-y-3">
                {t.clarification.points.map((point, idx) => (
                  <li key={idx} className="flex items-start p-4 bg-black/30 rounded-lg border border-amber-500/20">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-amber-500/30">
                <h3 className="text-2xl font-semibold text-amber-400 mb-4">
                  {t.clarification.separation}
                </h3>
                <p className="text-amber-300 leading-relaxed text-justify">
                  {t.clarification.separationText}
                </p>
              </div>
            </CardContent>
          </Card>
        </InstitutionalExpansionSection>
      </div>
    </section>
  );
}
