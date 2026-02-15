import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Wallet, Building2, Users, FileText, Map, Camera } from 'lucide-react';

export default function BottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/central-bank', icon: Building2, label: 'Bank' },
    { path: '/dao', icon: Users, label: 'DAO' },
    { path: '/pre-proposals', icon: FileText, label: 'Proposals' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/ar', icon: Camera, label: 'AR' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-primary/20 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
