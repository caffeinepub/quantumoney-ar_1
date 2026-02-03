import { Outlet } from '@tanstack/react-router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
