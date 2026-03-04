import React, { useEffect, useRef } from 'react';
import SpaceBackground from '../components/space/SpaceBackground';
import FloatingQMYCoins from '../components/three/FloatingQMYCoins';

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Auto-scroll so the main title is visible on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden flex flex-col">
      {/* Animated space background */}
      <SpaceBackground />

      {/* 3D floating QMY coins layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 15 }}>
        <FloatingQMYCoins />
      </div>

      {/* Pre-hero spacer — allows scroll-into-view to work */}
      <div className="relative z-20 flex items-center justify-center" style={{ minHeight: '45vh' }}>
        <div className="text-center px-4">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="w-20 h-20 mx-auto opacity-60 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
          />
          <p className="mt-4 text-yellow-400/50 text-xs font-rajdhani tracking-[0.4em] uppercase">
            Scroll para descobrir
          </p>
          {/* Animated chevron */}
          <div className="mt-3 flex justify-center">
            <svg
              className="w-6 h-6 text-yellow-400/40 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: '100vh' }}>

        {/* Luxury divider line */}
        <div className="luxury-divider mb-10" />

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-5 font-cinzel tracking-widest luxury-title-glow"
          style={{ scrollMarginTop: '80px' }}
        >
          Bem-vindo ao mundo
          <br />
          <span className="text-5xl md:text-7xl lg:text-8xl luxury-gold-shimmer">
            Quantumoney
          </span>
        </h1>

        <p className="text-yellow-300/75 text-lg md:text-xl mb-3 max-w-2xl font-rajdhani tracking-wide">
          A plataforma descentralizada de tokens QMY no Internet Computer Protocol
        </p>

        {/* Luxury subtitle accent */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/60" />
          <span className="text-yellow-400/60 text-xs font-rajdhani tracking-[0.5em] uppercase">
            Luxury Digital Assets
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/60" />
        </div>

        {/* CTA Button */}
        <a
          href="https://quantumoneyar.app"
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-cta-btn inline-flex items-center gap-3 px-10 py-4 font-bold text-lg font-rajdhani tracking-widest uppercase mb-16"
        >
          <span>Entrar no QuantumoneyAR</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-14">
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
            <div key={feature.title} className="luxury-glass-card p-7 text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2 font-cinzel tracking-wide">
                {feature.title}
              </h3>
              <p className="text-yellow-300/65 text-sm font-rajdhani leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          {[
            { label: 'Supply Total', value: '1,000,000,000 QMY' },
            { label: 'Rede', value: 'Internet Computer' },
            { label: 'Padrão', value: 'ICRC-1' },
          ].map(stat => (
            <div key={stat.label} className="text-center luxury-stat">
              <div className="text-yellow-400 font-bold text-xl font-cinzel tracking-wide">
                {stat.value}
              </div>
              <div className="text-yellow-300/50 text-xs font-rajdhani uppercase tracking-[0.3em] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom luxury divider */}
        <div className="luxury-divider mt-4" />
      </div>
    </div>
  );
}
