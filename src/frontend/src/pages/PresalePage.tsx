import { DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PresalePage() {
  const { language } = useLanguage();

  const title = language === 'pt' ? 'Estrutura de Pré-venda' : 'Presale Structure';
  const subtitle = language === 'pt' 
    ? 'Três Fases de Investimento com Bônus Progressivos' 
    : 'Three Investment Phases with Progressive Bonuses';

  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <DollarSign className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="space-y-8">
          <img
            src="/assets/generated/presale-phases-chart.dim_700x350.png"
            alt="Presale Phases"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
          <img
            src="/assets/generated/presale-progress-dashboard.dim_700x400.png"
            alt="Presale Progress"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
        </div>
      </div>
    </section>
  );
}
