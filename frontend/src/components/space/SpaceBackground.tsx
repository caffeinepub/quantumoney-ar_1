import React, { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Comet {
  id: number;
  top: number;
  duration: number;
  delay: number;
}

interface Meteorite {
  id: number;
  top: number;
  duration: number;
  delay: number;
}

export default function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  const comets = useMemo<Comet[]>(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: Math.random() * 60,
      duration: Math.random() * 6 + 6,
      delay: i * 4 + Math.random() * 3,
    }));
  }, []);

  const meteorites = useMemo<Meteorite[]>(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: Math.random() * 80,
      duration: Math.random() * 3 + 3,
      delay: i * 2.5 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="space-bg" aria-hidden="true">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Planet */}
      <div
        className="planet"
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle at 35% 35%, oklch(0.55 0.12 280), oklch(0.20 0.08 280))',
          boxShadow: '0 0 30px oklch(0.55 0.12 280 / 0.4), inset -10px -10px 20px oklch(0.10 0.05 280 / 0.6)',
          top: '15%',
          right: '10%',
        }}
      />

      {/* Second smaller planet */}
      <div
        style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, oklch(0.65 0.15 60), oklch(0.30 0.10 60))',
          boxShadow: '0 0 20px oklch(0.65 0.15 60 / 0.3)',
          bottom: '20%',
          left: '8%',
          animation: 'planet-orbit 90s linear infinite reverse',
        }}
      />

      {/* Comets */}
      {comets.map(comet => (
        <div
          key={comet.id}
          className="comet"
          style={{
            top: `${comet.top}%`,
            '--duration': `${comet.duration}s`,
            '--delay': `${comet.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Meteorites */}
      {meteorites.map(met => (
        <div
          key={met.id}
          className="meteorite"
          style={{
            top: `${met.top}%`,
            '--duration': `${met.duration}s`,
            '--delay': `${met.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
