import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, TrendingUp, Calendar, Lock, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { getPresaleData } from '@/lib/qmy/presaleSimData';
import PresaleLotsExplorer from '@/components/presale/PresaleLotsExplorer';
import PresaleUnlockVisualization from '@/components/presale/PresaleUnlockVisualization';

export default function PresalePage() {
  const data = getPresaleData();

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<ShoppingCart className="w-12 h-12" />}>
              QMY Presale
            </PageTitle>
            <p className="text-muted-foreground text-lg">
              Explore presale phases, token allocation, and unlock schedule
            </p>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Informational / Simulated
            </Badge>
          </div>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  <strong>Important:</strong> All presale information is informational and simulated. 
                  No token sales, payments, or issuance are active. This page demonstrates the conceptual 
                  presale structure for educational purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  Total Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {data.totalAllocation.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">QMY tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Phases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {data.phases.length}
                </p>
                <p className="text-sm text-muted-foreground">Investment phases</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <Lock className="w-5 h-5" />
                  Vesting Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {data.vestingMonths}
                </p>
                <p className="text-sm text-muted-foreground">months</p>
              </CardContent>
            </Card>
          </div>

          <PresaleLotsExplorer phases={data.phases} />

          <PresaleUnlockVisualization phases={data.phases} vestingMonths={data.vestingMonths} />

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Acquisition Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-primary">Minimum Purchase:</strong> Each phase has a minimum purchase requirement to ensure fair distribution.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-primary">Vesting Schedule:</strong> All presale tokens follow a gradual unlock schedule over {data.vestingMonths} months.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-primary">Early Bird Bonus:</strong> Earlier phases receive better pricing and bonus allocations.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-primary">KYC Required:</strong> All participants must complete identity verification before purchase.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
