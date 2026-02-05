import { Users, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InstitutionalExpansionSection from '@/components/InstitutionalExpansionSection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
      expansion: {
        title: 'Expansão Institucional / Apêndice Conceptual',
        governanceRoles: {
          title: 'Papéis de Governança Conceptuais',
          intro: 'Como diferentes papéis de governança poderiam ser interpretados em discussões de DAO sem implicar execução operacional:',
          roles: [
            {
              role: 'Proponente (conceptual)',
              description: 'Qualquer holder teórico de tokens que submete uma proposta formal para votação da comunidade.',
              permissions: 'Criar propostas, fornecer documentação de suporte',
            },
            {
              role: 'Votante (conceptual)',
              description: 'Holders teóricos de tokens que expressam aprovação ou rejeição de propostas.',
              permissions: 'Votar em propostas ativas, delegar poder de voto',
            },
            {
              role: 'Guardião (conceptual)',
              description: 'Papel teórico de supervisão que monitoriza conformidade e pode vetar propostas maliciosas.',
              permissions: 'Vetar propostas não conformes, propor alterações de governança',
            },
          ],
          note: 'Nenhum destes papéis é executado on-chain. Todos são descritivos apenas.',
        },
        proposalTypes: {
          title: 'Tipos de Propostas Conceptuais',
          intro: 'Categorias teóricas de propostas que poderiam ser discutidas num modelo de governança DAO:',
          types: [
            {
              type: 'Proposta de Tesouraria',
              description: 'Solicitações conceptuais de desembolso de fundos de tesouraria para desenvolvimento, marketing ou parcerias.',
              threshold: 'Quórum teórico: 10% de participação, 66% de aprovação',
            },
            {
              type: 'Proposta de Queima',
              description: 'Sugestões conceptuais para queimar tokens de tesouraria para reduzir fornecimento.',
              threshold: 'Quórum teórico: 15% de participação, 75% de aprovação',
            },
            {
              type: 'Proposta de Parâmetros',
              description: 'Ajustes teóricos a parâmetros de protocolo como taxas, limites ou cronogramas de vesting.',
              threshold: 'Quórum teórico: 20% de participação, 80% de aprovação',
            },
            {
              type: 'Proposta de Governança',
              description: 'Mudanças conceptuais às próprias regras de governança, incluindo quóruns e limiares.',
              threshold: 'Quórum teórico: 25% de participação, 90% de aprovação',
            },
          ],
          note: 'Todos os limiares são ilustrativos. Nenhuma votação on-chain ocorre através deste sistema.',
        },
      },
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
      expansion: {
        title: 'Institutional Expansion / Conceptual Appendix',
        governanceRoles: {
          title: 'Conceptual Governance Roles',
          intro: 'How different governance roles could be interpreted in DAO discussions without implying operational execution:',
          roles: [
            {
              role: 'Proposer (conceptual)',
              description: 'Any theoretical token holder who submits a formal proposal for community voting.',
              permissions: 'Create proposals, provide supporting documentation',
            },
            {
              role: 'Voter (conceptual)',
              description: 'Theoretical token holders who express approval or rejection of proposals.',
              permissions: 'Vote on active proposals, delegate voting power',
            },
            {
              role: 'Guardian (conceptual)',
              description: 'Theoretical oversight role that monitors compliance and can veto malicious proposals.',
              permissions: 'Veto non-compliant proposals, propose governance changes',
            },
          ],
          note: 'None of these roles are executed on-chain. All are descriptive only.',
        },
        proposalTypes: {
          title: 'Conceptual Proposal Types',
          intro: 'Theoretical categories of proposals that could be discussed in a DAO governance model:',
          types: [
            {
              type: 'Treasury Proposal',
              description: 'Conceptual requests for treasury fund disbursement for development, marketing, or partnerships.',
              threshold: 'Theoretical quorum: 10% participation, 66% approval',
            },
            {
              type: 'Burn Proposal',
              description: 'Conceptual suggestions to burn treasury tokens to reduce supply.',
              threshold: 'Theoretical quorum: 15% participation, 75% approval',
            },
            {
              type: 'Parameter Proposal',
              description: 'Theoretical adjustments to protocol parameters such as fees, limits, or vesting schedules.',
              threshold: 'Theoretical quorum: 20% participation, 80% approval',
            },
            {
              type: 'Governance Proposal',
              description: 'Conceptual changes to governance rules themselves, including quorums and thresholds.',
              threshold: 'Theoretical quorum: 25% participation, 90% approval',
            },
          ],
          note: 'All thresholds are illustrative. No on-chain voting occurs through this system.',
        },
      },
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

        <div className="mt-16 mb-16">
          <img
            src="/assets/generated/dao-voting-interface.dim_600x350.png"
            alt="DAO Voting"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
        </div>

        {/* Institutional Expansion Section */}
        <InstitutionalExpansionSection title={t.expansion.title}>
          {/* Governance Roles */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.governanceRoles.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.governanceRoles.intro}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Papel' : 'Role'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Descrição' : 'Description'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Permissões Teóricas' : 'Theoretical Permissions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.governanceRoles.roles.map((role, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{role.role}</TableCell>
                      <TableCell className="text-gray-300">{role.description}</TableCell>
                      <TableCell className="text-gray-300">{role.permissions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.governanceRoles.note}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Proposal Types */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.proposalTypes.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.proposalTypes.intro}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Tipo' : 'Type'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Descrição' : 'Description'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Limiar Teórico' : 'Theoretical Threshold'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.proposalTypes.types.map((type, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{type.type}</TableCell>
                      <TableCell className="text-gray-300">{type.description}</TableCell>
                      <TableCell className="text-gray-300">{type.threshold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.proposalTypes.note}
                </p>
              </div>
            </CardContent>
          </Card>
        </InstitutionalExpansionSection>
      </div>
    </section>
  );
}
