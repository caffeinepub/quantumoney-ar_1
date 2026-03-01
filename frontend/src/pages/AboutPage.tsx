import React from 'react';
import { Link } from '@tanstack/react-router';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Gamepad2, Globe, Shield, Coins } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-12">
          <div className="flex items-start gap-4">
            <div>
              <PageTitle>Sobre o Quantumoney</PageTitle>
              <StatusBadge status="draft" className="mt-2" />
            </div>
          </div>

          {/* Executive Summary */}
          <section className="luxury-glass-card p-8 border border-primary/20">
            <SectionTitle>Resumo Executivo</SectionTitle>
            <BodyText className="mt-4">
              O Quantumoney é um ecossistema unificado construído sobre o Internet Computer Protocol (ICP),
              combinando um token digital (QMY) com um jogo de realidade aumentada (AR) integrado numa única
              plataforma acessível em <strong className="text-primary">quantumoney.app</strong>.
            </BodyText>
            <BodyText className="mt-3">
              Este é um projeto conceptual em fase de desenvolvimento. Todo o conteúdo é informativo e não
              constitui oferta de valores mobiliários ou produto financeiro.
            </BodyText>
          </section>

          {/* Unified Ecosystem */}
          <section>
            <SectionTitle>Ecossistema Unificado</SectionTitle>
            <BodyText className="mt-3 mb-6">
              O Quantumoney opera como uma plataforma única e consolidada. Não existem domínios separados
              ou aplicações paralelas — tudo está integrado em <strong className="text-primary">quantumoney.app</strong>.
            </BodyText>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="luxury-glass-card p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h3 className="font-cinzel text-primary font-bold">Plataforma Institucional</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Informação sobre o token QMY, tokenomics, roadmap, documentação técnica,
                  governança DAO e conformidade legal — tudo em quantumoney.app.
                </p>
              </div>

              <div className="luxury-glass-card p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                  <h3 className="font-cinzel text-primary font-bold">AR Game Integrado</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  O jogo de realidade aumentada está completamente integrado em{' '}
                  <Link to="/ar" className="text-primary hover:underline">quantumoney.app/ar</Link>.
                  Capture moedas QMY e monstros no mundo real usando a mesma identidade e carteira.
                </p>
              </div>

              <div className="luxury-glass-card p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="font-cinzel text-primary font-bold">Identidade Única</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Um único Principal por utilizador via Internet Identity. O mesmo Principal
                  é usado em todas as secções: perfil, carteira, jogo AR e governança.
                </p>
              </div>

              <div className="luxury-glass-card p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Coins className="w-6 h-6 text-primary" />
                  <h3 className="font-cinzel text-primary font-bold">Backend Único</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Todos os dados são armazenados exclusivamente no canister Logic oficial
                  (ckmsk-taaaa-aaaah-atfca-cai). Não existem bases de dados paralelas ou
                  fontes de dados locais.
                </p>
              </div>
            </div>
          </section>

          {/* Canisters */}
          <section className="luxury-glass-card p-8 border border-primary/20">
            <SectionTitle>Canisters Oficiais</SectionTitle>
            <div className="mt-4 space-y-3">
              {[
                { name: 'Logic', id: 'ckmsk-taaaa-aaaah-atfca-cai', desc: 'Backend principal — perfis, jogo, mapa' },
                { name: 'QMY Ledger', id: '5o54h-giaaa-aaaad-aentq-cai', desc: 'Token ICRC-1 QMY' },
                { name: 'Governance', id: 'nemlr-6aaaa-aaaan-q32la-cai', desc: 'DAO e governança' },
                { name: 'Docs', id: 'whu4t-kiaaa-aaaah-qsc5q-cai', desc: 'Documentação on-chain' },
                { name: 'Frontend', id: 'crjop-jyaaa-aaaah-atfaq-cai', desc: 'Interface web' },
              ].map(c => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-primary/10">
                  <span className="font-cinzel text-primary font-bold text-sm w-32 flex-shrink-0">{c.name}</span>
                  <code className="text-xs font-mono text-muted-foreground flex-1">{c.id}</code>
                  <span className="text-xs text-muted-foreground/70">{c.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimers */}
          <section className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <h3 className="font-cinzel text-yellow-400 font-bold mb-3">⚠️ Avisos Legais</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Este projeto está em fase conceptual/desenvolvimento.</li>
              <li>• O token QMY não é um produto financeiro nem um valor mobiliário.</li>
              <li>• Não existe emissão real de tokens nesta fase.</li>
              <li>• Conformidade com MiCA e GDPR em desenvolvimento.</li>
            </ul>
          </section>
        </div>
      </Container>
    </PageShell>
  );
}
