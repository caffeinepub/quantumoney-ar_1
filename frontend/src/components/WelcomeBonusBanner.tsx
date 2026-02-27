import React, { useEffect, useState } from 'react';
import { Gift, X, Lock, Unlock, Star } from 'lucide-react';

interface WelcomeBonusBannerProps {
  onClose?: () => void;
}

export default function WelcomeBonusBanner({ onClose }: WelcomeBonusBannerProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      onClose?.();
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div
        className="relative w-full max-w-md rounded-2xl border-2 border-yellow-500 p-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0a0500 0%, #1a0e00 100%)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-yellow-600 hover:text-yellow-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
            <Gift className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-cinzel text-2xl font-bold text-yellow-400 mb-1">
          Welcome Bonus!
        </h2>
        <p className="text-yellow-600 text-sm mb-6">
          You've received your first 1,000 QMY tokens
        </p>

        {/* Bonus breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-yellow-900/30 border border-yellow-700/50">
            <Unlock className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-yellow-300 font-bold text-lg">100</p>
            <p className="text-yellow-600 text-xs">QMY Unlocked</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-900/30 border border-yellow-700/50">
            <Lock className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-yellow-300 font-bold text-lg">900</p>
            <p className="text-yellow-600 text-xs">QMY Vesting</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-900/30 border border-yellow-700/50">
            <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-yellow-300 font-bold text-lg">100</p>
            <p className="text-yellow-600 text-xs">XP Bonus</p>
          </div>
        </div>

        <p className="text-yellow-700 text-xs mb-4">
          900 QMY will unlock gradually over 9 months (100 QMY/month)
        </p>

        {/* Auto-close countdown */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-colors"
        >
          Start Playing ({countdown}s)
        </button>
      </div>
    </div>
  );
}
