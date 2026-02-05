import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText } from 'lucide-react';

// Canister configuration
const DOCS_CANISTER_ID = 'whu4t-kiaaa-aaaah-qsc5q-cai';
const DOCS_BASE_URL = `https://${DOCS_CANISTER_ID}.icp0.io`;

export default function GoldPaper() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Gold Paper',
      subtitle: 'Documentação Técnica e Empresarial',
      description: 'O Gold Paper completo está hospedado no canister de documentação dedicado para acesso otimizado e leitura.',
      redirecting: 'Redirecionando para o canister de documentação...',
      button: 'Aceder ao Gold Paper',
      note: 'Nota: A documentação é servida a partir de um canister dedicado (read-only) para garantir desempenho e disponibilidade.',
    },
    en: {
      title: 'Gold Paper',
      subtitle: 'Technical and Business Documentation',
      description: 'The complete Gold Paper is hosted on the dedicated documentation canister for optimized access and reading.',
      redirecting: 'Redirecting to documentation canister...',
      button: 'Access Gold Paper',
      note: 'Note: Documentation is served from a dedicated canister (read-only) to ensure performance and availability.',
    },
  };

  const t = content[language];

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = DOCS_BASE_URL;
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gold-500 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-black/50 border-gold-500/30 glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center">
              <FileText className="w-12 h-12 text-gold-500" />
            </div>
          </div>
          <CardTitle className="text-4xl font-serif text-gold-400 mb-4">
            {t.title}
          </CardTitle>
          <p className="text-xl text-gold-300">
            {t.subtitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gold-300 leading-relaxed">
            {t.description}
          </p>

          <div className="py-4">
            <div className="animate-pulse text-gold-400 mb-4">
              {t.redirecting}
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => window.location.href = DOCS_BASE_URL}
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold"
          >
            {t.button}
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>

          <div className="pt-6 border-t border-gold-500/20">
            <p className="text-sm text-gold-300/70 italic">
              {t.note}
            </p>
            <p className="text-xs text-gold-300/50 mt-2 font-mono">
              {DOCS_BASE_URL}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
