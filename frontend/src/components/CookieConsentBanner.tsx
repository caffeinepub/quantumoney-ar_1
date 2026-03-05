import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookieConsentBanner() {
  const { hasConsent, giveConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  const handleAccept = () => {
    giveConsent();
    setIsVisible(false);
  };

  if (hasConsent || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-black border border-gold-600 p-4 md:p-6 shadow-gold">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <Cookie className="w-6 h-6 md:w-8 md:h-8 text-gold-400" />
            </div>

            <div className="flex-1 space-y-2 md:space-y-3">
              <h3 className="text-base md:text-lg font-cinzel font-bold text-gold-400">Cookies</h3>
              <p className="text-xs md:text-sm text-gray-400 font-rajdhani leading-relaxed">
                Usamos cookies para melhorar a tua experiência. Ao clicar em "Aceitar", consentes o uso de cookies.
                Sabe mais na nossa{' '}
                <a
                  href="/privacy"
                  className="text-gold-400 hover:underline font-medium"
                >
                  Política de Privacidade
                </a>.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-1 md:pt-2">
                <Button
                  onClick={handleAccept}
                  className="bg-gold-500 hover:bg-gold-400 text-black font-rajdhani font-bold text-sm"
                  size="sm"
                >
                  Aceitar
                </Button>
                <a href="/privacy">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-gold-600 text-gold-400 hover:bg-gold-900/20 text-sm font-rajdhani"
                  >
                    Saber Mais
                  </Button>
                </a>
              </div>
            </div>

            <button
              onClick={handleAccept}
              className="flex-shrink-0 p-1 md:p-2 text-gray-500 hover:text-gold-400 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
