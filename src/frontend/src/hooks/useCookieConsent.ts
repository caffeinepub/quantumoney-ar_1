import { useState, useEffect } from 'react';

const CONSENT_KEY = 'quantumoney_cookie_consent';

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    setHasConsent(stored === 'true');
  }, []);

  const giveConsent = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setHasConsent(true);
  };

  const revokeConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setHasConsent(false);
  };

  return {
    hasConsent,
    giveConsent,
    revokeConsent,
  };
}
