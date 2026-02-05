import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Lock, TrendingDown, Calendar } from 'lucide-react';
import InstitutionalExpansionSection from '@/components/InstitutionalExpansionSection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const content = {
  pt: {
    title: 'Tesouraria & Política Monetária',
    subtitle: 'Modelo Conceptual de Gestão Financeira',
    disclaimer: {
      title: 'Aviso Importante — Conteúdo Conceptual',
      text: 'Esta página apresenta um modelo conceptual e educativo de tesouraria e política monetária. NÃO representa execução financeira real, transações on-chain, emissão de tokens, operações de swap, bridges, ou qualquer forma de execução de pagamentos. Todo o conteúdo é estritamente informativo e não se integra com funcionalidades de gameplay. Conformidade total com MiCA (UE) e GDPR (UE 2016/679).',
    },
    treasury: {
      title: 'Tesouraria DAO',
      subtitle: 'Gestão Conceptual de Recursos',
      allocation: 'Alocação Conceptual',
      allocationValue: '200.000.000 QMY (20% do fornecimento total)',
      purpose: 'Finalidade Teórica',
      purposeText: 'Reserva conceptual para desenvolvimento, parcerias estratégicas, marketing, e iniciativas comunitárias aprovadas através de votação DAO.',
      governance: 'Governança Conceptual',
      governanceText: 'Todas as decisões de alocação são teóricas e sujeitas a aprovação conceptual da comunidade através do sistema de votação DAO descrito no Gold Paper.',
    },
    vesting: {
      title: 'Cronograma de Vesting',
      subtitle: 'Liberação Progressiva Conceptual',
      intro: 'Sistema teórico de liberação gradual de tokens ao longo do tempo para garantir estabilidade de longo prazo.',
      presale: 'Pré-venda',
      presaleDetails: 'Seed: 18 meses • Private: 12 meses • Public: 6 meses',
      team: 'Equipa & Desenvolvimento',
      teamDetails: '24 meses com cliff de 6 meses',
      dao: 'Tesouraria DAO',
      daoDetails: 'Liberação gradual ao longo de 60 meses',
      note: 'Nota Conceptual',
      noteText: 'Todos os cronogramas são representações teóricas. Nenhuma liberação automática de tokens ocorre através deste sistema.',
    },
    monetary: {
      title: 'Política Monetária Deflacionária',
      subtitle: 'Mecânicas Conceptuais de Redução de Fornecimento',
      intro: 'Modelo teórico de queima progressiva para reduzir o fornecimento total em 50% ao longo de 5 anos.',
      sources: 'Fontes Conceptuais de Queima',
      source1: 'Taxa de transação teórica: 0,5% de todas as transferências',
      source2: 'Propostas DAO conceptuais: Queimas aprovadas pela comunidade',
      source3: 'Moedas expiradas teóricas: Tokens não resgatados após 90 dias',
      goal: 'Meta Conceptual',
      goalText: 'Reduzir fornecimento total para 500M QMY ao longo de 5 anos (modelo teórico)',
      disclaimer: 'Aviso de Não-Execução',
      disclaimerText: 'Nenhuma queima de tokens, redução de fornecimento, ou operação deflacionária é executada através deste sistema. Todas as mecânicas descritas são conceptuais e educativas.',
    },
    timeline: {
      title: 'Linha Temporal Conceptual',
      subtitle: 'Marcos Teóricos de Liberação e Queima',
      month0: 'Mês 0',
      month0Text: 'Lançamento conceptual • Início teórico do vesting',
      month6: 'Mês 6',
      month6Text: 'Primeira liberação conceptual (Public)',
      month12: 'Mês 12',
      month12Text: 'Liberação conceptual Private • Cliff da equipa',
      month18: 'Mês 18',
      month18Text: 'Liberação conceptual Seed completa',
      month24: 'Mês 24',
      month24Text: 'Vesting conceptual da equipa completo',
      month60: 'Mês 60',
      month60Text: 'Liberação conceptual DAO completa • Meta de queima teórica atingida',
    },
    compliance: {
      title: 'Conformidade Regulatória',
      text: 'Este modelo conceptual está em conformidade total com MiCA (Regulamento de Mercados de Criptoativos da UE) e GDPR (Regulamento Geral de Proteção de Dados da UE 2016/679). Nenhuma operação financeira real, emissão de valores mobiliários, ou promessa de retornos financeiros está presente neste documento.',
    },
    expansion: {
      title: 'Expansão Institucional / Apêndice Conceptual',
      detailedVesting: {
        title: 'Modelos Detalhados de Vesting Ilustrativos',
        intro: 'Exemplos teóricos de como diferentes estruturas de vesting poderiam ser aplicadas em ambientes regulados:',
        table: {
          category: 'Categoria',
          duration: 'Duração Ilustrativa',
          cliff: 'Cliff Conceptual',
          release: 'Padrão de Liberação',
        },
        rows: [
          { category: 'Seed Presale', duration: '18 meses', cliff: '3 meses', release: 'Linear mensal após cliff' },
          { category: 'Private Presale', duration: '12 meses', cliff: '2 meses', release: 'Linear mensal após cliff' },
          { category: 'Public Presale', duration: '6 meses', cliff: '0 meses', release: 'Linear mensal' },
          { category: 'Equipa', duration: '24 meses', cliff: '6 meses', release: 'Linear mensal após cliff' },
          { category: 'Tesouraria DAO', duration: '60 meses', cliff: '0 meses', release: 'Aprovação por governança' },
        ],
        note: 'Estes são modelos puramente ilustrativos. Nenhuma liberação automática ocorre.',
      },
      treasuryOversight: {
        title: 'Supervisão Conceptual de Tesouraria',
        intro: 'Como a supervisão de tesouraria poderia ser representada num modelo de governança descentralizada:',
        roles: [
          {
            role: 'Guardião de Tesouraria (conceptual)',
            description: 'Papel teórico responsável por monitorizar saldos e propor ajustes de alocação.',
          },
          {
            role: 'Comité de Auditoria (conceptual)',
            description: 'Grupo teórico que revê relatórios de tesouraria e verifica conformidade com regras de governança.',
          },
          {
            role: 'Votantes da Comunidade (conceptual)',
            description: 'Holders teóricos de tokens que aprovam ou rejeitam propostas de desembolso de tesouraria.',
          },
        ],
        note: 'Nenhum destes papéis é executado on-chain. Todos são descritivos apenas.',
      },
    },
  },
  en: {
    title: 'Treasury & Monetary Policy',
    subtitle: 'Conceptual Financial Management Model',
    disclaimer: {
      title: 'Important Notice — Conceptual Content',
      text: 'This page presents a conceptual and educational model of treasury and monetary policy. It does NOT represent real financial execution, on-chain transactions, token issuance, swap operations, bridges, or any form of payment execution. All content is strictly informational and does not integrate with gameplay functionalities. Full compliance with MiCA (EU) and GDPR (EU 2016/679).',
    },
    treasury: {
      title: 'DAO Treasury',
      subtitle: 'Conceptual Resource Management',
      allocation: 'Conceptual Allocation',
      allocationValue: '200,000,000 QMY (20% of total supply)',
      purpose: 'Theoretical Purpose',
      purposeText: 'Conceptual reserve for development, strategic partnerships, marketing, and community initiatives approved through DAO voting.',
      governance: 'Conceptual Governance',
      governanceText: 'All allocation decisions are theoretical and subject to conceptual community approval through the DAO voting system described in the Gold Paper.',
    },
    vesting: {
      title: 'Vesting Schedule',
      subtitle: 'Conceptual Progressive Release',
      intro: 'Theoretical system of gradual token release over time to ensure long-term stability.',
      presale: 'Presale',
      presaleDetails: 'Seed: 18 months • Private: 12 months • Public: 6 months',
      team: 'Team & Development',
      teamDetails: '24 months with 6-month cliff',
      dao: 'DAO Treasury',
      daoDetails: 'Gradual release over 60 months',
      note: 'Conceptual Note',
      noteText: 'All schedules are theoretical representations. No automatic token release occurs through this system.',
    },
    monetary: {
      title: 'Deflationary Monetary Policy',
      subtitle: 'Conceptual Supply Reduction Mechanics',
      intro: 'Theoretical progressive burn model to reduce total supply by 50% over 5 years.',
      sources: 'Conceptual Burn Sources',
      source1: 'Theoretical transaction fee: 0.5% of all transfers',
      source2: 'Conceptual DAO proposals: Community-approved burns',
      source3: 'Theoretical expired coins: Unclaimed tokens after 90 days',
      goal: 'Conceptual Goal',
      goalText: 'Reduce total supply to 500M QMY over 5 years (theoretical model)',
      disclaimer: 'Non-Execution Notice',
      disclaimerText: 'No token burning, supply reduction, or deflationary operations are executed through this system. All described mechanics are conceptual and educational.',
    },
    timeline: {
      title: 'Conceptual Timeline',
      subtitle: 'Theoretical Release and Burn Milestones',
      month0: 'Month 0',
      month0Text: 'Conceptual launch • Theoretical vesting start',
      month6: 'Month 6',
      month6Text: 'First conceptual release (Public)',
      month12: 'Month 12',
      month12Text: 'Conceptual Private release • Team cliff',
      month18: 'Month 18',
      month18Text: 'Conceptual Seed release complete',
      month24: 'Month 24',
      month24Text: 'Conceptual team vesting complete',
      month60: 'Month 60',
      month60Text: 'Conceptual DAO release complete • Theoretical burn goal achieved',
    },
    compliance: {
      title: 'Regulatory Compliance',
      text: 'This conceptual model is in full compliance with MiCA (EU Markets in Crypto-Assets Regulation) and GDPR (EU General Data Protection Regulation 2016/679). No real financial operations, securities issuance, or promise of financial returns are present in this document.',
    },
    expansion: {
      title: 'Institutional Expansion / Conceptual Appendix',
      detailedVesting: {
        title: 'Detailed Illustrative Vesting Models',
        intro: 'Theoretical examples of how different vesting structures could be applied in regulated environments:',
        table: {
          category: 'Category',
          duration: 'Illustrative Duration',
          cliff: 'Conceptual Cliff',
          release: 'Release Pattern',
        },
        rows: [
          { category: 'Seed Presale', duration: '18 months', cliff: '3 months', release: 'Linear monthly after cliff' },
          { category: 'Private Presale', duration: '12 months', cliff: '2 months', release: 'Linear monthly after cliff' },
          { category: 'Public Presale', duration: '6 months', cliff: '0 months', release: 'Linear monthly' },
          { category: 'Team', duration: '24 months', cliff: '6 months', release: 'Linear monthly after cliff' },
          { category: 'DAO Treasury', duration: '60 months', cliff: '0 months', release: 'Governance approval' },
        ],
        note: 'These are purely illustrative models. No automatic release occurs.',
      },
      treasuryOversight: {
        title: 'Conceptual Treasury Oversight',
        intro: 'How treasury oversight could be represented in a decentralized governance model:',
        roles: [
          {
            role: 'Treasury Guardian (conceptual)',
            description: 'Theoretical role responsible for monitoring balances and proposing allocation adjustments.',
          },
          {
            role: 'Audit Committee (conceptual)',
            description: 'Theoretical group that reviews treasury reports and verifies compliance with governance rules.',
          },
          {
            role: 'Community Voters (conceptual)',
            description: 'Theoretical token holders who approve or reject treasury disbursement proposals.',
          },
        ],
        note: 'None of these roles are executed on-chain. All are descriptive only.',
      },
    },
  },
};

export default function TreasuryMonetaryPolicyPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Lock className="w-16 h-16 text-amber-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            {t.title}
          </h1>
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

        {/* Treasury Section */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Lock className="w-12 h-12 text-amber-500" />
              <div>
                <CardTitle className="text-4xl font-serif text-amber-400">
                  {t.treasury.title}
                </CardTitle>
                <p className="text-lg text-amber-300 mt-2">{t.treasury.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src="/assets/generated/vesting-vault-transparent.dim_64x64.png" 
                  alt="Treasury" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-gold mb-6"
                />
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.treasury.allocation}</h3>
                  <p className="text-2xl font-bold text-amber-300">{t.treasury.allocationValue}</p>
                </div>
                <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.treasury.purpose}</h3>
                  <p className="text-amber-300">{t.treasury.purposeText}</p>
                </div>
                <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.treasury.governance}</h3>
                  <p className="text-amber-300">{t.treasury.governanceText}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vesting Section */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="w-12 h-12 text-amber-500" />
              <div>
                <CardTitle className="text-4xl font-serif text-amber-400">
                  {t.vesting.title}
                </CardTitle>
                <p className="text-lg text-amber-300 mt-2">{t.vesting.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-amber-300 leading-relaxed">{t.vesting.intro}</p>

            <div>
              <img 
                src="/assets/generated/comprehensive-vesting-schedule.dim_800x500.png" 
                alt="Vesting Schedule" 
                className="w-full rounded-lg shadow-gold mb-6"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.vesting.presale}</h3>
                <p className="text-sm text-amber-300">{t.vesting.presaleDetails}</p>
              </div>
              <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.vesting.team}</h3>
                <p className="text-sm text-amber-300">{t.vesting.teamDetails}</p>
              </div>
              <div className="p-6 bg-black/30 rounded-lg border border-amber-500/20">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">{t.vesting.dao}</h3>
                <p className="text-sm text-amber-300">{t.vesting.daoDetails}</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
              <h4 className="text-lg font-semibold text-amber-400 mb-2">{t.vesting.note}</h4>
              <p className="text-sm text-amber-300 italic">{t.vesting.noteText}</p>
            </div>
          </CardContent>
        </Card>

        {/* Monetary Policy Section */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <TrendingDown className="w-12 h-12 text-amber-500" />
              <div>
                <CardTitle className="text-4xl font-serif text-amber-400">
                  {t.monetary.title}
                </CardTitle>
                <p className="text-lg text-amber-300 mt-2">{t.monetary.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-amber-300 leading-relaxed">{t.monetary.intro}</p>

            <div>
              <img 
                src="/assets/generated/burn-mechanism-flowchart.dim_600x400.png" 
                alt="Burn Mechanism" 
                className="w-full rounded-lg shadow-gold mb-6"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-amber-400 mb-4">{t.monetary.sources}</h3>
              <ul className="space-y-3">
                <li className="flex items-start p-4 bg-black/30 rounded-lg border border-amber-500/20">
                  <span className="text-amber-500 mr-3 text-xl">•</span>
                  <span className="text-amber-300">{t.monetary.source1}</span>
                </li>
                <li className="flex items-start p-4 bg-black/30 rounded-lg border border-amber-500/20">
                  <span className="text-amber-500 mr-3 text-xl">•</span>
                  <span className="text-amber-300">{t.monetary.source2}</span>
                </li>
                <li className="flex items-start p-4 bg-black/30 rounded-lg border border-amber-500/20">
                  <span className="text-amber-500 mr-3 text-xl">•</span>
                  <span className="text-amber-300">{t.monetary.source3}</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg">
              <h4 className="text-xl font-semibold text-amber-400 mb-2">{t.monetary.goal}</h4>
              <p className="text-amber-300">{t.monetary.goalText}</p>
            </div>

            <Separator className="bg-amber-500/20" />

            <div className="p-6 bg-gradient-to-r from-red-900/20 via-red-800/30 to-red-900/20 rounded-lg border border-red-500/30">
              <h4 className="text-lg font-semibold text-red-400 mb-2">{t.monetary.disclaimer}</h4>
              <p className="text-sm text-red-300 italic">{t.monetary.disclaimerText}</p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="mb-12 bg-black/50 border-amber-500/30 glass-card">
          <CardHeader>
            <CardTitle className="text-4xl font-serif text-amber-400">
              {t.timeline.title}
            </CardTitle>
            <p className="text-lg text-amber-300 mt-2">{t.timeline.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month0}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month0Text}</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month6}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month6Text}</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month12}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month12Text}</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month18}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month18Text}</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month24}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month24Text}</p>
              </div>
              <div className="p-4 bg-black/30 rounded-lg border-l-4 border-amber-500">
                <h4 className="text-lg font-semibold text-amber-400 mb-1">{t.timeline.month60}</h4>
                <p className="text-sm text-amber-300">{t.timeline.month60Text}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Footer */}
        <Card className="bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 border-amber-500/50 glass-card mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-amber-400 text-center">
              {t.compliance.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-300 leading-relaxed text-justify">
              {t.compliance.text}
            </p>
          </CardContent>
        </Card>

        {/* Institutional Expansion Section */}
        <InstitutionalExpansionSection title={t.expansion.title}>
          {/* Detailed Vesting Models */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.detailedVesting.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.detailedVesting.intro}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">{t.expansion.detailedVesting.table.category}</TableHead>
                    <TableHead className="text-amber-400 font-semibold">{t.expansion.detailedVesting.table.duration}</TableHead>
                    <TableHead className="text-amber-400 font-semibold">{t.expansion.detailedVesting.table.cliff}</TableHead>
                    <TableHead className="text-amber-400 font-semibold">{t.expansion.detailedVesting.table.release}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.detailedVesting.rows.map((row, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{row.category}</TableCell>
                      <TableCell className="text-gray-300">{row.duration}</TableCell>
                      <TableCell className="text-gray-300">{row.cliff}</TableCell>
                      <TableCell className="text-gray-300">{row.release}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.detailedVesting.note}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Treasury Oversight */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.treasuryOversight.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.treasuryOversight.intro}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Papel Conceptual' : 'Conceptual Role'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Descrição Teórica' : 'Theoretical Description'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.treasuryOversight.roles.map((role, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{role.role}</TableCell>
                      <TableCell className="text-gray-300">{role.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.treasuryOversight.note}
                </p>
              </div>
            </CardContent>
          </Card>
        </InstitutionalExpansionSection>
      </div>
    </section>
  );
}
