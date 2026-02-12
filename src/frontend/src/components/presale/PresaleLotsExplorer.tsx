import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Gift, ShoppingBag } from 'lucide-react';
import type { PresalePhase } from '@/lib/qmy/presaleSimData';

interface PresaleLotsExplorerProps {
  phases: PresalePhase[];
}

export default function PresaleLotsExplorer({ phases }: PresaleLotsExplorerProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>(phases[0]?.id || '');

  const currentPhase = phases.find((p) => p.id === selectedPhase);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/40 text-green-500';
      case 'active':
        return 'border-primary/40 text-primary';
      case 'upcoming':
        return 'border-muted-foreground/40 text-muted-foreground';
      default:
        return 'border-primary/40 text-primary';
    }
  };

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary">Presale Phases Explorer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {phases.map((phase) => (
            <Button
              key={phase.id}
              variant={selectedPhase === phase.id ? 'default' : 'outline'}
              onClick={() => setSelectedPhase(phase.id)}
              className={selectedPhase === phase.id ? 'bg-primary text-primary-foreground' : 'border-primary/40 text-primary'}
            >
              {phase.name}
            </Button>
          ))}
        </div>

        {currentPhase && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">{currentPhase.name}</h3>
              <Badge variant="outline" className={getStatusColor(currentPhase.status)}>
                {currentPhase.status.charAt(0).toUpperCase() + currentPhase.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Allocation</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {currentPhase.allocation.toLocaleString()} QMY
                </p>
              </div>

              <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Price per Token</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ${currentPhase.pricePerToken.toFixed(3)}
                </p>
              </div>

              <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Bonus</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {currentPhase.bonus}%
                </p>
              </div>

              <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Min. Purchase</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {currentPhase.minPurchase.toLocaleString()} QMY
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
