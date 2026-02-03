import { Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TechnicalPage() {
  const { language } = useLanguage();

  const title = language === 'pt' ? 'Arquitetura Técnica' : 'Technical Architecture';
  const subtitle = language === 'pt' 
    ? 'Construído na Internet Computer com Motoko' 
    : 'Built on Internet Computer with Motoko';

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

        <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {language === 'pt' 
                ? 'Sistema construído na Internet Computer Protocol (ICP) com canisters Motoko. Backend com autenticação Internet Identity, gestão de estado, integração GPS para AR Spots, e sistema de votação DAO on-chain. Frontend em React + TypeScript com React Query, Leaflet para mapas, e integração de câmera AR.'
                : 'System built on Internet Computer Protocol (ICP) with Motoko canisters. Backend with Internet Identity authentication, state management, GPS integration for AR Spots, and on-chain DAO voting system. Frontend in React + TypeScript with React Query, Leaflet for maps, and AR camera integration.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
