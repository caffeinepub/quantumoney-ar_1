import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import SpaceBackground from './space/SpaceBackground';
import CookieConsentBanner from './CookieConsentBanner';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SpaceBackground />
      <Header />
      <main className="flex-1 relative z-10 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <CookieConsentBanner />
    </div>
  );
}
