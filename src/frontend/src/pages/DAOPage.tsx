import { Users, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DAOPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      disclaimer: {
        title: 'Aviso — Conteúdo Conceptual',
        text: 'Esta página apresenta um modelo conceptual de governança DAO. NÃO representa execução on-chain real, transações financeiras, operações de token, swaps, bridges, ou qualquer forma de execução de tesouraria. Todo o conteúdo é estritamente educativo e não se integra com funcionalidades de gameplay. Conformidade total com MiCA (UE) e GDPR (UE 2016/679).',
      },
      title: 'Governança DAO',
      subtitle: 'Democracia Descentralizada Conceptual',
      voting: 'Sistema de Votação',
      votingDesc: '1 QMY = 1 voto (conceptual). Holders podem criar propostas e votar em decisões do projeto (modelo teórico).',
      treasury: 'Tesouro DAO',
      treasuryDesc: '200 milhões de QMY gerenciados pela comunidade através de votação transparente (modelo conceptual).',
      proposals: 'Tipos de Propostas',
      proposalsDesc: 'Queima de tokens, alocação de recursos, parcerias, desenvolvimento de funcionalidades (conceptual).',
    },
    en: {
      disclaimer: {
        title: 'Notice — Conceptual Content',
        text: 'This page presents a conceptual DAO governance model. It does NOT represent real on-chain execution, financial transactions, token operations, swaps, bridges, or any form of treasury execution. All content is strictly educational and does not integrate with gameplay functionalities. Full compliance with MiCA (EU) and GDPR (EU 2016/679).',
      },
      title: 'DAO Governance',
      subtitle: 'Conceptual Decentralized Democracy',
      voting: 'Voting System',
      votingDesc: '1 QMY = 1 vote (conceptual). Holders can create proposals and vote on project decisions (theoretical model).',
      treasury: 'DAO Treasury',
      treasuryDesc: '200 million QMY managed by the community through transparent voting (conceptual model).',
      proposals: 'Proposal Types',
      proposalsDesc: 'Token burns, resource allocation, partnerships, feature development (conceptual).',
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Users className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Disclaimer Banner */}
        <Card className="mb-12 bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/50 glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <CardTitle className="text-2xl font-serif text-red-400">
                {t.disclaimer.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-300 leading-relaxed text-justify">
              {t.disclaimer.text}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.voting}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.votingDesc}
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <Lock className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.treasury}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.treasuryDesc}
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
              <FileText className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-500 mb-4 text-center">
              {t.proposals}
            </h3>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              {t.proposalsDesc}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <img
            src="/assets/generated/dao-voting-interface.dim_600x350.png"
            alt="DAO Voting"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
        </div>
      </div>
    </section>
  );
}
