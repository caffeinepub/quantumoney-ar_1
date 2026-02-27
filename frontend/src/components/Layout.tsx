import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsentBanner from './CookieConsentBanner';
import SpaceBackground from './space/SpaceBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Persistent space background */}
      <SpaceBackground />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsentBanner />
      </div>
    </div>
  );
}
