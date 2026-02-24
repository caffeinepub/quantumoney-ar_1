import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYVesting } from '../hooks/useQMYVesting';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wallet, AlertCircle, Copy, Check } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import ReadOnlyBanner from '@/components/ReadOnlyBanner';
import VestingBreakdown from '@/components/wallet/VestingBreakdown';
import QMYTransactionHistory from '@/components/wallet/QMYTransactionHistory';
import SendQMYSimulatedCard from '@/components/wallet/SendQMYSimulatedCard';
import { useSimulatedQMYVesting } from '@/hooks/useSimulatedQMYVesting';

export default function WalletPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);
  const { simulationEnabled, toggleSimulation, available, locked, nextUnlock } = useSimulatedQMYVesting();

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString() || '';

  const qmyQuery = useQMYLedger();
  const icpQuery = useICPLedger();
  const vestingQuery = useQMYVesting();
  const transactionsQuery = useQMYTransactions(20);

  const handleCopyPrincipal = () => {
    navigator.clipboard.writeText(principalId);
    setCopiedPrincipal(true);
    toast.success('Principal ID copied to clipboard');
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };

  if (isInitializing) {
    return (
      <PageShell className="flex items-center justify-center">
        <Container size="sm">
          <Card className="glass-card border-primary/30">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-muted-foreground text-lg">Initializing session...</p>
            </CardContent>
          </Card>
        </Container>
      </PageShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageShell className="flex items-center justify-center">
        <Container size="sm">
          <Card className="glass-card border-primary/30">
            <CardContent className="p-12 text-center space-y-6">
              <AlertCircle className="w-20 h-20 text-primary mx-auto" />
              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-bold text-primary">
                  Authentication Required
                </h2>
                <p className="text-muted-foreground text-lg">
                  Please log in with Internet Identity to access your wallet.
                </p>
              </div>
              <Link to="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold-subtle">
                  Go to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <ReadOnlyBanner />

          <div className="space-y-3">
            <PageTitle icon={<Wallet className="w-12 h-12" />}>
              Wallet Dashboard
            </PageTitle>
            <p className="text-muted-foreground text-lg">View your QMY and ICP balances (read-only)</p>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex-1 min-w-0">
                  <Label className="text-muted-foreground text-sm mb-3 block font-medium">Your Principal ID</Label>
                  <p className="text-primary font-mono text-sm md:text-base break-all select-all">{principalId}</p>
                </div>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleCopyPrincipal}
                  className="border-primary/40 text-primary hover:bg-primary/10 shrink-0"
                >
                  {copiedPrincipal ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-3">
                  <img 
                    src="/assets/generated/qtm-coin-gold-3d-transparent.dim_128x128.png" 
                    alt="QMY" 
                    className="w-10 h-10"
                  />
                  QMY Balance
                  <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                    Read-Only
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {qmyQuery.isLoading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading balance...</p>
                  </div>
                ) : qmyQuery.error ? (
                  <div className="text-center py-12 border border-destructive/20 rounded-xl bg-destructive/5">
                    <AlertCircle className="w-12 h-12 text-destructive/50 mx-auto mb-3" />
                    <p className="text-muted-foreground text-base mb-2">Failed to Load Balance</p>
                    <p className="text-muted-foreground/70 text-sm px-4">
                      {qmyQuery.error.message || 'Unable to fetch QMY balance'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {qmyQuery.data?.formatted || '0.00'}
                    </p>
                    <p className="text-muted-foreground text-sm">QMY</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-3">
                  <img 
                    src="/assets/generated/icp-monster-transparent.dim_128x128.png" 
                    alt="ICP" 
                    className="w-10 h-10"
                  />
                  ICP Balance
                  <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                    Read-Only
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {icpQuery.isLoading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading balance...</p>
                  </div>
                ) : icpQuery.error ? (
                  <div className="text-center py-12 border border-destructive/20 rounded-xl bg-destructive/5">
                    <AlertCircle className="w-12 h-12 text-destructive/50 mx-auto mb-3" />
                    <p className="text-muted-foreground text-base mb-2">Failed to Load Balance</p>
                    <p className="text-muted-foreground/70 text-sm px-4">
                      {icpQuery.error.message || 'Unable to fetch ICP balance'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {icpQuery.data?.formatted || '0.00'}
                    </p>
                    <p className="text-muted-foreground text-sm">ICP</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Simulation Mode</CardTitle>
                <Button
                  variant={simulationEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={toggleSimulation}
                  className={simulationEnabled ? "bg-primary text-primary-foreground" : "border-primary/40 text-primary"}
                >
                  {simulationEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {simulationEnabled 
                  ? 'Simulation mode is active. You can test the send-tokens flow with simulated balances and vesting.'
                  : 'Enable simulation mode to test the send-tokens flow without real transactions.'}
              </p>
            </CardContent>
          </Card>

          {simulationEnabled && (
            <>
              <VestingBreakdown
                available={BigInt(Math.floor(available))}
                locked={BigInt(Math.floor(locked))}
                nextUnlock={nextUnlock ? {
                  amount: BigInt(Math.floor(nextUnlock.amount)),
                  date: nextUnlock.date
                } : null}
              />
              <SendQMYSimulatedCard availableBalance={available} />
            </>
          )}

          {!simulationEnabled && vestingQuery.data && (
            <VestingBreakdown
              available={vestingQuery.data.available}
              locked={vestingQuery.data.locked}
              nextUnlock={vestingQuery.data.nextUnlock}
            />
          )}

          <QMYTransactionHistory transactions={transactionsQuery.data || null} isLoading={transactionsQuery.isLoading} />
        </div>
      </Container>
    </PageShell>
  );
}
