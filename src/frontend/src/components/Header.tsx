import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Globe, ExternalLink } from 'lucide-react';

// Canister configuration
const DOCS_CANISTER_ID = 'whu4t-kiaaa-aaaah-qsc5q-cai';
const DOCS_BASE_URL = `https://${DOCS_CANISTER_ID}.icp0.io`;

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/home', label: 'Home', external: false },
    { path: '/about', label: t.nav.about, external: false },
    { path: '/tokenomics', label: t.nav.tokenomics, external: false },
    { path: '/ar-distribution', label: t.nav.arDistribution, external: false },
    { path: '/dao', label: t.nav.dao, external: false },
    { path: '/treasury-monetary-policy', label: t.nav.treasury, external: false },
    { path: '/roadmap', label: t.nav.roadmap, external: false },
    { path: '/vesting-deflation', label: t.nav.vesting, external: false },
    { path: '/presale', label: t.nav.presale, external: false },
    { path: '/technical', label: t.nav.technical, external: false },
    { path: '/game-systems', label: t.nav.gameSystems, external: false },
    { path: '/legal', label: t.nav.legal, external: false },
    { path: '/contact', label: t.nav.contact, external: false },
    { path: DOCS_BASE_URL, label: 'Gold Paper', external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
            alt="Quantumoney AR" 
            className="h-10 w-10"
          />
          <span className="text-xl font-serif font-bold text-gold-500">Quantumoney AR</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            item.external ? (
              <a 
                key={item.path} 
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10">
                  {item.label}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </a>
            ) : (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-400 hover:bg-gold-500/10">
                  {item.label}
                </Button>
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === 'pt' ? 'EN' : 'PT'}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-500">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-gold-500/20">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  item.external ? (
                    <a 
                      key={item.path} 
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start text-gold-500 hover:text-gold-400 hover:bg-gold-500/10">
                        {item.label}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  ) : (
                    <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gold-500 hover:text-gold-400 hover:bg-gold-500/10">
                        {item.label}
                      </Button>
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
