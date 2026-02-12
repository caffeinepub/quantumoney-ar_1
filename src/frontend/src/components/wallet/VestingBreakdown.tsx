import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Unlock, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface VestingBreakdownProps {
  available?: bigint;
  locked?: bigint;
  nextUnlock?: {
    amount: bigint;
    date: Date;
  } | null;
}

export default function VestingBreakdown({ available, locked, nextUnlock }: VestingBreakdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!nextUnlock) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = nextUnlock.date.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Unlocking soon...');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [nextUnlock]);

  if (available === undefined && locked === undefined) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Lock className="w-6 h-6" />
            Vesting Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
            <AlertCircle className="w-12 h-12 text-primary/50 mx-auto mb-3" />
            <p className="text-muted-foreground">Vesting information not available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableNum = available ? Number(available) : 0;
  const lockedNum = locked ? Number(locked) : 0;
  const total = availableNum + lockedNum;
  const availablePercentage = total > 0 ? (availableNum / total) * 100 : 0;

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3">
          <Lock className="w-6 h-6" />
          Vesting Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Unlock className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {availableNum.toLocaleString()} QMY
            </p>
          </div>

          <div className="p-4 bg-background/50 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-muted-foreground">Locked</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {lockedNum.toLocaleString()} QMY
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Vesting Progress</span>
            <span className="text-primary font-semibold">{availablePercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${availablePercentage}%` }}
            />
          </div>
        </div>

        {nextUnlock && lockedNum > 0 && (
          <div className="p-4 bg-amber-900/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-400">Next Unlock</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-lg font-bold text-amber-400">
                  {Number(nextUnlock.amount).toLocaleString()} QMY
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Time Remaining</p>
                <p className="text-lg font-bold text-amber-400">{timeRemaining}</p>
              </div>
            </div>
          </div>
        )}

        {lockedNum === 0 && (
          <div className="p-4 bg-green-900/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Unlock className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-400">All tokens unlocked!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
