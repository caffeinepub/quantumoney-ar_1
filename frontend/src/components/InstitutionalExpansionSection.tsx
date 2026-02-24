import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface InstitutionalExpansionSectionProps {
  children: React.ReactNode;
  title?: string;
}

export default function InstitutionalExpansionSection({ 
  children, 
  title 
}: InstitutionalExpansionSectionProps) {
  const { language } = useLanguage();

  const disclaimerContent = {
    pt: {
      defaultTitle: 'Expansão Institucional / Apêndice Conceptual',
      disclaimerTitle: 'Aviso — Conteúdo Conceptual e Não-Operacional',
      disclaimerText: 'O conteúdo abaixo é estritamente conceptual, educativo e não-operacional. NÃO representa execução financeira real, transações on-chain, emissão de tokens, operações de swap, bridges, ou qualquer forma de execução de pagamentos ou tesouraria. Todo o conteúdo é informativo apenas e completamente separado das mecânicas de gameplay do jogo AR. Conformidade total com MiCA (Regulamento de Mercados de Criptoativos da UE) e GDPR (Regulamento Geral de Proteção de Dados da UE 2016/679).',
      separationNote: 'Este conteúdo institucional é completamente separado do jogo AR Quantumoney.',
    },
    en: {
      defaultTitle: 'Institutional Expansion / Conceptual Appendix',
      disclaimerTitle: 'Notice — Conceptual and Non-Operational Content',
      disclaimerText: 'The content below is strictly conceptual, educational, and non-operational. It does NOT represent real financial execution, on-chain transactions, token issuance, swap operations, bridges, or any form of payment or treasury execution. All content is informational only and completely separate from the AR game gameplay mechanics. Full compliance with MiCA (EU Markets in Crypto-Assets Regulation) and GDPR (EU General Data Protection Regulation 2016/679).',
      separationNote: 'This institutional content is completely separate from the Quantumoney AR game.',
    },
  };

  const t = disclaimerContent[language];

  return (
    <section className="mt-16 pt-16 border-t-4 border-amber-500/30">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-4">
          {title || t.defaultTitle}
        </h2>
      </div>

      {/* Disclaimer Banner */}
      <Card className="mb-12 bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/50 glass-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <CardTitle className="text-xl md:text-2xl font-serif text-red-400">
              {t.disclaimerTitle}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-300 leading-relaxed text-justify">
            {t.disclaimerText}
          </p>
          <div className="pt-4 border-t border-red-500/30">
            <p className="text-sm text-red-400 font-semibold text-center">
              {t.separationNote}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <div className="space-y-12">
        {children}
      </div>
    </section>
  );
}
