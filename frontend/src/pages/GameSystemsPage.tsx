import React from 'react';
import { Link } from '@tanstack/react-router';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle, SectionTitle, BodyText } from '../components/Typography';
import StatusBadge from '../components/StatusBadge';
import { Gamepad2, Zap, Star, Shield, Coins, Map } from 'lucide-react';

export default function GameSystemsPage() {
  return (
    <PageShell>
      <Container size="lg">
        <div className="py-12 space-y-12">
          <div>
            <PageTitle>Sistemas de Jogo</PageTitle>
            <StatusBadge status="draft" className="mt-2" />
            <BodyText className="mt-4 text-muted-foreground">
              O jogo AR está completamente integrado em{' '}
              <Link to="/ar" className="text-primary hover:underline font-medium">
                quantumoney.app/ar
              </Link>
              . Não existe aplicação separada — tudo funciona dentro da plataforma unificada Quantumoney.
            </BodyText>
          </div>

          {/* Game Systems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="font-cinzel text-primary font-bold">Sistema de Energia</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Energia máxima: 100%</li>
                <li>• Capturar moeda: -5 energia</li>
                <li>• Capturar monstro: -10 energia</li>
                <li>• Recuperação: automática ao longo do tempo</li>
                <li>• Monstros capturados aumentam energia máxima</li>
              </ul>
            </div>

            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <h3 className="font-cinzel text-primary font-bold">Sistema XP & Níveis</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Capturar moeda: +10 XP</li>
                <li>• Capturar monstro: +50 XP</li>
                <li>• Partilhar nas redes: +1 XP</li>
                <li>• Cada nível requer 100 XP adicionais</li>
                <li>• Nível determina raio de ação (1 XP = 1 metro)</li>
              </ul>
            </div>

            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-400" />
                <h3 className="font-cinzel text-primary font-bold">Monstros Crypto</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 20 monstros únicos baseados em criptomoedas</li>
                <li>• Cada monstro tem bónus de energia único</li>
                <li>• Aparecem em locais específicos no mapa</li>
                <li>• Coleção completa: +100 XP bónus</li>
                <li>• Dados carregados do canister Logic oficial</li>
              </ul>
            </div>

            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="w-6 h-6 text-yellow-400" />
                <h3 className="font-cinzel text-primary font-bold">Moedas QMY</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Moedas aparecem em locais geográficos reais</li>
                <li>• Captura requer proximidade física (GPS)</li>
                <li>• Moedas capturadas vão para a carteira do jogador</li>
                <li>• Sistema de vesting: algumas moedas ficam bloqueadas</li>
                <li>• Saldo idêntico em todas as secções da plataforma</li>
              </ul>
            </div>

            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Map className="w-6 h-6 text-blue-400" />
                <h3 className="font-cinzel text-primary font-bold">Mapa AR</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Mapa global com marcadores em tempo real</li>
                <li>• Coordenadas carregadas exclusivamente do canister Logic</li>
                <li>• Mesmo mapa para todos os utilizadores autenticados</li>
                <li>• GPS necessário para interação com marcadores</li>
                <li>• Acessível em <Link to="/ar" className="text-primary hover:underline">/ar</Link> e <Link to="/map" className="text-primary hover:underline">/map</Link></li>
              </ul>
            </div>

            <div className="luxury-glass-card p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <h3 className="font-cinzel text-primary font-bold">Identidade Única</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Um único Principal por utilizador (Internet Identity)</li>
                <li>• Mesmo saldo QMY em perfil, carteira e jogo AR</li>
                <li>• Mesmo XP e nível em todas as secções</li>
                <li>• Sem perfis duplicados ou carteiras separadas</li>
                <li>• Dados sincronizados via canister Logic oficial</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <Link
              to="/ar"
              className="luxury-cta-btn inline-flex items-center gap-2 px-8 py-4 text-lg font-cinzel font-bold border-2 border-primary text-primary-foreground bg-primary hover:bg-primary/90 transition-all"
            >
              <Gamepad2 className="w-5 h-5" />
              Jogar AR Game Agora
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded p-6">
            <h3 className="font-cinzel text-yellow-400 font-bold mb-3">⚠️ Aviso</h3>
            <p className="text-sm text-muted-foreground">
              O jogo AR é uma funcionalidade conceptual em desenvolvimento. Os tokens QMY obtidos no jogo
              são conceptuais e não têm valor monetário real nesta fase. Conformidade com MiCA e GDPR
              em desenvolvimento.
            </p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
