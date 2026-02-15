import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Loader2, AlertCircle } from 'lucide-react';
import { useICPLedger } from '@/hooks/useICPLedger';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import AuthGate from '@/components/auth/AuthGate';

export default function WalletPage() {
  const { identity } = useInternetIdentity();
  const { data: icpData, isLoading, error } = useICPLedger();

  const principal = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principal ? `${principal.slice(0, 8)}...${principal.slice(-6)}` : '';

  return (
    <PageShell>
      <AuthGate>
        <Container>
          <div className="py-12 space-y-8">
            <PageTitle icon={<Wallet className="w-12 h-12" />}>
              Wallet
            </PageTitle>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Principal ID</p>
                  <p className="text-primary font-mono text-sm break-all">{shortPrincipal}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">ICP Balance (Read-Only)</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="text-destructive font-semibold">Failed to load balance</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Unable to retrieve ICP balance. Please try again later.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-5xl font-bold text-primary mb-2">
                      {icpData?.formatted || '0.00'}
                    </p>
                    <p className="text-muted-foreground text-sm">ICP</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Balance is read-only. No transfers available.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </AuthGate>
    </PageShell>
  );
}
