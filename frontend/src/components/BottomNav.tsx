import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Map, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const tabs = [
  { path: '/', icon: Home, labelKey: 'home' },
  { path: '/map', icon: Map, labelKey: 'map' },
  { path: '/profile', icon: User, labelKey: 'profile' },
];

export default function BottomNav() {
  const { t } = useLanguage();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gold-700 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ path, icon: Icon, labelKey }) => {
          const isActive = currentPath === path || (path !== '/' && currentPath.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
                isActive ? 'text-gold-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : ''}`} />
              <span className="text-xs font-rajdhani font-semibold uppercase tracking-wide">
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
