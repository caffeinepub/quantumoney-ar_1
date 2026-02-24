import { Lock, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VestingDeflationPage() {
  const { language } = useLanguage();

  const title = language === 'pt' ? 'Vesting & Deflação' : 'Vesting & Deflation';
  const subtitle = language === 'pt' 
    ? 'Liberação Gradual e Mecanismos Deflacionários' 
    : 'Gradual Release and Deflationary Mechanisms';

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <Lock className="w-16 h-16 text-amber-500 mb-6 mx-auto" />
            <h3 className="text-3xl font-serif font-bold text-amber-500 mb-4 text-center">
              {language === 'pt' ? 'Cronograma de Vesting' : 'Vesting Schedule'}
            </h3>
            <img
              src="/assets/generated/vesting-timeline-chart.dim_800x400.png"
              alt="Vesting Timeline"
              className="w-full rounded-2xl border border-amber-600/30 mt-6"
            />
          </div>

          <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30">
            <TrendingDown className="w-16 h-16 text-red-500 mb-6 mx-auto" />
            <h3 className="text-3xl font-serif font-bold text-red-500 mb-4 text-center">
              {language === 'pt' ? 'Mecânica de Deflação' : 'Deflation Mechanics'}
            </h3>
            <img
              src="/assets/generated/burn-progress-dashboard.dim_600x300.png"
              alt="Burn Progress"
              className="w-full rounded-2xl border border-amber-600/30 mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
