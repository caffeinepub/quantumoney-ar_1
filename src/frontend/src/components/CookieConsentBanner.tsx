import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card-elevated border border-primary/30 rounded-xl p-4 md:p-6 shadow-gold-subtle">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <Cookie className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            
            <div className="flex-1 space-y-2 md:space-y-3">
              <h3 className="text-base md:text-lg font-bold text-primary">Cookie Consent</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience, analyze site usage, and provide essential functionality. 
                By clicking "Accept", you consent to our use of cookies. 
                Learn more in our{' '}
                <Link 
                  to="/privacy" 
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-1 md:pt-2">
                <Button
                  onClick={handleAccept}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm"
                  size="sm"
                >
                  Accept Cookies
                </Button>
                <Link to="/privacy">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-primary/40 text-primary hover:bg-primary/10 text-sm"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <button
              onClick={handleAccept}
              className="flex-shrink-0 p-1 md:p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              aria-label="Close"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
