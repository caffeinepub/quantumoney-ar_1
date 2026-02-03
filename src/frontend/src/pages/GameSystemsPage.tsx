import { Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GameSystemsPage() {
  const { language } = useLanguage();

  const title = language === 'pt' ? 'Sistemas de Jogo' : 'Game Systems';
  const subtitle = language === 'pt' 
    ? 'Mecânicas AR, Captura de Monstros e Recompensas' 
    : 'AR Mechanics, Monster Capture and Rewards';

  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Gamepad2 className="w-16 h-16 text-amber-500" />
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
                ? 'Sistema de Energia com 100 energia máxima. Sistema XP/Níveis com recompensas progressivas. Captura de 20 monstros crypto únicos. Plantar tokens em localizações GPS reais. Resgatar tokens dentro do raio XP. Limites diários de 3 plantios e 100 resgates.'
                : 'Energy System with 100 max energy. XP/Level System with progressive rewards. Capture 20 unique crypto monsters. Plant tokens at real GPS locations. Rescue tokens within XP radius. Daily limits of 3 plants and 100 rescues.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
