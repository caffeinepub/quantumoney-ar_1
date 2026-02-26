import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Perfil', path: '/profile' },
  { label: 'Mapa', path: '/map' },
  { label: 'Banco Central', path: '/central-bank' },
  {
    label: 'Token',
    children: [
      { label: 'QMY Token', path: '/qmy-token' },
      { label: 'Pré-venda', path: '/presale' },
      { label: 'Swap', path: '/swap' },
      { label: 'Vesting & Deflação', path: '/vesting-deflation' },
    ],
  },
  {
    label: 'DAO',
    children: [
      { label: 'Propostas', path: '/dao' },
      { label: 'Nova Proposta', path: '/dao/new' },
      { label: 'Pré-proposta', path: '/pre-proposals' },
    ],
  },
  {
    label: 'Docs',
    children: [
      { label: 'Documentação', path: '/docs' },
      { label: 'Gold Paper', path: '/gold-paper' },
      { label: 'Técnico', path: '/technical' },
    ],
  },
  {
    label: 'Mais',
    children: [
      { label: 'Chat', path: '/chat' },
      { label: 'Contacto', path: '/contact' },
      { label: 'Legal', path: '/legal' },
      { label: 'Termos', path: '/terms' },
      { label: 'Privacidade', path: '/privacy' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-400/30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/generated/quantumoney-logo-transparent.dim_200x200.png"
            alt="Quantumoney"
            className="h-8 w-8 object-contain"
          />
          <span className="text-yellow-400 font-bold text-lg tracking-wider hidden sm:block">
            QUANTUMONEY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  onClick={() => handleDropdown(item.label)}
                  onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                  className="flex items-center gap-1 px-3 py-2 text-yellow-400/80 hover:text-yellow-400 text-sm transition-colors rounded-lg hover:bg-yellow-400/10"
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-black/95 border border-yellow-400/30 rounded-xl shadow-xl min-w-[160px] py-1 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-400/10 text-sm transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                className="px-3 py-2 text-yellow-400/80 hover:text-yellow-400 text-sm transition-colors rounded-lg hover:bg-yellow-400/10"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Auth Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className="hidden sm:block px-4 py-1.5 text-sm font-medium border border-yellow-400/40 text-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? 'A entrar...' : isAuthenticated ? 'Sair' : 'Entrar'}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-yellow-400/70 hover:text-yellow-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-yellow-400/20 bg-black/95 backdrop-blur-md max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col py-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => handleDropdown(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-yellow-400/80 hover:text-yellow-400 text-sm border-b border-yellow-400/10"
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="bg-black/60">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-8 py-2.5 text-yellow-400/70 hover:text-yellow-400 text-sm border-b border-yellow-400/5"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path!}
                  className="block px-4 py-3 text-yellow-400/80 hover:text-yellow-400 text-sm border-b border-yellow-400/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="px-4 py-3 border-t border-yellow-400/10 mt-1">
              <button
                onClick={() => { handleAuth(); setMobileOpen(false); }}
                disabled={isLoggingIn}
                className="w-full px-4 py-2 text-sm font-medium border border-yellow-400/40 text-yellow-400 rounded-md hover:bg-yellow-400/10 transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? 'A entrar...' : isAuthenticated ? 'Sair' : 'Entrar'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
