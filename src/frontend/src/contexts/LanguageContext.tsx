import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.tokenomics': 'Tokenomics',
    'nav.arDistribution': 'Distribuição AR',
    'nav.dao': 'DAO',
    'nav.treasuryMonetaryPolicy': 'Tesouraria & Política Monetária',
    'nav.roadmap': 'Roteiro',
    'nav.goldPaper': 'Gold Paper',
    'nav.docs': 'Documentação',
    'footer.legal': 'Legal',
    'footer.about': 'Sobre',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.tokenomics': 'Tokenomics',
    'nav.arDistribution': 'AR Distribution',
    'nav.dao': 'DAO',
    'nav.treasuryMonetaryPolicy': 'Treasury & Monetary Policy',
    'nav.roadmap': 'Roadmap',
    'nav.goldPaper': 'Gold Paper',
    'nav.docs': 'Docs',
    'footer.legal': 'Legal',
    'footer.about': 'About',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'pt' || stored === 'en') ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
