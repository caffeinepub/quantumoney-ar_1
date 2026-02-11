import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Suspense, lazy } from 'react';

const QuantumUniverseScene = lazy(() => import('./quantum/QuantumUniverseScene'));

export default function Layout() {
  return (
    <LanguageProvider>
      {/* 3D Quantum Universe Background */}
      <Suspense fallback={null}>
        <QuantumUniverseScene />
      </Suspense>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
