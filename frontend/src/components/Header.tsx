import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, isLoggingIn, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: t('home'), path: '/' },
    { label: t('map'), path: '/map' },
    { label: t('profile'), path: '/profile' },
  ];

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gold-500 h-16">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-gold-400 font-cinzel font-bold text-lg">
          <Coins className="w-6 h-6 text-gold-400" />
          <span>Quantumoney</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-gray-300 hover:text-gold-400 transition-colors font-rajdhani font-semibold uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="text-xs text-gold-400 border border-gold-600 px-2 py-1 hover:bg-gold-900 transition-colors font-rajdhani"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>

          <button
            onClick={handleAuth}
            disabled={isLoggingIn}
            className="hidden md:block text-sm bg-gold-500 text-black px-4 py-1.5 font-rajdhani font-bold uppercase tracking-wide hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? t('loggingIn') : isAuthenticated ? t('logout') : t('login')}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gold-400 p-1"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black z-40 flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-gold-400 font-rajdhani font-bold uppercase tracking-wide border-b border-gold-900 pb-3"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { handleAuth(); setMenuOpen(false); }}
            disabled={isLoggingIn}
            className="mt-4 text-sm bg-gold-500 text-black px-4 py-2 font-rajdhani font-bold uppercase tracking-wide hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? t('loggingIn') : isAuthenticated ? t('logout') : t('login')}
          </button>
        </div>
      )}
    </header>
  );
}
