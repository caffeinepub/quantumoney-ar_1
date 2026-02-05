import { Shield, Scale, Users, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalExpansionSection from '@/components/InstitutionalExpansionSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Conformidade Legal',
      subtitle: 'Comprometidos com os Mais Altos Padrões Regulatórios',
      gdpr: 'Conformidade GDPR da União Europeia',
      gdprDesc: 'Totalmente compatível com o Regulamento Geral de Proteção de Dados da UE.',
      mica: 'Conformidade MiCA EU 2025',
      micaDesc: 'Aderente aos regulamentos de Mercados em Criptoativos da União Europeia.',
      kyc: 'Verificação KYC/AML',
      kycDesc: 'Verificação obrigatória de identidade para transações acima de limites estabelecidos.',
      disclaimer: 'Aviso Legal',
      disclaimerDesc: 'Investimento em criptomoedas envolve riscos significativos. Invista apenas o que pode perder.',
      expansion: {
        title: 'Expansão Institucional / Apêndice Conceptual',
        clarification: {
          title: 'Clarificação de Conteúdo Institucional',
          intro: 'As descrições institucionais apresentadas neste website são conceptuais e não-operacionais:',
          points: [
            'Nenhuma emissão de tokens, distribuição, vesting, ou operação de tesouraria é executada através deste sistema.',
            'Todas as mecânicas de governança, votação DAO, e fluxos de tesouraria descritos são modelos teóricos apenas.',
            'Nenhuma operação financeira, swap, bridge, ou transação on-chain ocorre através destas páginas institucionais.',
            'Todo o conteúdo está em conformidade total com MiCA (Regulamento de Mercados de Criptoativos da UE) e GDPR (Regulamento Geral de Proteção de Dados da UE 2016/679).',
          ],
          separation: 'Separação do Jogo AR',
          separationText: 'O conteúdo institucional descrito nestas páginas é completamente separado das mecânicas de gameplay do jogo AR Quantumoney. Nenhuma recompensa de jogo, captura de monstros, ou operação de moeda plantada está relacionada com as descrições conceptuais de tokenomics, tesouraria ou governança.',
        },
      },
    },
    en: {
      title: 'Legal Compliance',
      subtitle: 'Committed to the Highest Regulatory Standards',
      gdpr: 'European Union GDPR Compliance',
      gdprDesc: 'Fully compliant with EU General Data Protection Regulation.',
      mica: 'MiCA EU 2025 Compliance',
      micaDesc: 'Adherent to European Union Markets in Crypto-Assets regulations.',
      kyc: 'KYC/AML Verification',
      kycDesc: 'Mandatory identity verification for transactions above established limits.',
      disclaimer: 'Legal Disclaimer',
      disclaimerDesc: 'Cryptocurrency investment involves significant risks. Invest only what you can afford to lose.',
      expansion: {
        title: 'Institutional Expansion / Conceptual Appendix',
        clarification: {
          title: 'Institutional Content Clarification',
          intro: 'The institutional descriptions presented on this website are conceptual and non-operational:',
          points: [
            'No token issuance, distribution, vesting, or treasury operations are executed through this system.',
            'All governance mechanics, DAO voting, and treasury flows described are theoretical models only.',
            'No financial operations, swaps, bridges, or on-chain transactions occur through these institutional pages.',
            'All content is in full compliance with MiCA (EU Markets in Crypto-Assets Regulation) and GDPR (EU General Data Protection Regulation 2016/679).',
          ],
          separation: 'Separation from AR Game',
          separationText: 'The institutional content described on these pages is completely separate from the Quantumoney AR game gameplay mechanics. No game rewards, monster captures, or planted coin operations are related to the conceptual descriptions of tokenomics, treasury, or governance.',
        },
      },
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img
              src="/assets/generated/gdpr-mica-compliance-badges-transparent.dim_200x100.png"
              alt="GDPR & MiCA Compliance"
              className="h-20 object-contain"
            />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <div className="flex items-start gap-6 mb-6">
              <Shield className="w-12 h-12 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-500 mb-3">
                  {t.gdpr}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {t.gdprDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <div className="flex items-start gap-6 mb-6">
              <Scale className="w-12 h-12 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-500 mb-3">
                  {t.mica}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {t.micaDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <div className="flex items-start gap-6 mb-6">
              <Users className="w-12 h-12 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-500 mb-3">
                  {t.kyc}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {t.kycDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <div className="flex items-start gap-6 mb-6">
              <FileText className="w-12 h-12 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-500 mb-3">
                  {t.disclaimer}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {t.disclaimerDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Expansion Section */}
        <InstitutionalExpansionSection title={t.expansion.title}>
          <Card className="bg-black/50 border-amber-500/30 glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-400">
                {t.expansion.clarification.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-amber-300 leading-relaxed text-justify">
                {t.expansion.clarification.intro}
              </p>

              <ul className="space-y-3">
                {t.expansion.clarification.points.map((point, idx) => (
                  <li key={idx} className="flex items-start p-4 bg-black/30 rounded-lg border border-amber-500/20">
                    <span className="text-amber-500 mr-3 text-xl flex-shrink-0">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-amber-500/30">
                <h3 className="text-2xl font-semibold text-amber-400 mb-4">
                  {t.expansion.clarification.separation}
                </h3>
                <p className="text-amber-300 leading-relaxed text-justify">
                  {t.expansion.clarification.separationText}
                </p>
              </div>
            </CardContent>
          </Card>
        </InstitutionalExpansionSection>
      </div>
    </section>
  );
}
