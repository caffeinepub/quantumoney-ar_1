import { Lock, TrendingDown, Calendar, BarChart3, Info, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import LuxuryDashboardSection from '@/components/luxury/LuxuryDashboardSection';

export default function VestingDeflationPage() {
  const vestingSchedule = [
    { month: 'Month 1-6', locked: '650M', available: '0M', percentage: '0%' },
    { month: 'Month 7-12', locked: '550M', available: '100M', percentage: '15%' },
    { month: 'Month 13-24', locked: '350M', available: '300M', percentage: '46%' },
    { month: 'Month 25-36', locked: '150M', available: '500M', percentage: '77%' },
    { month: 'Month 37+', locked: '0M', available: '650M', percentage: '100%' },
  ];

  const burnData = [
    { source: 'Transaction Fees', amount: '5M QMY', percentage: '10%' },
    { source: 'DAO Proposals', amount: '15M QMY', percentage: '30%' },
    { source: 'Protocol Burns', amount: '20M QMY', percentage: '40%' },
    { source: 'Community Events', amount: '10M QMY', percentage: '20%' },
  ];

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<Lock className="w-12 h-12" />}>
              Unlock / Vesting / Burn (Queima)
            </PageTitle>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Simulated Dashboard
            </Badge>
          </div>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  <strong>Simulated Data:</strong> All vesting schedules, unlock timelines, and burn mechanisms 
                  displayed are simulated for demonstration purposes only.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card-elevated border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <Lock className="w-5 h-5" />
                  Total Locked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-1">650M</p>
                <p className="text-sm text-muted-foreground">QMY tokens</p>
                <Progress value={65} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="glass-card-elevated border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Available (Unlocked)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-1">350M</p>
                <p className="text-sm text-muted-foreground">QMY tokens</p>
                <Progress value={35} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="glass-card-elevated border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2 text-lg">
                  <Flame className="w-5 h-5" />
                  Total Burned (Queima)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-1">50M</p>
                <p className="text-sm text-muted-foreground">QMY tokens</p>
                <Progress value={5} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          <LuxuryDashboardSection title="Vesting Schedule (Unlock Timeline)" icon={Lock}>
            <Table>
              <TableHeader>
                <TableRow className="border-primary/20">
                  <TableHead className="text-primary font-semibold">Period</TableHead>
                  <TableHead className="text-primary font-semibold">Locked</TableHead>
                  <TableHead className="text-primary font-semibold">Available (Unlocked)</TableHead>
                  <TableHead className="text-primary font-semibold text-right">Unlocked %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vestingSchedule.map((row, index) => (
                  <TableRow key={index} className="border-primary/10">
                    <TableCell className="text-primary font-medium">{row.month}</TableCell>
                    <TableCell className="text-primary font-bold">{row.locked}</TableCell>
                    <TableCell className="text-primary font-bold">{row.available}</TableCell>
                    <TableCell className="text-primary text-right font-bold">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LuxuryDashboardSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LuxuryDashboardSection title="Vesting Timeline Visualization" icon={BarChart3}>
              <img
                src="/assets/generated/vesting-timeline-chart.dim_800x400.png"
                alt="Vesting Timeline"
                className="w-full rounded-lg border border-primary/20"
              />
            </LuxuryDashboardSection>

            <LuxuryDashboardSection title="Burn Progress Dashboard (Queima)" icon={Flame}>
              <img
                src="/assets/generated/burn-progress-dashboard.dim_600x300.png"
                alt="Burn Progress"
                className="w-full rounded-lg border border-primary/20"
              />
            </LuxuryDashboardSection>
          </div>

          <LuxuryDashboardSection title="Burn Sources (Queima Mechanisms)" icon={TrendingDown}>
            <Table>
              <TableHeader>
                <TableRow className="border-primary/20">
                  <TableHead className="text-primary font-semibold">Source</TableHead>
                  <TableHead className="text-primary font-semibold">Amount Burned</TableHead>
                  <TableHead className="text-primary font-semibold text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {burnData.map((row, index) => (
                  <TableRow key={index} className="border-primary/10">
                    <TableCell className="text-primary font-medium">{row.source}</TableCell>
                    <TableCell className="text-primary font-bold">{row.amount}</TableCell>
                    <TableCell className="text-primary text-right font-bold">{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LuxuryDashboardSection>
        </div>
      </Container>
    </PageShell>
  );
}
