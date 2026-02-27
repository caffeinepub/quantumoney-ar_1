import React, { useEffect, useState } from 'react';
import SpaceBackground from '../components/space/SpaceBackground';

type CoinType = 'icp' | 'qmy';

interface FloatingCoin {
  id: number;
  type: CoinType;
}

export default function HomePage() {
  const [coins, setCoins] = useState<FloatingCoin[]>([]);
  const [coinCounter, setCoinCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoinCounter(prev => {
        const newId = prev + 1;
        const coinType: CoinType = newId % 2 === 0 ? 'icp' : 'qmy';
        setCoins(current => [...current, { id: newId, type: coinType }]);
        // Remove coin after animation completes (3.5s)
        setTimeout(() => {
          setCoins(current => current.filter(c => c.id !== newId));
        }, 3500);
        return newId;
      });
    }, 5000);

    // Trigger first coin immediately
    const firstId = 1;
    setCoins([{ id: firstId, type: 'icp' }]);
    setCoinCounter(firstId);
    setTimeout(() => {
      setCoins(current => current.filter(c => c.id !== firstId));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Animated space background */}
      <SpaceBackground />

      {/* Floating coins layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {coins.map(coin => (
          <div
            key={coin.id}
            className="absolute coin-grow-fade"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <img
              src={
                coin.type === 'icp'
                  ? '/assets/generated/icp-coin-gold.dim_128x128.png'
                  : '/assets/generated/qmy-coin-gold.dim_128x128.png'
              }
              alt={coin.type === 'icp' ? 'ICP Coin' : 'QMY Coin'}
              className="w-32 h-32 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="w-24 h-24 mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
          />
        </div>

        {/* Welcome message */}
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 font-cinzel tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
          Bem-vindo ao mundo Quantumoney
        </h1>
        <p className="text-yellow-300/80 text-lg md:text-xl mb-10 max-w-2xl font-rajdhani">
          A plataforma descentralizada de tokens QMY no Internet Computer Protocol
        </p>

        {/* CTA Button */}
        <a
          href="https://quantumoneyar.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-lg rounded-none hover:bg-yellow-400/10 transition-all duration-300 font-rajdhani tracking-widest uppercase shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
        >
          <span>Entrar no QuantumoneyAR</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* Features grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            {
              icon: '🪙',
              title: 'Token QMY',
              desc: 'Token nativo do ecossistema Quantumoney no ICP',
            },
            {
              icon: '🎮',
              title: 'AR Gaming',
              desc: 'Joga em realidade aumentada e ganha QMY',
            },
            {
              icon: '🏛️',
              title: 'DAO Governance',
              desc: 'Participa nas decisões do ecossistema',
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="glass-card p-6 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2 font-cinzel">{feature.title}</h3>
              <p className="text-yellow-300/70 text-sm font-rajdhani">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {[
            { label: 'Supply Total', value: '1,000,000,000 QMY' },
            { label: 'Rede', value: 'Internet Computer' },
            { label: 'Padrão', value: 'ICRC-1' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-yellow-400 font-bold text-xl font-cinzel">{stat.value}</div>
              <div className="text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
