import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Repeat, Coins } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, SectionTitle } from '@/components/Typography';

export default function LandingPage() {
  return (
    <PageShell className="py-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/landing-hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 py-32 text-center">
          {/* Logo */}
          <div className="mb-12 flex justify-center animate-fade-in">
            <img 
              src="/assets/generated/quantumoney-ar-logo-transparent.dim_200x200.png" 
              alt="Quantumoney AR Logo" 
              className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_40px_rgba(217,165,32,0.7)]"
            />
          </div>

          {/* Main Title */}
          <PageTitle className="mb-8 drop-shadow-[0_0_30px_rgba(217,165,32,0.6)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Quantumoney AR
          </PageTitle>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            A quantum universe Web3 application powered by QMY on Internet Computer.
          </p>

          {/* CTA Button */}
          <Link to="/">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-16 py-8 rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Enter Quantum Universe
            </Button>
          </Link>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section className="py-24 px-4 relative">
        <Container>
          <SectionTitle className="text-center mb-16">
            Core Features
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wallet */}
            <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-gold-subtle group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Wallet className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Wallet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manage your QMY and ICP balances with real-time updates and secure transfers.
                </p>
              </CardContent>
            </Card>

            {/* Swap */}
            <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-gold-subtle group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Repeat className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Swap</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Exchange QMY ↔ ICP with real-time quotes and slippage protection.
                </p>
              </CardContent>
            </Card>

            {/* QMY Token */}
            <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-gold-subtle group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Coins className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">QMY Token</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Native token of the Quantumoney ecosystem with real on-chain functionality.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
