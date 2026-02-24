import { Mail } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-8">
          <div className="space-y-3 text-center">
            <PageTitle>Política de Privacidade</PageTitle>
            <p className="text-muted-foreground text-sm">
              Last Updated: February 10, 2026 | Version 1.0
            </p>
          </div>

          <div className="glass-card border-primary/30 rounded-xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Introdução</h2>
              <p>
                Esta Política explica como Quantumoney.app coleta, usa e protege informações pessoais. Respeitamos a privacidade dos usuários e seguimos padrões legais aplicáveis.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Informações Coletadas</h2>
              <p>Podemos coletar:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informações de conta (email, username)</li>
                <li>Informações básicas do dispositivo (modelo, versão do OS)</li>
                <li>Dados de gameplay (XP, progresso do perfil, itens coletados)</li>
                <li>Localização aproximada (não precisa ser precisa, usada para simulação de gameplay)</li>
              </ul>
              <p className="mt-4">
                Não coletamos localização precisa sem consentimento explícito.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Uso das Informações</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer funcionalidades do site</li>
                <li>Salvar progresso</li>
                <li>Melhorar estabilidade, performance e UX</li>
                <li>Detectar fraudes ou uso indevido</li>
              </ul>
              <p className="mt-4">
                Não vendemos ou compartilhamos dados pessoais com anunciantes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Armazenamento e Proteção de Dados</h2>
              <p>
                Dados armazenados de forma segura com criptografia padrão da indústria. Retemos dados apenas pelo tempo necessário.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Direitos do Usuário</h2>
              <p>Usuários podem solicitar:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acesso aos dados</li>
                <li>Correção de informações imprecisas</li>
                <li>Exclusão da conta e dados relacionados</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Conformidade GDPR / LGPD</h2>
              <p>
                Usuários na UE têm direitos previstos no GDPR; usuários no Brasil têm direitos previstos na LGPD.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Privacidade Infantil</h2>
              <p>
                Não coletamos conscientemente dados de crianças abaixo da idade legal mínima.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Uso de Localização e Câmera</h2>
              <p>
                Localização é processada localmente; câmera é usada apenas para AR e processada localmente, sem armazenamento.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Internet Identity</h2>
              <p>
                Usado para autenticação; não revela informações pessoais, apenas um identificador único (principal).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Serviços de Terceiros</h2>
              <p>
                Podemos usar serviços terceirizados essenciais para análise, relatório de crashes ou estabilidade, seguindo suas próprias políticas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Retenção e Transferência Internacional de Dados</h2>
              <p>
                Retemos dados enquanto a conta estiver ativa. Dados podem ser transferidos para outros países com salvaguardas adequadas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Alterações na Política</h2>
              <p>
                Atualizações entram em vigor quando publicadas; notificações podem ocorrer via site ou email.
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
