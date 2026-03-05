import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';

const CANISTER_IDS = {
  frontend: 'crjop-jyaaa-aaaah-atfaq-cai',
  goldPaper: 'whu4t-kiaaa-aaaah-qsc5q-cai',
  governance: 'nemlr-6aaaa-aaaan-q32la-cai',
  logic: 'ckmsk-taaaa-aaaah-atfca-cai',
  ledgerQMY: '5o54h-giaaa-aaaad-aentq-cai',
};

const canisters = [
  {
    name: 'Frontend / Website',
    id: CANISTER_IDS.frontend,
    desc: 'Interface principal do Quantumoney.app. Serve o frontend React e gere perfis de jogadores.',
    icon: '🌐',
    status: 'active',
  },
  {
    name: 'Gold Paper & Docs',
    id: CANISTER_IDS.goldPaper,
    desc: 'Armazena o Gold Paper e documentação técnica do ecossistema QMY.',
    icon: '📜',
    status: 'active',
  },
  {
    name: 'Governance / Treasury',
    id: CANISTER_IDS.governance,
    desc: 'Governança DAO e gestão da tesouraria do ecossistema Quantumoney.',
    icon: '🏛️',
    status: 'planned',
  },
  {
    name: 'Logic (futuro)',
    id: CANISTER_IDS.logic,
    desc: 'Lógica de jogo avançada e regras do ecossistema (conceptual/futuro).',
    icon: '⚙️',
    status: 'planned',
  },
  {
    name: 'Ledger QMY',
    id: CANISTER_IDS.ledgerQMY,
    desc: 'Token QMY standard ICRC-1. Gere saldos, transferências e histórico de transações.',
    icon: '💰',
    status: 'active',
  },
];

const architecture = [
  {
    title: 'Internet Computer Protocol',
    desc: 'Toda a infraestrutura Quantumoney corre no ICP — blockchain de alta performance com finalidade em segundos.',
    icon: '🔗',
  },
  {
    title: 'Motoko Backend',
    desc: 'Lógica de negócio implementada em Motoko, a linguagem nativa do ICP, com segurança de tipos e upgrades seguros.',
    icon: '🦋',
  },
  {
    title: 'React Frontend',
    desc: 'Interface construída em React + TypeScript com Tailwind CSS, servida diretamente do canister ICP.',
    icon: '⚛️',
  },
  {
    title: 'Internet Identity',
    desc: 'Autenticação descentralizada sem passwords. O teu Principal ID é a tua identidade única no ecossistema.',
    icon: '🔐',
  },
  {
    title: 'ICRC-1 Token Standard',
    desc: 'O token QMY segue o standard ICRC-1 do ICP, garantindo interoperabilidade com DEXs e carteiras.',
    icon: '🪙',
  },
  {
    title: 'PWA & AR',
    desc: 'QuantumoneyAR.app é uma Progressive Web App com acesso nativo à câmara e GPS para experiências AR.',
    icon: '📱',
  },
];

export default function TechnicalPage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-8">
          <div className="flex items-center gap-3 mb-2">
            <PageTitle>Arquitetura Técnica</PageTitle>
            <StatusBadge status="draft" />
          </div>
          <BodyText className="text-qmy-gold/60 mb-8">
            Visão geral da infraestrutura técnica do ecossistema Quantumoney no Internet Computer Protocol.
          </BodyText>

          {/* Disclaimer */}
          <div className="luxury-glass-card p-4 border-yellow-500/40 mb-8">
            <p className="text-yellow-400/80 text-xs font-rajdhani">
              ⚠️ Conteúdo conceptual. Alguns canisters estão em fase de planeamento. Não constitui oferta de tokens ou serviços financeiros.
            </p>
          </div>

          {/* Canister IDs */}
          <SectionTitle className="mb-4">Canisters Carteira A</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {canisters.map(c => (
              <div key={c.id} className="luxury-glass-card p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-cinzel text-qmy-gold font-bold text-sm">{c.name}</span>
                      <span className={`text-xs px-2 py-0.5 border font-rajdhani ${
                        c.status === 'active'
                          ? 'border-green-500/50 text-green-400'
                          : 'border-yellow-500/50 text-yellow-400'
                      }`}>
                        {c.status === 'active' ? 'Ativo' : 'Planeado'}
                      </span>
                    </div>
                    <p className="text-qmy-gold/60 text-xs font-rajdhani mb-2">{c.desc}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-qmy-gold/70 font-mono text-xs break-all">{c.id}</code>
                      <a
                        href={`https://${c.id}.icp0.io`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-qmy-gold/40 hover:text-qmy-gold text-xs flex-shrink-0"
                      >
                        🔗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture overview */}
          <SectionTitle className="mb-4">Stack Tecnológico</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {architecture.map(item => (
              <div key={item.title} className="luxury-glass-card p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-cinzel text-qmy-gold font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-qmy-gold/60 text-xs font-rajdhani">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Sync note */}
          <div className="luxury-glass-card p-6">
            <h3 className="font-cinzel text-qmy-gold font-bold text-lg mb-3">🔄 Sincronização Quantumoney ↔ QuantumoneyAR</h3>
            <p className="text-qmy-gold/70 font-rajdhani text-sm mb-3">
              O Quantumoney.app e o QuantumoneyAR.app partilham os mesmos canisters da Carteira A.
              O teu Principal ID é o identificador único que garante sincronização real entre as duas plataformas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-qmy-gold/20 p-4">
                <div className="text-qmy-gold font-cinzel font-bold text-sm mb-2">Quantumoney.app</div>
                <ul className="text-qmy-gold/60 text-xs font-rajdhani space-y-1">
                  <li>• Perfil e carteira</li>
                  <li>• Banco Central QMY</li>
                  <li>• Governança DAO</li>
                  <li>• Documentação</li>
                </ul>
              </div>
              <div className="border border-purple-500/30 p-4">
                <div className="text-purple-400 font-cinzel font-bold text-sm mb-2">QuantumoneyAR.app</div>
                <ul className="text-qmy-gold/60 text-xs font-rajdhani space-y-1">
                  <li>• Câmara AR</li>
                  <li>• Captura de moedas</li>
                  <li>• Captura de monstros</li>
                  <li>• Mapa GPS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
