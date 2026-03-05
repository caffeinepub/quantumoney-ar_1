import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Map, Coins, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { t } = useLanguage();
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Coins className="w-16 h-16 text-gold-400 mx-auto mb-4" />
          <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-3">
            {t('welcome')}
          </h1>
          <p className="text-gray-300 font-rajdhani text-lg">{t('tagline')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate({ to: '/map' })}
            className="border border-gold-600 bg-black/50 p-6 text-left hover:border-gold-400 transition-colors group"
          >
            <Map className="w-8 h-8 text-gold-400 mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-gold-400 mb-2 group-hover:text-gold-300">
              {t('map')}
            </h3>
            <p className="text-gray-400 text-sm font-rajdhani">{t('mapSubtitle')}</p>
          </button>

          <button
            onClick={() => navigate({ to: '/profile' })}
            className="border border-gold-600 bg-black/50 p-6 text-left hover:border-gold-400 transition-colors group"
          >
            <Star className="w-8 h-8 text-gold-400 mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-gold-400 mb-2 group-hover:text-gold-300">
              {t('profile')}
            </h3>
            <p className="text-gray-400 text-sm font-rajdhani">{t('walletDesc')}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
