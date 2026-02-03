import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Smartphone, Trophy, BarChart3 } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/landing-hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
              alt="Quantumoney AR Logo" 
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_30px_rgba(217,165,32,0.6)]"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-gold-500 drop-shadow-[0_0_20px_rgba(217,165,32,0.5)] animate-fade-in">
            O primeiro jogo do mundo que une AR, metaverso e blockchain em tempo real
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore o universo de Quantumoney AR, ganhe tokens QMY e participe da inovação financeira.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-black font-bold text-lg px-12 py-6 rounded-full shadow-gold transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => window.location.href = 'https://quantumoneyar.app'}
          >
            Criar Conta / Jogar Agora
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16 text-gold-500">
            Recursos Principais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Ganhe QMY */}
            <Card className="glass-card bg-black/40 border-gold-500/30 hover:border-gold-500 transition-all duration-300 hover:scale-105 hover:shadow-gold group">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-all duration-300">
                    <img 
                      src="/assets/generated/earn-qmy-icon.dim_128x128.png" 
                      alt="Ganhe QMY" 
                      className="w-16 h-16"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-gold-500">Ganhe QMY</h3>
                <p className="text-gray-300 leading-relaxed">
                  Capture monstros em realidade aumentada, complete missões e ganhe tokens QMY. 
                  Cada ação no jogo é recompensada com criptomoeda real.
                </p>
              </CardContent>
            </Card>

            {/* Jogue em AR */}
            <Card className="glass-card bg-black/40 border-gold-500/30 hover:border-gold-500 transition-all duration-300 hover:scale-105 hover:shadow-gold group">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-all duration-300">
                    <img 
                      src="/assets/generated/play-ar-icon.dim_128x128.png" 
                      alt="Jogue em AR" 
                      className="w-16 h-16"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-gold-500">Jogue em AR</h3>
                <p className="text-gray-300 leading-relaxed">
                  Experiência imersiva de realidade aumentada. Explore o mundo real enquanto 
                  interage com o metaverso cripto em tempo real.
                </p>
              </CardContent>
            </Card>

            {/* Ranking e Missões */}
            <Card className="glass-card bg-black/40 border-gold-500/30 hover:border-gold-500 transition-all duration-300 hover:scale-105 hover:shadow-gold group">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-all duration-300">
                    <img 
                      src="/assets/generated/ranking-missions-icon.dim_128x128.png" 
                      alt="Ranking e Missões" 
                      className="w-16 h-16"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-gold-500">Ranking e Missões</h3>
                <p className="text-gray-300 leading-relaxed">
                  Compete com jogadores globais, sobe no ranking e desbloqueia missões exclusivas. 
                  Quanto mais joga, mais recompensas ganha.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Callout Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gold-900/10">
        <div className="container mx-auto max-w-5xl">
          <Card className="glass-card bg-black/60 border-gold-500/50 shadow-gold">
            <CardContent className="p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <img 
                      src="/assets/generated/dashboard-icon.dim_128x128.png" 
                      alt="Dashboard" 
                      className="w-20 h-20"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gold-500">
                    Dashboard Personalizado
                  </h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Monitore seus saldos de QMY em tempo real, acompanhe o valor dos seus tokens, 
                    visualize estatísticas de jogo detalhadas e gerencie sua carteira cripto. 
                    Tudo num painel intuitivo e profissional.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      // TODO: Add dashboard routing when implemented
                      console.log('Navigate to dashboard');
                    }}
                  >
                    Aceder ao Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold-500/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <img 
                src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
                alt="Quantumoney AR" 
                className="w-16 h-16 mb-4 mx-auto md:mx-0"
              />
              <p className="text-gray-400 text-sm">
                O futuro da inovação financeira em realidade aumentada.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-gold-500 font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                    Conversão
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                    KYC
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                    FAQ / Suporte
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-gold-500 font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="mailto:helpdesk@quantumoney.net" className="hover:text-gold-500 transition-colors">
                    helpdesk@quantumoney.net
                  </a>
                </li>
                <li>
                  <a href="https://www.quantumoney.net" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                    www.quantumoney.net
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-left">
              <h3 className="text-gold-500 font-bold mb-4">Redes Sociais</h3>
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gold-500/10 hover:bg-gold-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-5 h-5 text-gold-500" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gold-500/10 hover:bg-gold-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <SiX className="w-5 h-5 text-gold-500" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gold-500/10 hover:bg-gold-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5 text-gold-500" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gold-500/10 hover:bg-gold-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="w-5 h-5 text-gold-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gold-500/20 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              by HTgamers © 2026 | 
              <a href="mailto:helpdesk@quantumoney.net" className="text-gold-500 hover:underline ml-1">
                helpdesk@quantumoney.net
              </a> | 
              <a href="https://www.quantumoney.net" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline ml-1">
                www.quantumoney.net
              </a>
            </p>
            <p className="text-gray-500 text-xs">
              Compliant com GDPR e MiCA EU 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
