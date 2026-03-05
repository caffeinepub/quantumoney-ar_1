import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import WelcomeBonusBanner from './WelcomeBonusBanner';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { showWelcomeBonus, welcomeBonusQmy, welcomeBonusXp, dismissWelcomeBonus } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-20">
        {children}
      </main>
      <Footer />
      <BottomNav />
      {showWelcomeBonus && (
        <WelcomeBonusBanner
          qmy={welcomeBonusQmy}
          xp={welcomeBonusXp}
          onClose={dismissWelcomeBonus}
        />
      )}
    </div>
  );
}
