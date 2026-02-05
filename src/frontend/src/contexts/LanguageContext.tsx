import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof content.pt;
}

const content = {
  pt: {
    nav: {
      about: 'Sobre',
      tokenomics: 'Tokenomics',
      arDistribution: 'Distribuição AR Global',
      dao: 'Governança DAO',
      roadmap: 'Roadmap',
      vesting: 'Vesting & Deflação',
      presale: 'Estrutura de Pré-venda',
      technical: 'Arquitetura Técnica',
      gameSystems: 'Sistemas de Jogo',
      legal: 'Legal & Atribuição',
      contact: 'Contato',
      treasury: 'Tesouraria & Política Monetária',
    },
    footer: {
      builtBy: 'by HTgamers©',
      year: '2026',
      compliance: 'Conformidade com GDPR da União Europeia e MiCA EU 2025',
      informationalOnly: 'Apenas informativo - Sem funcionalidades cripto operacionais',
    },
  },
  en: {
    nav: {
      about: 'About',
      tokenomics: 'Tokenomics',
      arDistribution: 'AR Global Distribution',
      dao: 'DAO Governance',
      roadmap: 'Roadmap',
      vesting: 'Vesting & Deflation',
      presale: 'Presale Structure',
      technical: 'Technical Architecture',
      gameSystems: 'Game Systems',
      legal: 'Legal & Attribution',
      contact: 'Contact',
      treasury: 'Treasury & Monetary Policy',
    },
    footer: {
      builtBy: 'by HTgamers©',
      year: '2026',
      compliance: 'Compliant with European Union GDPR and MiCA EU 2025',
      informationalOnly: 'Informational only - No operational crypto features',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'pt' || stored === 'en') ? stored : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value = {
    language,
    setLanguage,
    t: content[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
