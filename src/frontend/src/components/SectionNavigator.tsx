import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Coins, 
  Wallet, 
  Repeat, 
  GitBranch, 
  Users, 
  Gamepad2,
  X 
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  available: boolean;
}

const sections: Section[] = [
  { id: 'home', name: 'Home / Quantum Universe', icon: <Home className="w-6 h-6" />, path: '/', available: true },
  { id: 'qmy', name: 'QMY Token', icon: <Coins className="w-6 h-6" />, path: '/qmy-token', available: true },
  { id: 'wallet', name: 'Wallet / Dashboard', icon: <Wallet className="w-6 h-6" />, path: '/wallet', available: true },
  { id: 'swap', name: 'Swap', icon: <Repeat className="w-6 h-6" />, path: '/swap', available: true },
  { id: 'bridge', name: 'Bridge', icon: <GitBranch className="w-6 h-6" />, path: '#', available: false },
  { id: 'dao', name: 'DAO / Governance', icon: <Users className="w-6 h-6" />, path: '/dao', available: false },
  { id: 'game', name: 'Game / AR Experience', icon: <Gamepad2 className="w-6 h-6" />, path: '#', available: false },
];

export default function SectionNavigator({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="glass-card bg-black/90 border-amber-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-amber-500">
              Navigate Quantum Universe
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-amber-500 hover:bg-amber-900/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <div key={section.id}>
                {section.available ? (
                  <Link to={section.path} onClick={onClose}>
                    <Card className="glass-card bg-black/40 border-amber-500/30 hover:border-amber-500 transition-all duration-300 hover:scale-105 cursor-pointer group">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                          <div className="text-amber-500">{section.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                            {section.name}
                          </h3>
                          <p className="text-xs text-green-400">Available</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="glass-card bg-black/40 border-gray-600/30 opacity-60 cursor-not-allowed">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-500/10 flex items-center justify-center">
                        <div className="text-gray-500">{section.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-400">
                          {section.name}
                        </h3>
                        <p className="text-xs text-gray-500">Coming Soon</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-amber-500/20 text-center">
            <p className="text-sm text-gray-400">
              Sections marked as "Coming Soon" are planned for future releases
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
