import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Map, Coins, Star, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { t } = useLanguage();
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const handlePlay = async () => {
    if (isAuthenticated) {
      navigate({ to: '/map' });
    } else {
      await login();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-[70vh]">
        <div className="mb-6">
          <Coins className="w-20 h-20 text-gold-400 mx-auto mb-4" />
        </div>
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold-400 mb-4">
          Quantumoney
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-rajdhani mb-8 max-w-xl">
          {t('tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePlay}
            disabled={isLoggingIn}
            className="bg-gold-500 text-black px-8 py-3 font-rajdhani font-bold uppercase tracking-wide text-lg hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? t('loggingIn') : t('playNow')}
          </button>
          <button
            onClick={() => navigate({ to: '/map' })}
            className="border border-gold-500 text-gold-400 px-8 py-3 font-rajdhani font-bold uppercase tracking-wide text-lg hover:bg-gold-900/30 transition-colors"
          >
            {t('viewMap')}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-cinzel font-bold text-gold-400 text-center mb-10">
          {t('features')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gold-700 bg-black/50 p-6 text-center">
            <Coins className="w-10 h-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-gold-400 mb-2">{t('captureCoins')}</h3>
            <p className="text-gray-400 text-sm font-rajdhani">{t('captureCoinsDesc')}</p>
          </div>
          <div className="border border-gold-700 bg-black/50 p-6 text-center">
            <Star className="w-10 h-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-gold-400 mb-2">{t('earnXP')}</h3>
            <p className="text-gray-400 text-sm font-rajdhani">{t('earnXPDesc')}</p>
          </div>
          <div className="border border-gold-700 bg-black/50 p-6 text-center">
            <Zap className="w-10 h-10 text-gold-400 mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-gold-400 mb-2">{t('wallet')}</h3>
            <p className="text-gray-400 text-sm font-rajdhani">{t('walletDesc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
