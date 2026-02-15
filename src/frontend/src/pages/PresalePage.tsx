import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, TrendingUp, Calendar, Lock, Info, BarChart3 } from 'lucide-react';
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

export default function PresalePage() {
  const presalePhases = [
    { phase: 'Seed', price: '0.001 ICP', allocation: '50M QMY', bonus: '20%', status: 'Completed' },
    { phase: 'Private', price: '0.002 ICP', allocation: '50M QMY', bonus: '15%', status: 'Active' },
    { phase: 'Public', price: '0.003 ICP', allocation: '50M QMY', bonus: '10%', status: 'Upcoming' },
  ];

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<ShoppingCart className="w-12 h-12" />}>
              QMY Presale
            </PageTitle>
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
                  No token sales, payments, or issuance are active. No real purchase logic or transactions 
                  are processed. This page demonstrates the conceptual presale structure for educational purposes only.
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
                <p className="text-3xl font-bold text-primary mb-1">150M</p>
                <p className="text-sm text-muted-foreground">QMY tokens (conceptual)</p>
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
                <p className="text-3xl font-bold text-primary mb-1">3</p>
                <p className="text-sm text-muted-foreground">Investment phases (simulated)</p>
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
                <p className="text-3xl font-bold text-primary mb-1">12</p>
                <p className="text-sm text-muted-foreground">months (conceptual)</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Presale Phases (Simulated)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead className="text-primary">Phase</TableHead>
                    <TableHead className="text-primary">Price</TableHead>
                    <TableHead className="text-primary">Allocation</TableHead>
                    <TableHead className="text-primary">Bonus</TableHead>
                    <TableHead className="text-primary">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {presalePhases.map((row, index) => (
                    <TableRow key={index} className="border-primary/10">
                      <TableCell className="text-primary font-medium">{row.phase}</TableCell>
                      <TableCell className="text-primary">{row.price}</TableCell>
                      <TableCell className="text-primary">{row.allocation}</TableCell>
                      <TableCell className="text-primary">{row.bonus}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            row.status === 'Active' 
                              ? 'border-success/40 text-success' 
                              : 'border-primary/40 text-primary'
                          }
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Presale Progress Chart</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src="/assets/generated/presale-progress-dashboard.dim_700x400.png"
                  alt="Presale Progress"
                  className="w-full rounded-lg border border-primary/20"
                />
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Vesting Timeline</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src="/assets/generated/vesting-timeline-presale.dim_700x300.png"
                  alt="Vesting Timeline"
                  className="w-full rounded-lg border border-primary/20"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Conceptual Acquisition Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-primary text-sm">
                    <strong>Minimum Purchase:</strong> Each phase has a minimum purchase requirement to ensure fair distribution (simulated).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-primary text-sm">
                    <strong>Vesting Schedule:</strong> All presale tokens follow a gradual unlock schedule over 12 months (conceptual).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-primary text-sm">
                    <strong>Early Bird Bonus:</strong> Earlier phases receive better pricing and bonus allocations (informational).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-primary text-sm">
                    <strong>Note:</strong> No real purchases, KYC, or payment processing are active. This is a simulated UI demonstration.
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
