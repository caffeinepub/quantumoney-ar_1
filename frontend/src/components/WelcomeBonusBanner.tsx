import React from 'react';
import { X, Star, Coins } from 'lucide-react';

interface WelcomeBonusBannerProps {
  qmy: number;
  xp: number;
  onClose: () => void;
}

export default function WelcomeBonusBanner({ qmy, xp, onClose }: WelcomeBonusBannerProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div className="bg-black border-2 border-gold-500 p-8 max-w-sm w-full mx-4 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gold-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          <Coins className="w-16 h-16 text-gold-400" />
        </div>

        <h2 className="text-2xl font-cinzel font-bold text-gold-400 mb-2">
          Bónus de Boas-Vindas!
        </h2>
        <p className="text-gray-300 text-sm font-rajdhani mb-6">
          Recebeste o teu bónus de primeiro login!
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-gold-900/40 border border-gold-600 px-6 py-4">
            <div className="text-3xl font-cinzel font-bold text-gold-400">+{qmy}</div>
            <div className="text-xs text-gray-400 font-rajdhani uppercase tracking-wide mt-1">QMY</div>
          </div>
          <div className="bg-gold-900/40 border border-gold-600 px-6 py-4">
            <div className="text-3xl font-cinzel font-bold text-gold-400">+{xp}</div>
            <div className="text-xs text-gray-400 font-rajdhani uppercase tracking-wide mt-1">XP</div>
          </div>
        </div>

        <p className="text-xs text-gray-500 font-rajdhani mb-6">
          Guardado permanentemente na blockchain.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gold-500 text-black py-3 font-rajdhani font-bold uppercase tracking-wide hover:bg-gold-400 transition-colors"
        >
          Começar a Jogar
        </button>
      </div>
    </div>
  );
}
