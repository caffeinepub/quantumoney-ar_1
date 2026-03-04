import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQMYLedger } from '../hooks/useQMYLedger';
import { useICPLedger } from '../hooks/useICPLedger';
import { useQMYVesting } from '../hooks/useQMYVesting';
import { useQMYTransactions } from '../hooks/useQMYTransactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, Check, Clock, ArrowUpRight, ArrowDownLeft, Lock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import ReadOnlyBanner from '@/components/ReadOnlyBanner';
import VestingBreakdown from '@/components/wallet/VestingBreakdown';
import { useSimulatedQMYVesting } from '@/hooks/useSimulatedQMYVesting';
import { formatE8s } from '@/lib/icp/ledgerClient';
import { formatBalance } from '@/lib/icrc/ledgerClient';
import type { QMYTransaction } from '../hooks/useQMYTransactions';

// Inline transaction history using QMYTransaction type
function QMYTransactionHistoryInline({
  transactions,
  isLoading,
}: {
  transactions: QMYTransaction[] | null | undefined;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Transaction History
            {transactions === null && (
              <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                Not Supported
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {transactions === null ? 'History Not Available' : 'No transactions yet'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = (kind: string) => {
    switch (kind) {
      case 'transfer': return <ArrowUpRight className="w-5 h-5 text-primary" />;
      case 'mint':     return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case 'burn':     return <Lock className="w-5 h-5 text-destructive" />;
      default:         return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLabel = (kind: string) => {
    switch (kind) {
      case 'transfer': return 'Sent';
      case 'mint':     return 'Received';
      case 'burn':     return 'Burned';
      default:         return 'Unknown';
    }
  };

  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-3">
          <Clock className="w-6 h-6" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getIcon(tx.kind)}
                <div>
                  <p className="font-semibold text-foreground">{getLabel(tx.kind)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Number(tx.timestamp) / 1_000_000).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{tx.amount.toString()} QMY</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// SendQMYSimulatedCard inline
function SendQMYSimulatedCard({ availableBalance }: { availableBalance: number }) {
  return (
    <Card className="glass-card border-primary/30">
      <CardHeader>
        <CardTitle className="text-primary text-base">Send QMY (Simulated)</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Available balance: <span className="text-primary font-bold">{availableBalance.toFixed(2)} QMY</span>
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          Transfers are simulated — no real transactions occur.
        </p>
      </CardContent>
    </Card>
  );
}

export default function WalletPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);
  const { simulationEnabled, toggleSimulation, available, locked, nextUnlock } = useSimulatedQMYVesting();

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString() || '';

  const qmyQuery = useQMYLedger(principalId || undefined);
  const icpQuery = useICPLedger(principalId || undefined);
  const vestingQuery = useQMYVesting();
  const transactionsQuery = useQMYTransactions(principalId || undefined);

  const qmyFormatted = qmyQuery.data != null ? formatBalance(qmyQuery.data) : '0.00';
  const icpFormatted = icpQuery.data != null ? formatE8s(icpQuery.data) : '0.00';

  // Convert simulated number values to bigint for VestingBreakdown
  const availableBigInt = BigInt(Math.floor(available));
  const lockedBigInt = BigInt(Math.floor(locked));
  const nextUnlockBigInt = nextUnlock
    ? { amount: BigInt(Math.floor(nextUnlock.amount)), date: nextUnlock.date }
    : undefined;

  const handleCopyPrincipal = () => {
    navigator.clipboard.writeText(principalId);
    setCopiedPrincipal(true);
    toast.success('Principal ID copied!');
    setTimeout(() => setCopiedPrincipal(false), 2000);
  };

  if (isInitializing) {
    return (
      <PageShell>
        <Container>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </Container>
      </PageShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageShell>
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <Wallet className="w-20 h-20 text-primary/40" />
            <div>
              <PageTitle>Wallet</PageTitle>
              <p className="text-muted-foreground mt-2">
                Please log in to view your wallet.
              </p>
            </div>
            <Link to="/profile">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Go to Profile &amp; Login
              </Button>
            </Link>
          </div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Container>
        <div className="py-8 space-y-8">
          <ReadOnlyBanner message="Wallet is in read-only mode. Transfers are simulated." />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <PageTitle>My Wallet</PageTitle>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
                Ir para Perfil &amp; Carteira
              </Button>
            </Link>
          </div>

          {/* Principal ID */}
          <Card className="glass-card border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Principal ID</p>
                  <p className="font-mono text-xs text-primary break-all">{principalId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPrincipal}
                  className="border-primary/40 text-primary hover:bg-primary/10 shrink-0"
                >
                  {copiedPrincipal ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedPrincipal ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  QMY Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {qmyQuery.isLoading ? (
                  <div className="h-8 w-32 bg-primary/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    {qmyFormatted} <span className="text-lg">QMY</span>
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  ICP Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {icpQuery.isLoading ? (
                  <div className="h-8 w-32 bg-primary/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    {icpFormatted} <span className="text-lg">ICP</span>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Vesting — convert number → bigint for VestingBreakdown */}
          <VestingBreakdown
            available={availableBigInt}
            locked={lockedBigInt}
            nextUnlock={nextUnlockBigInt}
          />

          {/* Simulated Send */}
          <SendQMYSimulatedCard availableBalance={available} />

          {/* Transaction History */}
          <QMYTransactionHistoryInline
            transactions={transactionsQuery.data}
            isLoading={transactionsQuery.isLoading}
          />
        </div>
      </Container>
    </PageShell>
  );
}
