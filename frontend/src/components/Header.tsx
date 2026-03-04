import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Menu, X, ChevronDown, LogIn, LogOut, User } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Banco Central', href: '/banco-central' },
  {
    label: 'Token',
    children: [
      { label: 'QMY Token', href: '/qmy' },
      { label: 'Tokenomics', href: '/tokenomics' },
      { label: 'Vesting & Deflação', href: '/vesting' },
      { label: 'Presale', href: '/presale' },
      { label: 'Swap', href: '/swap' },
    ],
  },
  {
    label: 'DAO',
    children: [
      { label: 'Propostas', href: '/dao' },
      { label: 'Pré-Propostas', href: '/pre-proposals' },
    ],
  },
  {
    label: 'Docs',
    children: [
      { label: 'Documentação', href: '/docs' },
      { label: 'Gold Paper', href: '/gold-paper' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Técnico', href: '/technical' },
    ],
  },
  {
    label: 'Mais',
    children: [
      { label: 'Mapa', href: '/map' },
      { label: 'Chat', href: '/chat' },
      { label: 'Sobre', href: '/about' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Legal', href: '/legal' },
    ],
  },
];

export default function Header() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (err: any) {
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="w-8 h-8"
          />
          <span className="text-yellow-400 font-cinzel font-bold text-lg tracking-wider hidden sm:block">
            QUANTUMONEY
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="px-3 py-2 text-yellow-400/80 hover:text-yellow-400 text-sm font-rajdhani font-semibold uppercase tracking-wider transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-3 py-2 text-yellow-400/80 hover:text-yellow-400 text-sm font-rajdhani font-semibold uppercase tracking-wider transition-colors">
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-black/95 border border-yellow-500/30 backdrop-blur-md z-50">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block px-4 py-2 text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5 text-sm font-rajdhani transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Profile link */}
          {isAuthenticated && (
            <Link
              to="/perfil"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-yellow-400/40 text-yellow-400/80 hover:text-yellow-400 hover:border-yellow-400/70 text-xs font-rajdhani font-semibold uppercase tracking-wider transition-all"
            >
              <User className="w-3 h-3" />
              Perfil
            </Link>
          )}

          {/* Auth button */}
          <button
            onClick={handleAuth}
            disabled={loginStatus === 'logging-in'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-rajdhani font-bold uppercase tracking-wider transition-all border ${
              isAuthenticated
                ? 'border-yellow-400/30 text-yellow-400/60 hover:border-yellow-400/60 hover:text-yellow-400'
                : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10'
            } disabled:opacity-50`}
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Sair</span>
              </>
            ) : (
              <>
                <LogIn className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {loginStatus === 'logging-in' ? 'A entrar...' : 'Login'}
                </span>
              </>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-yellow-400 p-1"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-t border-yellow-500/20 max-h-[80vh] overflow-y-auto">
          {navItems.map(item => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  to={item.href}
                  className="block px-4 py-3 text-yellow-400/80 hover:text-yellow-400 text-sm font-rajdhani font-semibold uppercase tracking-wider border-b border-yellow-500/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <div className="px-4 py-2 text-yellow-400/50 text-xs font-rajdhani uppercase tracking-widest border-b border-yellow-500/10 bg-yellow-400/5">
                    {item.label}
                  </div>
                  {item.children?.map(child => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block px-6 py-2.5 text-yellow-400/70 hover:text-yellow-400 text-sm font-rajdhani border-b border-yellow-500/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
          {isAuthenticated && (
            <Link
              to="/perfil"
              className="block px-4 py-3 text-yellow-400 font-rajdhani font-bold uppercase tracking-wider border-b border-yellow-500/10"
              onClick={() => setMobileOpen(false)}
            >
              Perfil
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
