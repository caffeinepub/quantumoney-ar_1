import { Mail } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';

export default function TermsOfServicePage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-8">
          <div className="space-y-3 text-center">
            <PageTitle>Terms of Service</PageTitle>
            <p className="text-muted-foreground text-sm">
              Last Updated: February 10, 2026 | Version 1.0
            </p>
          </div>

          <div className="glass-card border-primary/30 rounded-xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Introdução</h2>
              <p>
                Estes Termos regem o uso do site Quantumoney.app. Ao acessar ou usar o site, você concorda em seguir todas as regras, responsabilidades e diretrizes aqui descritas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Elegibilidade</h2>
              <p>
                Você deve atender aos requisitos mínimos de idade da sua região. Ao usar o site, você confirma que todas as informações de registro estão corretas e atualizadas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Contas de Usuário</h2>
              <p>
                Você é responsável por manter a confidencialidade da sua conta. Qualquer atividade realizada usando sua conta é de sua responsabilidade. A equipe do site pode suspender ou encerrar contas envolvidas em abuso, fraude ou violação destes Termos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Uso Aceitável</h2>
              <p>Usuários não devem:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tentar interromper ou prejudicar o site</li>
                <li>Usar ferramentas automatizadas para coletar dados ou interagir com o site</li>
                <li>Engajar-se em assédio, abuso ou atividades ilegais</li>
                <li>Fazer upload ou distribuir conteúdo nocivo ou malicioso</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Conteúdo do Site</h2>
              <p>
                Todo o conteúdo (gráficos, texto, mecânicas de jogo, moedas, design) é de propriedade ou licenciado pela HTgamers. Usuários não podem copiar, modificar ou redistribuir sem permissão escrita.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Funcionalidades Simuladas</h2>
              <p>
                Mapas, distâncias, elementos AR e recompensas podem operar usando valores simulados ou estimados para fins de gameplay seguro.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Atualizações e Alterações</h2>
              <p>
                O site pode receber atualizações que melhorem segurança, equilíbrio do jogo ou experiência do usuário. Alterações nos Termos entram em vigor quando publicadas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Limitação de Responsabilidade</h2>
              <p>
                O site é fornecido "como está". O desenvolvedor não se responsabiliza por problemas de dispositivo, perda de dados ou interrupções operacionais causadas por uso inadequado ou redes instáveis.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Encerramento</h2>
              <p>
                Podemos suspender ou encerrar o acesso por violações dos Termos, uso indevido da conta ou comportamento que impacte a comunidade.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Segurança de AR e Localização</h2>
              <p>
                Sempre esteja atento ao ambiente ao usar recursos AR. Não jogue enquanto dirige ou opera máquinas. Não invada propriedades privadas. Jogue em locais públicos seguros.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Propriedade Intelectual</h2>
              <p>
                Todos os conteúdos, marcas, logos e propriedade intelectual são de HTgamers ou licenciados. Você recebe licença limitada, não exclusiva e não transferível para uso pessoal e não comercial.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Serviços de Terceiros</h2>
              <p>
                O site integra serviços de terceiros, incluindo ICP e Internet Identity. Não nos responsabilizamos por disponibilidade, funcionalidade ou segurança destes serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Avisos Legais</h2>
              <p>
                O site é fornecido "como está" sem garantias. Todas as garantias, expressas ou implícitas, incluindo comercialização e adequação, são desconsideradas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Lei Aplicável</h2>
              <p>
                Estes Termos são regidos pelas leis da jurisdição do desenvolvedor. Disputas devem ser resolvidas nos tribunais competentes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. O uso contínuo do site após alterações constitui aceitação.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Separabilidade</h2>
              <p>
                Se qualquer disposição for considerada inexequível, as demais permanecem em vigor.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Contato</h2>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:helpdesk@quantumoney.net" 
                  className="text-primary hover:underline font-medium"
                >
                  helpdesk@quantumoney.net
                </a>
              </p>
            </section>

            <div className="pt-8 border-t border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">
                © 2026 Quantumoney.app — Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
