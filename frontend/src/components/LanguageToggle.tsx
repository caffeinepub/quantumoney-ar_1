import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/30 rounded"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe className="w-3.5 h-3.5" />
      <span className="font-mono">{language.toUpperCase()}</span>
    </button>
  );
}
