import { BookOpen, AlertTriangle, Scale } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

export default function ExplanatorySection() {
  return (
    <div className="border border-yellow-400/40 bg-black/30 backdrop-blur-md rounded-sm p-6">
      <h2 className="text-yellow-400 font-cinzel font-bold text-lg mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" /> Transparência & Documentação
      </h2>

      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="what-is-qmy" className="border border-yellow-400/20 rounded-sm px-4">
          <AccordionTrigger className="text-yellow-400 font-bold text-sm hover:no-underline">
            O que é o QMY?
          </AccordionTrigger>
          <AccordionContent className="text-yellow-400/70 text-xs leading-relaxed space-y-2">
            <p>
              QMY (Quantumoney) é um token conceptual desenvolvido pela HTgamers no âmbito do projeto
              educativo e de gamificação Quantumoney. O QMY é utilizado exclusivamente dentro do
              ecossistema de jogo AR (Realidade Aumentada) e não representa qualquer ativo financeiro real.
            </p>
            <p>
              O token opera na blockchain Internet Computer (ICP) e é gerido pelos canisters da Carteira A.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="economic-model" className="border border-yellow-400/20 rounded-sm px-4">
          <AccordionTrigger className="text-yellow-400 font-bold text-sm hover:no-underline">
            Modelo Económico
          </AccordionTrigger>
          <AccordionContent className="text-yellow-400/70 text-xs leading-relaxed space-y-2">
            <p><strong className="text-yellow-400">Supply Total:</strong> 1.000.000.000 QMY (conceptual)</p>
            <p><strong className="text-yellow-400">Bónus de Boas-Vindas:</strong> 1.000 QMY por utilizador (100 desbloqueados + 900 em vesting)</p>
            <p><strong className="text-yellow-400">Mecanismo de Queima:</strong> Tokens são queimados por ações específicas no jogo, reduzindo o supply circulante ao longo do tempo.</p>
            <p><strong className="text-yellow-400">Vesting:</strong> 100 QMY desbloqueados por mês durante 9 meses para novos utilizadores.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="xp-system" className="border border-yellow-400/20 rounded-sm px-4">
          <AccordionTrigger className="text-yellow-400 font-bold text-sm hover:no-underline">
            Sistema de XP
          </AccordionTrigger>
          <AccordionContent className="text-yellow-400/70 text-xs leading-relaxed space-y-2">
            <p><strong className="text-yellow-400">+100 XP</strong> — Bónus de boas-vindas no primeiro login</p>
            <p><strong className="text-yellow-400">+20 XP</strong> — Capturar 1 monstro AR</p>
            <p><strong className="text-yellow-400">+10 XP</strong> — Plantar 1 QMY</p>
            <p><strong className="text-yellow-400">+1 XP</strong> — Partilhar nas redes sociais</p>
            <p><strong className="text-yellow-400">-15 XP</strong> — Desbloquear 1 QMY antecipadamente</p>
            <p>O XP determina o raio de ação do jogador: 1 XP = 1 metro de raio para resgatar moedas.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="lock-unlock" className="border border-yellow-400/20 rounded-sm px-4">
          <AccordionTrigger className="text-yellow-400 font-bold text-sm hover:no-underline">
            Mecânica de Bloqueio/Desbloqueio
          </AccordionTrigger>
          <AccordionContent className="text-yellow-400/70 text-xs leading-relaxed space-y-2">
            <p>Ao plantar uma moeda QMY num local físico, ela fica bloqueada por 30 dias. Durante este período, qualquer jogador próximo pode resgatá-la.</p>
            <p>O desbloqueio antecipado é possível mas penaliza o jogador em -15 XP.</p>
            <p>O vesting mensal desbloqueia automaticamente 100 QMY por mês durante 9 meses.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="legal" className="border border-red-400/30 rounded-sm px-4">
          <AccordionTrigger className="text-red-400 font-bold text-sm hover:no-underline">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Aviso Legal e Riscos
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-yellow-400/60 text-xs leading-relaxed space-y-2">
            <div className="border border-red-400/30 bg-red-400/5 p-3 rounded-sm">
              <p className="text-red-400 font-bold mb-2 flex items-center gap-1">
                <Scale className="w-3 h-3" /> AVISO IMPORTANTE
              </p>
              <p>O QMY é um token conceptual e educativo. NÃO é um produto financeiro, NÃO representa investimento, e NÃO garante qualquer retorno financeiro.</p>
            </div>
            <p>• O projeto Quantumoney é desenvolvido pela HTgamers com sede em Évora, Portugal.</p>
            <p>• Conformidade com GDPR/LGPD: os dados dos utilizadores são tratados de acordo com a legislação europeia de proteção de dados.</p>
            <p>• Conformidade MiCA: o QMY não se enquadra na definição de criptoativo regulado pelo Regulamento MiCA da UE, sendo exclusivamente um token de jogo.</p>
            <p>• Não existe garantia de liquidez, valor de mercado ou conversibilidade do QMY.</p>
            <p>• A HTgamers reserva-se o direito de modificar as regras do jogo e do token a qualquer momento.</p>
            <p>• Para questões legais: <span className="text-yellow-400">helpdesk@htgamers.pt</span></p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
