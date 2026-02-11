import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Wallet, Repeat, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginButton from './LoginButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card-elevated border-b border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png"
              alt="Quantumoney AR"
              className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-serif font-bold text-primary hidden md:block transition-colors duration-300 group-hover:text-primary/80">
              Quantumoney AR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
            >
              Home
            </Link>
            <Link
              to="/qmy-token"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
            >
              <Coins className="w-4 h-4" />
              QMY Token
            </Link>
            <Link
              to="/wallet"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Wallet
            </Link>
            <Link
              to="/swap"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
            >
              <Repeat className="w-4 h-4" />
              Swap
            </Link>
            <div className="ml-2">
              <LoginButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-primary/80 transition-colors duration-200 rounded-lg hover:bg-primary/5"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
              >
                Home
              </Link>
              <Link
                to="/qmy-token"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                QMY Token
              </Link>
              <Link
                to="/wallet"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                Wallet
              </Link>
              <Link
                to="/swap"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5 flex items-center gap-2"
              >
                <Repeat className="w-4 h-4" />
                Swap
              </Link>
              <div className="pt-4 px-4">
                <LoginButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
