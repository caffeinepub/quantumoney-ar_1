import { Gamepad2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GameSystemsPage() {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Sistemas de Jogo',
      subtitle: 'Mecânicas AR, Captura de Monstros e Recompensas',
      description: 'Sistema de Energia com 100 energia máxima. Sistema XP/Níveis com recompensas progressivas. Captura de 20 monstros crypto únicos. Plantar tokens em localizações GPS reais. Resgatar tokens dentro do raio XP. Limites diários de 3 plantios e 100 resgates.',
      disclaimer: {
        title: 'Aviso Importante — Jogo AR Separado',
        text: 'As mecânicas de jogo descritas nesta página referem-se exclusivamente à aplicação QuantumoneyAR.app, que é um sistema completamente separado do site institucional Quantumoney.app. Nenhuma sincronização ao vivo existe entre os dois sistemas. Nenhuma representação de jogo, coleta ou saldo confere propriedade de tokens, direitos financeiros ou ativos negociáveis.',
      },
      futureNote: {
        title: 'Nota sobre Sincronização Futura',
        text: 'No futuro, uma vez legalmente permitido e tecnicamente implementado, as unidades QMY representadas no jogo AR são destinadas a refletir as mesmas unidades QMY conceptuais do projeto Quantumoney. Atualmente, nenhuma sincronização existe, nenhum token foi emitido, e os jogadores não possuem tokens.',
      },
    },
    en: {
      title: 'Game Systems',
      subtitle: 'AR Mechanics, Monster Capture and Rewards',
      description: 'Energy System with 100 max energy. XP/Level System with progressive rewards. Capture 20 unique crypto monsters. Plant tokens at real GPS locations. Rescue tokens within XP radius. Daily limits of 3 plants and 100 rescues.',
      disclaimer: {
        title: 'Important Notice — Separate AR Game',
        text: 'The game mechanics described on this page refer exclusively to the QuantumoneyAR.app application, which is a completely separate system from the institutional Quantumoney.app site. No live synchronization exists between the two systems. No game representation, collection, or balance confers token ownership, financial rights, or tradable assets.',
      },
      futureNote: {
        title: 'Note on Future Synchronization',
        text: 'In the future, once legally permitted and technically implemented, QMY units represented in the AR game are intended to reflect the same conceptual QMY units of the Quantumoney project. Currently, no synchronization exists, no tokens have been issued, and players do not own tokens.',
      },
    },
  };

  const t = content[language];

  return (
    <section className="py-32 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block p-6 rounded-full bg-amber-600/20 border-2 border-amber-600 mb-6">
            <Gamepad2 className="w-16 h-16 text-amber-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">
            {t.title}
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Disclaimer Banner */}
        <Card className="mb-8 bg-gradient-to-r from-red-900/30 via-red-800/40 to-red-900/30 border-red-500/50 glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <CardTitle className="text-2xl font-serif text-red-400">
                {t.disclaimer.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-300 leading-relaxed text-justify">
              {t.disclaimer.text}
            </p>
          </CardContent>
        </Card>

        <div className="glass-card p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-black/60 border border-amber-600/30 mb-8">
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        {/* Future Synchronization Note */}
        <Card className="bg-gradient-to-r from-blue-900/20 via-blue-800/30 to-blue-900/20 border-blue-500/40 glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-blue-400" />
              <CardTitle className="text-2xl font-serif text-blue-400">
                {t.futureNote.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-blue-300 leading-relaxed text-justify">
              {t.futureNote.text}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
