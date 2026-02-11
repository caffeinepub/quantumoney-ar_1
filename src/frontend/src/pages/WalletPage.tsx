import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wallet, AlertCircle, Copy, Check, Lock, Unlock, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import ReadOnlyBanner from '@/components/ReadOnlyBanner';

export default function WalletPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);

  const isAuthenticated = !!identity;
  const principalId = identity?.getPrincipal().toString() || '';

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
          {/* Read-Only Banner */}
          <ReadOnlyBanner />

          {/* Header */}
          <div className="space-y-3">
            <PageTitle icon={<Wallet className="w-12 h-12" />}>
              Institutional Wallet Dashboard
            </PageTitle>
            <p className="text-muted-foreground text-lg">View your QMY and ICP balances (read-only)</p>
          </div>

          {/* Principal ID Card */}
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

          {/* Balances Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QMY Balance */}
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
                <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
                  <p className="text-muted-foreground text-base mb-2">Not Connected</p>
                  <p className="text-muted-foreground/70 text-sm">Balance display coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* ICP Balance */}
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
                <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
                  <p className="text-muted-foreground text-base mb-2">Not Connected</p>
                  <p className="text-muted-foreground/70 text-sm">Balance display coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locked / Unlocked Balances (Visual Only) */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <Lock className="w-6 h-6" />
                Locked / Unlocked Balances
                <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                  Visual Only
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Unlock className="w-5 h-5 text-success" />
                    <span className="font-semibold text-lg">Unlocked Balance</span>
                  </div>
                  <div className="text-center py-10 border border-success/20 rounded-xl bg-success/5">
                    <p className="text-muted-foreground text-base">Coming Soon</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">Locked Balance</span>
                  </div>
                  <div className="text-center py-10 border border-primary/20 rounded-xl bg-primary/5">
                    <p className="text-muted-foreground text-base">Coming Soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History (Disabled) */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <Clock className="w-6 h-6" />
                Transaction History
                <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                  Coming Soon
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 border border-primary/20 rounded-xl bg-primary/5 space-y-4">
                <Clock className="w-16 h-16 text-muted-foreground/50 mx-auto" />
                <div>
                  <p className="text-muted-foreground text-xl mb-2">Transaction History</p>
                  <p className="text-muted-foreground/70 text-sm">This feature is currently disabled and will be available soon.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disabled Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button 
              variant="outline" 
              className="w-full border-primary/20 text-muted-foreground/50 h-16 text-lg cursor-not-allowed hover:bg-transparent"
              disabled
            >
              <Lock className="w-5 h-5 mr-3" />
              Transfer (Coming Soon)
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-primary/20 text-muted-foreground/50 h-16 text-lg cursor-not-allowed hover:bg-transparent"
              disabled
            >
              <Lock className="w-5 h-5 mr-3" />
              Swap (Coming Soon)
            </Button>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
