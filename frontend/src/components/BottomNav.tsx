import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, Map, Gamepad2, User, MessageCircle, Landmark, Vote } from 'lucide-react';

interface NavTab {
  path: string;
  icon: React.ReactNode;
  label: string;
}

export default function BottomNav() {
  const { t } = useLanguage();
  // useLocation may not be available in all router versions; use window.location as fallback
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const tabs: NavTab[] = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/map', icon: <Map className="w-5 h-5" />, label: t('nav.map') || 'Mapa' },
    { path: '/ar', icon: <Gamepad2 className="w-5 h-5" />, label: 'AR' },
    { path: '/perfil', icon: <User className="w-5 h-5" />, label: t('nav.profile') || 'Perfil' },
    { path: '/dao', icon: <Vote className="w-5 h-5" />, label: 'DAO' },
    { path: '/central-bank', icon: <Landmark className="w-5 h-5" />, label: 'Banco' },
    { path: '/chat', icon: <MessageCircle className="w-5 h-5" />, label: 'Chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-primary/20 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-stretch">
        {tabs.map(tab => {
          const isActive = currentPath === tab.path || (tab.path !== '/' && currentPath.startsWith(tab.path));
          return (
            <Link
              key={tab.path}
              to={tab.path as any}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors min-w-0 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className={isActive ? 'text-primary' : ''}>{tab.icon}</span>
              <span className="truncate w-full text-center leading-tight" style={{ fontSize: '9px' }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
