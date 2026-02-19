import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsentBanner from './CookieConsentBanner';

const QuantumUniverseScene = lazy(() => import('./quantum/QuantumUniverseScene'));

export default function Layout() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden">
      <Suspense fallback={null}>
        <QuantumUniverseScene />
      </Suspense>
      
      <Header />
      
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      
      <Footer />
      
      <CookieConsentBanner />
    </div>
  );
}
