import { Map, BarChart3, Globe2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ARDistributionPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Distribuição AR Global',
      subtitle: 'Rede Mundial de 60.000 AR Spots',
      mapTitle: 'Mapa de Distribuição Global',
      statsTitle: 'Estatísticas Regionais',
      regions: [
        { name: 'Ásia', percentage: '40%', spots: '24.000 AR Spots' },
        { name: 'América do Norte', percentage: '20%', spots: '12.000 AR Spots' },
        { name: 'Europa', percentage: '15%', spots: '9.000 AR Spots' },
        { name: 'América Latina', percentage: '10%', spots: '6.000 AR Spots' },
        { name: 'África', percentage: '10%', spots: '6.000 AR Spots' },
        { name: 'Outros', percentage: '5%', spots: '3.000 AR Spots' },
      ],
    },
    en: {
      title: 'AR Global Distribution',
      subtitle: 'Worldwide Network of 60,000 AR Spots',
      mapTitle: 'Global Distribution Map',
      statsTitle: 'Regional Statistics',
      regions: [
        { name: 'Asia', percentage: '40%', spots: '24,000 AR Spots' },
        { name: 'North America', percentage: '20%', spots: '12,000 AR Spots' },
        { name: 'Europe', percentage: '15%', spots: '9,000 AR Spots' },
        { name: 'Latin America', percentage: '10%', spots: '6,000 AR Spots' },
        { name: 'Africa', percentage: '10%', spots: '6,000 AR Spots' },
        { name: 'Others', percentage: '5%', spots: '3,000 AR Spots' },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Globe2 className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Global Map */}
        <div className="mb-16">
          <h3 className="text-3xl font-serif font-bold text-amber-500 mb-8 text-center flex items-center justify-center gap-3">
            <Map className="w-8 h-8" />
            {t.mapTitle}
          </h3>
          <div className="relative group">
            <img
              src="/assets/generated/global-ar-distribution-world-map.dim_1200x800.png"
              alt="Global AR Distribution"
              className="w-full rounded-3xl border border-amber-600/30 shadow-gold transition-all duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Regional Statistics */}
        <div>
          <h3 className="text-3xl font-serif font-bold text-amber-500 mb-8 text-center flex items-center justify-center gap-3">
            <BarChart3 className="w-8 h-8" />
            {t.statsTitle}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.regions.map((region, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105"
              >
                <h4 className="text-2xl font-serif font-bold text-amber-500 mb-4">
                  {region.name}
                </h4>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-200">{region.percentage}</p>
                  <p className="text-lg text-gray-400">{region.spots}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Visual */}
        <div className="mt-16">
          <img
            src="/assets/generated/planisferio-global-distribution.dim_800x600.png"
            alt="Planisphere Distribution"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
        </div>
      </div>
    </section>
  );
}
