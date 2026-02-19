import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Users, Globe, PieChart, BarChart3, DollarSign, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { useLuxuryBankData } from '@/hooks/useLuxuryBank';
import { formatLargeNumber, generateSparklineData } from '@/lib/bank/luxuryDerivations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BancoCentralPage() {
  const { data, isLoading } = useLuxuryBankData();

  if (isLoading || !data) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading luxury bank dashboard...</p>
          </div>
        </Container>
      </PageShell>
    );
  }

  const sparklineValues = data.timeSeries.map(d => d.circulating);
  const sparklinePath = generateSparklineData(sparklineValues);

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<Building2 className="w-12 h-12" />}>
              QMY Luxury Bank
            </PageTitle>
            <p className="text-muted-foreground text-lg">
              Premium dashboard with comprehensive metrics, charts, and detailed analytics
            </p>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Informational / Simulated
            </Badge>
          </div>

          {/* KPI Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2 text-sm font-medium">
                  <PieChart className="w-4 h-4" />
                  Total Supply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {formatLargeNumber(data.overview.totalSupply)}
                </p>
                <p className="text-xs text-muted-foreground">QMY tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Circulating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {formatLargeNumber(data.overview.circulating)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {((data.overview.circulating / data.overview.totalSupply) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2 text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                  Locked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {formatLargeNumber(data.overview.locked)}
                </p>
                <p className="text-xs text-muted-foreground">Vesting schedule</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary flex items-center gap-2 text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Active Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-1">
                  {data.metrics.activeWallets.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Unique holders</p>
              </CardContent>
            </Card>
          </div>

          {/* Time Series Chart */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <Activity className="w-6 h-6" />
                Supply Evolution (12 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mini sparkline */}
                <div className="h-24 w-full bg-primary/5 rounded-lg p-4">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d={sparklinePath}
                      fill="none"
                      stroke="oklch(0.85 0.15 85)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* Data points */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {data.timeSeries.slice(-6).map((point, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-primary/5">
                      <p className="text-xs text-muted-foreground mb-1">{point.date}</p>
                      <p className="text-sm font-semibold text-primary">{formatLargeNumber(point.circulating)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown Table */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <DollarSign className="w-6 h-6" />
                Distribution Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead className="text-primary">Category</TableHead>
                    <TableHead className="text-primary text-right">Amount</TableHead>
                    <TableHead className="text-primary text-right">Percentage</TableHead>
                    <TableHead className="text-primary">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.categoryBreakdown.map((cat, idx) => (
                    <TableRow key={idx} className="border-primary/10">
                      <TableCell className="font-medium text-muted-foreground">{cat.category}</TableCell>
                      <TableCell className="text-right text-primary font-semibold">
                        {cat.amount.toLocaleString()} QMY
                      </TableCell>
                      <TableCell className="text-right text-primary">{cat.percentage}%</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{cat.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Daily Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2">{data.metrics.dailyTransactions.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Average per day</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Avg Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2">{data.metrics.avgTransactionSize.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">QMY per transaction</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary text-lg">Total Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2">{data.metrics.totalTransfers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">All-time transfers</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Note:</strong> All data displayed is informational and simulated. Metrics are derived from 
                canister query methods and represent the strategic allocation model. Charts and tables are generated 
                using internal UI primitives without external services.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
