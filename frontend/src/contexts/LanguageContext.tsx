import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: string;
}

const pt: Translations = {
  home: 'Início',
  map: 'Mapa',
  profile: 'Perfil',
  login: 'Entrar',
  logout: 'Sair',
  loggingIn: 'A entrar...',
  welcome: 'Bem-vindo ao Quantumoney',
  tagline: 'Captura moedas QMY no mundo real',
  playNow: 'Jogar Agora',
  viewMap: 'Ver Mapa',
  features: 'Funcionalidades',
  captureCoins: 'Captura Moedas',
  captureCoinsDesc: 'Encontra e captura moedas QMY distribuídas pelo mundo real.',
  earnXP: 'Ganha XP',
  earnXPDesc: 'Acumula experiência ao capturar moedas e sobe de nível.',
  wallet: 'Carteira',
  walletDesc: 'Gere os teus saldos QMY e ICP numa carteira segura.',
  principal: 'Principal ID',
  qmyBalance: 'Saldo QMY',
  icpBalance: 'Saldo ICP',
  xpCurrent: 'XP Atual',
  level: 'Nível',
  history: 'Histórico',
  noHistory: 'Sem capturas ainda.',
  loginRequired: 'Precisas de fazer login para aceder a esta página.',
  loginToPlay: 'Entrar para Jogar',
  loading: 'A carregar...',
  error: 'Erro',
  tooFar: 'Estás demasiado longe para capturar esta moeda!',
  captured: 'Moeda capturada com sucesso!',
  coinMarker: 'Moeda QMY',
  yourLocation: 'A tua localização',
  mapTitle: 'Mapa de Moedas',
  mapSubtitle: 'Encontra e captura moedas QMY perto de ti',
  welcomeBonus: 'Bónus de Boas-Vindas!',
  welcomeBonusDesc: 'Recebeste o teu bónus de primeiro login!',
  close: 'Fechar',
  availableTokens: 'Tokens Disponíveis',
  lockedTokens: 'Tokens Bloqueados',
  bonusTokens: 'Tokens Bónus',
  date: 'Data',
  amount: 'Quantidade',
  xpGained: 'XP Ganho',
  captureHistory: 'Histórico de Capturas',
};

const en: Translations = {
  home: 'Home',
  map: 'Map',
  profile: 'Profile',
  login: 'Login',
  logout: 'Logout',
  loggingIn: 'Logging in...',
  welcome: 'Welcome to Quantumoney',
  tagline: 'Capture QMY coins in the real world',
  playNow: 'Play Now',
  viewMap: 'View Map',
  features: 'Features',
  captureCoins: 'Capture Coins',
  captureCoinsDesc: 'Find and capture QMY coins distributed across the real world.',
  earnXP: 'Earn XP',
  earnXPDesc: 'Accumulate experience by capturing coins and level up.',
  wallet: 'Wallet',
  walletDesc: 'Manage your QMY and ICP balances in a secure wallet.',
  principal: 'Principal ID',
  qmyBalance: 'QMY Balance',
  icpBalance: 'ICP Balance',
  xpCurrent: 'Current XP',
  level: 'Level',
  history: 'History',
  noHistory: 'No captures yet.',
  loginRequired: 'You need to login to access this page.',
  loginToPlay: 'Login to Play',
  loading: 'Loading...',
  error: 'Error',
  tooFar: 'You are too far to capture this coin!',
  captured: 'Coin captured successfully!',
  coinMarker: 'QMY Coin',
  yourLocation: 'Your location',
  mapTitle: 'Coin Map',
  mapSubtitle: 'Find and capture QMY coins near you',
  welcomeBonus: 'Welcome Bonus!',
  welcomeBonusDesc: 'You received your first login bonus!',
  close: 'Close',
  availableTokens: 'Available Tokens',
  lockedTokens: 'Locked Tokens',
  bonusTokens: 'Bonus Tokens',
  date: 'Date',
  amount: 'Amount',
  xpGained: 'XP Gained',
  captureHistory: 'Capture History',
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('qmy_language');
    return (stored as Language) || 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('qmy_language', lang);
  };

  const t = (key: string): string => {
    const dict = language === 'pt' ? pt : en;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
