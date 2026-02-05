import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalExpansionSection from '@/components/InstitutionalExpansionSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Lock, Unlock, TrendingUp } from 'lucide-react';

export default function TokenomicsPage() {
  const [hoveredAllocation, setHoveredAllocation] = useState<number | null>(null);
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Tokenomics QMY',
      supplyLabel: 'Fornecimento Total',
      supply: '1.000.000.000 QMY',
      distribution: 'Distribuição de Tokens',
      allocation: [
        {
          label: 'Bônus de Registro (100k usuários)',
          value: 10,
          amount: '100.000.000 QMY',
        },
        {
          label: 'Recompensas de Jogo AR',
          value: 30,
          amount: '300.000.000 QMY',
        },
        {
          label: 'Tesouraria DAO',
          value: 20,
          amount: '200.000.000 QMY',
        },
        {
          label: 'Equipe & Desenvolvimento',
          value: 15,
          amount: '150.000.000 QMY',
        },
        {
          label: 'Pré-venda',
          value: 25,
          amount: '250.000.000 QMY',
        },
      ],
      expansion: {
        title: 'Expansão Institucional / Apêndice Conceptual',
        distributionFramework: {
          title: 'Estrutura Conceptual de Distribuição de Tokens',
          intro: 'Esta secção descreve a estrutura teórica de como um futuro token QMY poderia ser distribuído uma vez legalmente permitido e uma vez que a emissão ocorra. Nenhum token existe hoje, e nenhuma distribuição está ativa.',
          description: 'A estrutura conceptual de distribuição espelha práticas padrão em ambientes de ativos digitais regulados e segue uma abordagem prudencial, ao estilo bancário:',
          categories: [
            {
              name: 'Reserva de Tesouraria (conceptual)',
              purpose: 'Uma alocação central detida pelo canister de tesouraria conceptual do protocolo. Destinada à governança de longo prazo, sustentabilidade e manutenção do sistema. Não acessível a qualquer utilizador ou operador, e não operacional hoje.',
            },
            {
              name: 'Ecossistema & Infraestrutura (conceptual)',
              purpose: 'Uma alocação teórica destinada a apoiar I&D, infraestrutura de rede, segurança do protocolo e estabilidade do ecossistema.',
            },
            {
              name: 'Incentivos Comunitários & Governança (conceptual)',
              purpose: 'Uma possível alocação futura para participantes de governança, sujeita a mecanismos de vesting rigorosos e controlos processuais.',
            },
            {
              name: 'Equipa & Contribuidores (conceptual)',
              purpose: 'Alocações futuras estruturadas de vesting de longo prazo, bloqueadas por períodos prolongados, em conformidade com as regras MiCA sobre alocações internas.',
            },
          ],
          note: 'Nenhuma percentagem, nenhum valor, e nenhum cronograma de emissão são definidos para garantir total conformidade e evitar qualquer representação financeira.',
        },
        lockedUnlocked: {
          title: 'Saldos Bloqueados vs. Desbloqueados (Conceptual)',
          intro: 'Um futuro token QMY, se emitido, seria governado por um modelo de bloqueio multi-camada semelhante a estruturas de custódia institucional.',
          locked: {
            title: 'Saldos Bloqueados (apenas conceptual):',
            items: [
              'Não podem ser transferidos.',
              'Estão vinculados a regras de ciclo de vida relacionadas com vesting ou governança.',
              'Existem apenas como entradas teóricas em dashboards simulados.',
            ],
          },
          unlocked: {
            title: 'Saldos Desbloqueados (apenas conceptual):',
            items: [
              'Representam saldos sem restrições.',
              'Poderiam, num ambiente futuro conforme, ser elegíveis para operações de governança.',
              'Nunca estão disponíveis para negociação, venda ou uso financeiro dentro do sistema atual.',
            ],
          },
          note: 'Todos os saldos mostrados no website são simulados; nenhum utilizador detém qualquer ativo real.',
        },
        vesting: {
          title: 'Vesting & Cronogramas de Desbloqueio (Apenas Descritivo)',
          intro: 'O modelo conceptual de vesting segue estruturas institucionais padrão usadas por bancos e órgãos reguladores:',
          models: [
            {
              name: 'Vesting Linear (ilustrativo)',
              description: 'Os saldos desbloqueiam gradualmente ao longo de períodos prolongados.',
            },
            {
              name: 'Vesting Cliff (ilustrativo)',
              description: 'Nenhum desbloqueio ocorre até que um limite de tempo definido seja atingido.',
            },
            {
              name: 'Desbloqueios Multi-Etapa',
              description: 'Etapas de dependência sequencial que requerem confirmações de governança.',
            },
            {
              name: 'Portões de Paragem Regulatória',
              description: 'Um mecanismo integrado para prevenir totalmente desbloqueios se restrições regulatórias ou de governança se aplicarem.',
            },
          ],
          note: 'Todos os cronogramas exibidos são apenas diagramas. Nenhum cronograma real existe.',
        },
        treasury: {
          title: 'Fluxos de Tesouraria (Teórico, Não-Operacional)',
          intro: 'O modelo conceptual de tesouraria descreve como uma futura tesouraria de protocolo poderia mover saldos teóricos:',
          inbound: {
            title: 'Fluxos de Entrada (conceptual):',
            items: [
              'Cunhagem aprovada por governança (inativa)',
              'Reversões de vesting de alocações não investidas (inativa)',
              'Ajustes dirigidos por governança (inativa)',
            ],
          },
          outbound: {
            title: 'Fluxos de Saída (conceptual):',
            items: [
              'Desembolsos aprovados por governança (inativa)',
              'Subsídios conceptuais ao ecossistema (inativa)',
              'Alocações de manutenção do sistema (inativa)',
            ],
          },
          note: 'Todos os fluxos de tesouraria no site são diagramas estáticos. Nenhuma operação financeira ocorre. Nenhum valor é armazenado ou movido.',
        },
      },
    },
    en: {
      title: 'QMY Tokenomics',
      supplyLabel: 'Total Supply',
      supply: '1,000,000,000 QMY',
      distribution: 'Token Distribution',
      allocation: [
        {
          label: 'Registration Bonus (100k users)',
          value: 10,
          amount: '100,000,000 QMY',
        },
        {
          label: 'AR Game Rewards',
          value: 30,
          amount: '300,000,000 QMY',
        },
        {
          label: 'DAO Treasury',
          value: 20,
          amount: '200,000,000 QMY',
        },
        {
          label: 'Team & Development',
          value: 15,
          amount: '150,000,000 QMY',
        },
        {
          label: 'Presale',
          value: 25,
          amount: '250,000,000 QMY',
        },
      ],
      expansion: {
        title: 'Institutional Expansion / Conceptual Appendix',
        distributionFramework: {
          title: 'Conceptual Token Distribution Framework',
          intro: 'This section describes the theoretical structure of how a future QMY token could be distributed once legally permitted and once issuance occurs. No token exists today, and no distribution is active.',
          description: 'The conceptual distribution framework mirrors standard practices in regulated digital-asset environments and follows a bank-style, prudential approach:',
          categories: [
            {
              name: 'Treasury Reserve (conceptual)',
              purpose: 'A central allocation held by the protocol\'s conceptual treasury canister. Intended for long-term governance, sustainability, and system maintenance. Not accessible to any user or operator, and not operational today.',
            },
            {
              name: 'Ecosystem & Infrastructure (conceptual)',
              purpose: 'A theoretical allocation intended to support R&D, network infrastructure, protocol security, and ecosystem stability.',
            },
            {
              name: 'Community & Governance Incentives (conceptual)',
              purpose: 'A possible future allocation for governance participants, subject to strict vesting mechanisms and procedural controls.',
            },
            {
              name: 'Team & Contributors (conceptual)',
              purpose: 'Future structured, long-term vesting allocations, locked for extended periods, compliant with MiCA rules on insider allocations.',
            },
          ],
          note: 'No percentages, no figures, and no issuance timelines are defined to ensure full compliance and to avoid any financial representation.',
        },
        lockedUnlocked: {
          title: 'Locked vs. Unlocked Balances (Conceptual)',
          intro: 'A future QMY token, if issued, would be governed by a multi-layer locking model similar to institutional escrow structures.',
          locked: {
            title: 'Locked balances (conceptual only):',
            items: [
              'Cannot be transferred.',
              'Are bound to vesting or governance-related lifecycle rules.',
              'Exist only as theoretical entries in simulated dashboards.',
            ],
          },
          unlocked: {
            title: 'Unlocked balances (conceptual only):',
            items: [
              'Represent balances without restrictions.',
              'Could, in a future compliant environment, be eligible for governance operations.',
              'Are never available for trading, sale, or financial use within the current system.',
            ],
          },
          note: 'All balances shown on the website are simulated; no user holds any real asset.',
        },
        vesting: {
          title: 'Vesting & Unlock Timelines (Descriptive Only)',
          intro: 'The conceptual vesting model follows standard institutional frameworks used by banks and regulatory bodies:',
          models: [
            {
              name: 'Linear Vesting (illustrative)',
              description: 'Balances unlock gradually over extended periods.',
            },
            {
              name: 'Cliff Vesting (illustrative)',
              description: 'No unlock occurs until a defined time threshold is reached.',
            },
            {
              name: 'Multi-Stage Unlocks',
              description: 'Sequential dependency steps that require governance confirmations.',
            },
            {
              name: 'Regulatory Stop Gates',
              description: 'A built-in mechanism to fully prevent unlocks if regulatory or governance constraints apply.',
            },
          ],
          note: 'All timelines displayed are diagrams only. No real schedules exist.',
        },
        treasury: {
          title: 'Treasury Flows (Theoretical, Non-Operational)',
          intro: 'The conceptual treasury model describes how a future protocol treasury could move theoretical balances:',
          inbound: {
            title: 'Inbound flows (conceptual):',
            items: [
              'Governance-approved minting (inactive)',
              'Vesting-reversions from unvested allocations (inactive)',
              'Governance-directed adjustments (inactive)',
            ],
          },
          outbound: {
            title: 'Outbound flows (conceptual):',
            items: [
              'Governance-approved disbursements (inactive)',
              'Conceptual ecosystem grants (inactive)',
              'System maintenance allocations (inactive)',
            ],
          },
          note: 'All treasury flows on the site are static diagrams. No financial operations occur. No value is stored or moved.',
        },
      },
    },
  };

  const t = content[language];

  return (
    <section className="min-h-screen bg-black px-[2.5%] py-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* QMY Luxury Pro Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/generated/qmy-luxury-pro-logo-transparent.dim_200x200.png"
            alt="QMY Luxury Pro"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-amber-500 mb-8">
          {t.title}
        </h1>

        {/* Total Supply Card */}
        <div
          className="w-full mb-6 rounded-2xl border border-amber-600/40 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm"
          style={{ height: '140px' }}
        >
          <div className="h-full flex flex-col items-center justify-center px-6">
            <p className="text-amber-400 text-base md:text-lg font-semibold mb-2" style={{ lineHeight: '1.2' }}>
              {t.supplyLabel}
            </p>
            <p className="text-amber-500 text-3xl md:text-4xl font-bold" style={{ lineHeight: '1.2' }}>
              {t.supply}
            </p>
          </div>
        </div>

        {/* Distribution Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-amber-500 mb-6">
          {t.distribution}
        </h2>

        {/* Distribution Cards */}
        <div className="space-y-4">
          {t.allocation.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-2xl border border-amber-600/40 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ minHeight: '130px', maxHeight: '150px' }}
              onMouseEnter={() => setHoveredAllocation(index)}
              onMouseLeave={() => setHoveredAllocation(null)}
            >
              <div className="h-full flex flex-col justify-center px-6 py-4">
                {/* Label and Percentage */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-amber-400 text-sm md:text-base font-semibold" style={{ lineHeight: '1.2' }}>
                    {item.label}
                  </p>
                  <p className="text-amber-500 text-lg md:text-xl font-bold" style={{ lineHeight: '1.2' }}>
                    {item.value}%
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-8 mb-3 overflow-hidden flex items-center">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full flex items-center justify-center transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  >
                    <span className="text-white text-xs md:text-sm font-bold" style={{ lineHeight: '1.2' }}>
                      {item.value}%
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <p className="text-gray-300 text-sm md:text-base font-medium text-center" style={{ lineHeight: '1.2' }}>
                  {item.amount}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Expansion Section */}
        <InstitutionalExpansionSection title={t.expansion.title}>
          {/* Conceptual Token Distribution Framework */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <TrendingUp className="w-10 h-10 text-amber-500" />
                <CardTitle className="text-3xl font-serif text-amber-400">
                  {t.expansion.distributionFramework.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.distributionFramework.intro}
              </p>
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.distributionFramework.description}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Categoria' : 'Category'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Finalidade Conceptual' : 'Conceptual Purpose'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.distributionFramework.categories.map((cat, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{cat.name}</TableCell>
                      <TableCell className="text-gray-300">{cat.purpose}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.distributionFramework.note}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Locked vs Unlocked Balances */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Lock className="w-10 h-10 text-amber-500" />
                <CardTitle className="text-3xl font-serif text-amber-400">
                  {t.expansion.lockedUnlocked.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.lockedUnlocked.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-lg border border-red-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-8 h-8 text-red-400" />
                    <h3 className="text-xl font-semibold text-red-400">
                      {t.expansion.lockedUnlocked.locked.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {t.expansion.lockedUnlocked.locked.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Unlock className="w-8 h-8 text-green-400" />
                    <h3 className="text-xl font-semibold text-green-400">
                      {t.expansion.lockedUnlocked.unlocked.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {t.expansion.lockedUnlocked.unlocked.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.lockedUnlocked.note}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vesting & Unlock Timelines */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.vesting.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.vesting.intro}
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-amber-500/30">
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Modelo' : 'Model'}
                    </TableHead>
                    <TableHead className="text-amber-400 font-semibold">
                      {language === 'pt' ? 'Descrição Ilustrativa' : 'Illustrative Description'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.expansion.vesting.models.map((model, idx) => (
                    <TableRow key={idx} className="border-amber-500/20">
                      <TableCell className="text-amber-300 font-medium">{model.name}</TableCell>
                      <TableCell className="text-gray-300">{model.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.vesting.note}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Treasury Flows */}
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.treasury.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.treasury.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-lg border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">
                    {t.expansion.treasury.inbound.title}
                  </h3>
                  <ul className="space-y-2">
                    {t.expansion.treasury.inbound.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-lg border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">
                    {t.expansion.treasury.outbound.title}
                  </h3>
                  <ul className="space-y-2">
                    {t.expansion.treasury.outbound.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-900/20 via-amber-800/30 to-amber-900/20 rounded-lg border border-amber-500/30">
                <p className="text-sm text-amber-300 italic text-center">
                  {t.expansion.treasury.note}
                </p>
              </div>
            </CardContent>
          </Card>
        </InstitutionalExpansionSection>
      </div>
    </section>
  );
}
