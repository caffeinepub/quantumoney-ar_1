import { Link } from '@tanstack/react-router';
import { X, Home, Wallet, Repeat, Coins, Users, FileText, Building2, MessageSquare, ShoppingCart, BookOpen, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SectionNavigatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SectionNavigator({ isOpen, onClose }: SectionNavigatorProps) {
  if (!isOpen) return null;

  const sections = [
    { path: '/', icon: Home, label: 'Home', available: true },
    { path: '/qmy-token', icon: Coins, label: 'QMY Token', available: true },
    { path: '/wallet', icon: Wallet, label: 'Wallet', available: true },
    { path: '/map', icon: Map, label: 'Map', available: true },
    { path: '/swap', icon: Repeat, label: 'Swap', available: false },
    { path: '/central-bank', icon: Building2, label: 'Central Bank', available: true },
    { path: '/chat', icon: MessageSquare, label: 'Public Chat', available: true },
    { path: '/presale', icon: ShoppingCart, label: 'Presale', available: true },
    { path: '/dao', icon: Users, label: 'DAO', available: true },
    { path: '/pre-proposals', icon: FileText, label: 'Pre-Proposals', available: true },
    { path: '/gold-paper', icon: BookOpen, label: 'Gold Paper', available: true },
    { path: '/docs', icon: FileText, label: 'Documentation', available: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary hover:text-primary/80"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                onClick={onClose}
                className={`glass-card border-primary/30 p-6 rounded-xl transition-all hover:border-primary/60 ${
                  !section.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <Icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">{section.label}</h3>
                </div>
                <Badge
                  variant="outline"
                  className={
                    section.available
                      ? 'border-green-500/40 text-green-500'
                      : 'border-muted-foreground/40 text-muted-foreground'
                  }
                >
                  {section.available ? 'Available' : 'Coming Soon'}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
