import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Repeat, AlertCircle, Lock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import ReadOnlyBanner from '@/components/ReadOnlyBanner';

export default function SwapPage() {
  const { identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;

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
                  Please log in with Internet Identity to access swap functionality.
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
      <Container size="md">
        <div className="py-12 space-y-8">
          {/* Read-Only Banner */}
          <ReadOnlyBanner message="Swap functionality is currently disabled. This feature will be available soon." />

          {/* Header */}
          <div className="text-center space-y-3">
            <PageTitle icon={<Repeat className="w-12 h-12" />}>
              Swap
            </PageTitle>
            <p className="text-muted-foreground text-lg">Exchange QMY ↔ ICP (Coming Soon)</p>
          </div>

          {/* Coming Soon Card */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                Swap Tokens
                <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                  Coming Soon
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-20">
              <div className="text-center space-y-8">
                <Lock className="w-24 h-24 text-muted-foreground/50 mx-auto" />
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Swap Feature Coming Soon</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                    The QMY ↔ ICP swap functionality is currently under development and will be available in a future release.
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/30 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-primary">Note:</strong> This is a read-only dashboard. 
                    No swap operations can be executed at this time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Planned Features */}
          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Planned Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1 text-xl">•</span>
                  <span className="text-base">Real-time quote retrieval for QMY ↔ ICP exchanges</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1 text-xl">•</span>
                  <span className="text-base">Slippage protection and customizable tolerance settings</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1 text-xl">•</span>
                  <span className="text-base">Secure on-chain swap execution</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1 text-xl">•</span>
                  <span className="text-base">Transaction history and swap analytics</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Back to Wallet */}
          <div className="text-center pt-4">
            <Link to="/wallet">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary hover:bg-primary/10">
                Back to Wallet
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
