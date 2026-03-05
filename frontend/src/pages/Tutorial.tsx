import React from 'react';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle } from '../components/Typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { BookOpen, Zap, Star, Map, Coins, Shield, AlertCircle } from 'lucide-react';

const TUTORIAL_SECTIONS = [
  {
    id: 'login',
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Login & Bónus de Boas-Vindas',
    content: `Faça login com Internet Identity para aceder ao jogo. Os primeiros 100,000 utilizadores recebem um bónus de boas-vindas: 100 QMY desbloqueados + 900 QMY em vesting + 100 XP + 100% de energia.`,
  },
  {
    id: 'energy',
    icon: <Zap className="w-5 h-5" />,
    title: 'Sistema de Energia',
    content: `A energia máxima é 100%. Capturar uma moeda consome 5% de energia. Capturar um monstro consome 10%. A energia recupera automaticamente ao longo do tempo. Monstros capturados aumentam a energia máxima.`,
  },
  {
    id: 'xp',
    icon: <Star className="w-5 h-5" />,
    title: 'XP & Níveis',
    content: `Ganhe XP ao capturar moedas (+10 XP) e monstros (+50 XP). Cada nível requer 100 XP adicionais. O nível determina o raio de ação: 1 XP = 1 metro. Partilhar nas redes sociais dá +1 XP.`,
  },
  {
    id: 'map',
    icon: <Map className="w-5 h-5" />,
    title: 'Mapa AR',
    content: `Aceda ao mapa em /ar ou /map. Os marcadores são carregados exclusivamente do canister Logic oficial. Ative o GPS para ver a sua localização e interagir com marcadores próximos (raio de 100 metros).`,
  },
  {
    id: 'coins',
    icon: <Coins className="w-5 h-5" />,
    title: 'Captura de Moedas QMY',
    content: `Aproxime-se de uma moeda QMY no mapa (dentro de 100 metros). Clique em "Capturar QMY" para adicionar a moeda à sua carteira. Algumas moedas ficam bloqueadas em vesting por 30 dias.`,
  },
  {
    id: 'monsters',
    icon: <Shield className="w-5 h-5" />,
    title: 'Captura de Monstros',
    content: `Existem 20 monstros crypto únicos para capturar. Cada monstro tem um bónus de energia único. Aproxime-se de um monstro no mapa e clique em "Capturar Monstro". Completar a coleção dá +100 XP bónus.`,
  },
  {
    id: 'legal',
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Avisos Legais',
    content: `O jogo AR é uma funcionalidade conceptual. Os tokens QMY obtidos no jogo são conceptuais e não têm valor monetário real nesta fase. Conformidade com MiCA e GDPR em desenvolvimento. Não invista dinheiro real.`,
  },
];

export default function Tutorial() {
  return (
    <PageShell>
      <Container size="md">
        <div className="py-12 space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <PageTitle>Tutorial</PageTitle>
            <p className="text-muted-foreground mt-2">Aprenda a jogar Quantumoney AR</p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {TUTORIAL_SECTIONS.map(section => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="luxury-glass-card border border-primary/20 rounded overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-primary">{section.icon}</span>
                    <span className="font-medium text-foreground">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </PageShell>
  );
}
