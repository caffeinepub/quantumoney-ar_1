import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import SpaceBackground from '../components/space/SpaceBackground';

// Coin animation: alternates ICP and QMY, grows from center every 5s for 3s
function FloatingCoinAnimation() {
  const [coins, setCoins] = useState<{ id: number; type: 'icp' | 'qmy'; phase: 'grow' | 'fade' }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = counterRef.current++;
      const type: 'icp' | 'qmy' = id % 2 === 0 ? 'icp' : 'qmy';
      setCoins(prev => [...prev, { id, type, phase: 'grow' }]);

      // Remove after 3.2s
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== id));
      }, 3200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="absolute coin-burst"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <img
            src={
              coin.type === 'icp'
                ? '/assets/generated/icp-coin-gold.dim_128x128.png'
                : '/assets/generated/qmy-coin-gold.dim_128x128.png'
            }
            alt={coin.type === 'icp' ? 'ICP Coin' : 'QMY Coin'}
            className="w-24 h-24 drop-shadow-[0_0_24px_rgba(255,215,0,0.9)]"
          />
          <div className="text-center text-qmy-gold font-bold text-sm mt-1 drop-shadow-[0_0_8px_rgba(255,215,0,1)]">
            {coin.type === 'icp' ? 'ICP' : 'QMY'}
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    icon: '🌍',
    title: 'Mapa Global AR',
    desc: 'Encontra moedas QMY e monstros espalhados pelo mundo real usando Realidade Aumentada.',
  },
  {
    icon: '💰',
    title: 'Token QMY',
    desc: 'Ganha, planta e resgata tokens QMY. Cada ação no jogo tem impacto real na tua carteira.',
  },
  {
    icon: '🐉',
    title: 'Captura Monstros',
    desc: 'Coleciona 20 monstros cripto únicos, cada um com bónus de energia e raridade especial.',
  },
  {
    icon: '🏦',
    title: 'Banco Central QMY',
    desc: 'Transparência total: vesting, queimas, distribuição e governança DAO em tempo real.',
  },
  {
    icon: '🔐',
    title: 'Internet Identity',
    desc: 'Login seguro e descentralizado via Internet Computer. Os teus dados são teus.',
  },
  {
    icon: '📱',
    title: 'PWA & AR Nativo',
    desc: 'Instala a app AR no teu telemóvel e joga em modo nativo com câmara e GPS.',
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SpaceBackground />
      <FloatingCoinAnimation />

      {/* Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-16 text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney Logo"
            className="w-24 h-24 drop-shadow-[0_0_32px_rgba(255,215,0,0.8)]"
          />
        </div>

        {/* Welcome message */}
        <p className="text-qmy-gold/80 text-sm uppercase tracking-[0.3em] mb-3 font-rajdhani">
          Bem-vindo ao mundo
        </p>

        <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold text-qmy-gold luxury-title-glow mb-4 leading-tight">
          QUANTUMONEY
        </h1>

        <p className="text-qmy-gold/70 text-lg md:text-xl font-rajdhani mb-2 max-w-2xl">
          Welcome to the Quantumoney World
        </p>

        <p className="text-qmy-gold/60 text-base md:text-lg font-rajdhani mb-10 max-w-xl">
          O primeiro jogo de Realidade Aumentada com tokens QMY no Internet Computer.
          Captura moedas, coleciona monstros e governa o ecossistema.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <a
            href="https://QuantumoneyAR.app"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-cta-btn px-8 py-4 text-base font-bold font-cinzel tracking-widest flex items-center gap-2"
          >
            📱 Instalar Aplicação AR
          </a>
          <Link
            to="/map"
            className="border border-qmy-gold/50 text-qmy-gold px-8 py-4 text-base font-rajdhani tracking-wider hover:bg-qmy-gold/10 transition-colors"
          >
            🗺️ Ver Mapa Global
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          {[
            { label: 'Moedas QMY', value: '1,000,000' },
            { label: 'Monstros', value: '20' },
            { label: 'Países', value: '50+' },
            { label: 'Blockchain', value: 'ICP' },
          ].map(stat => (
            <div key={stat.label} className="luxury-glass-card px-6 py-3 text-center min-w-[100px]">
              <div className="text-qmy-gold font-cinzel font-bold text-xl">{stat.value}</div>
              <div className="text-qmy-gold/60 text-xs font-rajdhani uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="luxury-divider w-full max-w-2xl mb-12" />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
          {features.map(f => (
            <div key={f.title} className="luxury-glass-card p-6 text-left hover:border-qmy-gold/60 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-cinzel text-qmy-gold font-bold text-base mb-2">{f.title}</h3>
              <p className="text-qmy-gold/60 text-sm font-rajdhani leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Install AR App banner */}
        <div className="mt-16 luxury-glass-card p-8 max-w-2xl w-full text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="font-cinzel text-qmy-gold text-2xl font-bold mb-3">
            Joga em Realidade Aumentada
          </h2>
          <p className="text-qmy-gold/70 font-rajdhani mb-6">
            Instala a aplicação QuantumoneyAR.app no teu telemóvel e captura moedas e monstros no mundo real.
            Sincronizado com a tua carteira Quantumoney.
          </p>
          <a
            href="https://QuantumoneyAR.app"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-cta-btn px-10 py-4 text-lg font-bold font-cinzel tracking-widest inline-flex items-center gap-3"
          >
            <span>📲</span>
            <span>Instalar Aplicação AR</span>
          </a>
          <p className="text-qmy-gold/40 text-xs mt-4 font-rajdhani">
            QuantumoneyAR.app — PWA compatível com Android e iOS
          </p>
        </div>
      </section>
    </div>
  );
}
