import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Unlock } from 'lucide-react';
import type { PresalePhase } from '@/lib/qmy/presaleSimData';

interface PresaleUnlockVisualizationProps {
  phases: PresalePhase[];
  vestingMonths: number;
}

export default function PresaleUnlockVisualization({ phases, vestingMonths }: PresaleUnlockVisualizationProps) {
  const totalAllocation = phases.reduce((sum, phase) => sum + phase.allocation, 0);
  const monthlyUnlock = totalAllocation / vestingMonths;

  const months = Array.from({ length: vestingMonths }, (_, i) => i + 1);

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3">
          <Unlock className="w-6 h-6" />
          Token Unlock Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Monthly Unlock</span>
            <span className="text-primary font-bold">{monthlyUnlock.toLocaleString()} QMY</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Vesting Period</span>
            <span className="text-primary font-bold">{vestingMonths} months</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h4 className="text-primary font-semibold">Timeline</h4>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-4">
              {months.map((month) => {
                const unlockedSoFar = monthlyUnlock * month;
                const percentageUnlocked = (unlockedSoFar / totalAllocation) * 100;

                return (
                  <div key={month} className="relative pl-12">
                    <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <div className="p-3 bg-background/50 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-primary font-semibold">Month {month}</span>
                        <span className="text-sm text-muted-foreground">
                          {percentageUnlocked.toFixed(1)}% unlocked
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentageUnlocked}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
