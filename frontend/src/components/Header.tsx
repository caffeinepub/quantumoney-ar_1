import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from './LoginButton';
import LanguageToggle from './LanguageToggle';
import { Menu, X, ChevronDown, Gamepad2 } from 'lucide-react';

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

export default function Header() {
  const { t } = useLanguage();
  const { identity } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isAuthenticated = !!identity;

  const navItems: NavItem[] = [
    {
      label: t('nav.about') || 'Sobre',
      children: [
        { label: t('nav.about') || 'Sobre', path: '/about' },
        { label: t('nav.tokenomics') || 'Tokenomics', path: '/tokenomics' },
        { label: t('nav.roadmap') || 'Roadmap', path: '/roadmap' },
        { label: t('nav.technical') || 'Técnico', path: '/technical' },
        { label: t('nav.docs') || 'Docs', path: '/docs' },
        { label: 'Gold Paper', path: '/gold-paper' },
      ],
    },
    {
      label: t('nav.game') || 'Jogo',
      children: [
        { label: 'AR Game', path: '/ar' },
        { label: t('nav.map') || 'Mapa', path: '/map' },
        { label: t('nav.collection') || 'Coleção', path: '/colecao' },
        { label: t('nav.gameSystems') || 'Sistemas de Jogo', path: '/game-systems' },
        { label: t('nav.tutorial') || 'Tutorial', path: '/tutorial' },
        { label: 'QTM Rules', path: '/qtm-rules' },
      ],
    },
    {
      label: t('nav.finance') || 'Finanças',
      children: [
        { label: t('nav.wallet') || 'Carteira', path: '/perfil' },
        { label: t('nav.centralBank') || 'Banco Central', path: '/central-bank' },
        { label: 'Vesting', path: '/vesting' },
        { label: t('nav.burn') || 'Queima', path: '/queima' },
        { label: 'Swap', path: '/swap' },
        { label: t('nav.presale') || 'Pré-Venda', path: '/pre-venda' },
      ],
    },
    {
      label: t('nav.governance') || 'Governança',
      children: [
        { label: 'DAO', path: '/dao' },
        { label: t('nav.distribution') || 'Distribuição', path: '/distribuicao' },
        { label: t('nav.arDistribution') || 'Distribuição AR', path: '/ar-distribution' },
      ],
    },
    {
      label: t('nav.legal') || 'Legal',
      children: [
        { label: t('nav.legal') || 'Legal', path: '/legal' },
        { label: 'Termos', path: '/terms' },
        { label: 'Privacidade', path: '/privacy' },
        { label: t('nav.contact') || 'Contacto', path: '/contact' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-primary/20 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="w-8 h-8"
          />
          <span className="font-cinzel text-primary font-bold text-lg hidden sm:block">
            Quantumoney
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded">
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </button>
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-primary/20 rounded-lg shadow-xl z-50 py-1">
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path as any}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.path === '/ar' && <Gamepad2 className="w-3 h-3 text-primary" />}
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isAuthenticated && (
            <Link
              to="/perfil"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded"
            >
              {t('nav.profile') || 'Perfil'}
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <LoginButton showText={false} />
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-primary/20 shadow-xl z-40 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {/* AR Game prominent link */}
            <Link
              to="/ar"
              className="flex items-center gap-2 px-3 py-3 text-primary font-medium bg-primary/10 rounded-lg border border-primary/20 mb-2"
              onClick={() => setMobileOpen(false)}
            >
              <Gamepad2 className="w-5 h-5" />
              AR Game
            </Link>

            {navItems.map(item => (
              <div key={item.label}>
                <p className="px-3 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider mt-2">
                  {item.label}
                </p>
                {item.children?.map(child => (
                  <Link
                    key={child.path}
                    to={child.path as any}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}

            {isAuthenticated && (
              <Link
                to="/perfil"
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.profile') || 'Perfil'}
              </Link>
            )}

            <div className="pt-2 pb-1">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
