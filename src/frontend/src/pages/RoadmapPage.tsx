import { Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RoadmapPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Roadmap 2026',
      subtitle: 'Marcos e Desenvolvimento Progressivo',
      quarters: [
        {
          title: 'Q1 2026',
          items: [
            'Lançamento Beta QMY Luxury Pro',
            'Distribuição AR em 10 países',
            'Integração Internet Identity',
            'Sistema de Captura de Monstros',
          ],
        },
        {
          title: 'Q2 2026',
          items: [
            'Expansão para 50 países',
            'Lançamento DAO Governance',
            'Integração ICPSwap',
            'Sistema de Vesting Automático',
          ],
        },
        {
          title: 'Q3 2026',
          items: [
            'Cobertura global completa',
            'Marketplace NFT',
            'Eventos Metaverso',
            'Parcerias estratégicas',
          ],
        },
        {
          title: 'Q4 2026',
          items: [
            'Lançamento Metaverso 3D',
            'Cross-chain bridges',
            'Expansão mobile nativa',
            'Certificação MiCA EU',
          ],
        },
      ],
    },
    en: {
      title: 'Roadmap 2026',
      subtitle: 'Milestones and Progressive Development',
      quarters: [
        {
          title: 'Q1 2026',
          items: [
            'QMY Luxury Pro Beta Launch',
            'AR Distribution in 10 countries',
            'Internet Identity Integration',
            'Monster Capture System',
          ],
        },
        {
          title: 'Q2 2026',
          items: [
            'Expansion to 50 countries',
            'DAO Governance Launch',
            'ICPSwap Integration',
            'Automatic Vesting System',
          ],
        },
        {
          title: 'Q3 2026',
          items: [
            'Complete global coverage',
            'NFT Marketplace',
            'Metaverse Events',
            'Strategic partnerships',
          ],
        },
        {
          title: 'Q4 2026',
          items: [
            '3D Metaverse Launch',
            'Cross-chain bridges',
            'Native mobile expansion',
            'MiCA EU Certification',
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.quarters.map((quarter, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 backdrop-blur-md hover:border-amber-500/60 transition-all duration-500 hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-amber-600/20 flex items-center justify-center mb-6 mx-auto">
                <Calendar className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-500 mb-6 text-center">
                {quarter.title}
              </h3>
              <ul className="space-y-3">
                {quarter.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <img
            src="/assets/generated/roadmap-timeline-2026.dim_1000x600.png"
            alt="Roadmap Timeline"
            className="w-full rounded-3xl border border-amber-600/30 shadow-gold"
          />
        </div>
      </div>
    </section>
  );
}
