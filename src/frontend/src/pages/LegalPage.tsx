import { Shield, Scale, Users, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

        <div className="grid md:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
}
