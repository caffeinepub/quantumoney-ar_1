import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Coins, Map, Users, Lock, TrendingDown, Scale, Cpu, Mail } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import StatusBadge from '@/components/StatusBadge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';

export default function DocsPage() {
  const docSections = [
    {
      title: 'Gold Paper',
      description: 'Draft documentation structure; content pending final Gold Paper.',
      icon: FileText,
      path: '/gold-paper',
      status: 'draft' as const,
    },
    {
      title: 'Tokenomics',
      description: 'Conceptual token model; no tokens issued or distributed.',
      icon: Coins,
      path: '/tokenomics',
      status: 'draft' as const,
    },
    {
      title: 'Technical Architecture',
      description: 'Draft technical specifications; content pending final Gold Paper.',
      icon: Cpu,
      path: '/technical',
      status: 'draft' as const,
    },
    {
      title: 'Roadmap',
      description: 'Conceptual phases; no commitments or timelines provided.',
      icon: Map,
      path: '/roadmap',
      status: 'draft' as const,
    },
    {
      title: 'DAO Governance',
      description: 'Planned governance model; not active, no voting enabled.',
      icon: Users,
      path: '/dao',
      status: 'planned' as const,
    },
    {
      title: 'Treasury & Monetary Policy',
      description: 'Conceptual treasury model; no operational execution.',
      icon: Lock,
      path: '/treasury-monetary-policy',
      status: 'draft' as const,
    },
    {
      title: 'Vesting & Deflation',
      description: 'Draft vesting framework; content pending final Gold Paper.',
      icon: TrendingDown,
      path: '/vesting-deflation',
      status: 'draft' as const,
    },
    {
      title: 'Legal & Compliance',
      description: 'MiCA and GDPR compliance information; educational only.',
      icon: Scale,
      path: '/legal',
      status: 'draft' as const,
    },
    {
      title: 'Contact',
      description: 'HTgamers support and contact information.',
      icon: Mail,
      path: '/contact',
      status: 'draft' as const,
    },
  ];

  return (
    <PageShell>
      <Container>
        <div className="py-16 space-y-16">
          {/* Header */}
          <div className="text-center space-y-8">
            <div className="inline-block p-8 rounded-full bg-primary/10 border-2 border-primary/40">
              <BookOpen className="w-20 h-20 text-primary" />
            </div>
            <div className="space-y-4">
              <PageTitle className="justify-center">
                Documentation Hub
              </PageTitle>
              <BodyText className="max-w-3xl mx-auto text-center text-xl">
                Institutional documentation and educational resources for the Quantumoney ecosystem.
              </BodyText>
            </div>
          </div>

          {/* Important Notice */}
          <Card className="glass-card bg-destructive/10 border-destructive/40">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <BookOpen className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="text-destructive font-bold text-xl">Educational Documentation</h3>
                  <p className="text-destructive-foreground/90 leading-relaxed">
                    All documentation is conceptual and educational. No operational crypto features, token issuance, 
                    or financial transactions exist. Content complies with MiCA (EU) and GDPR (EU 2016/679).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link key={doc.path} to={doc.path}>
                  <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 h-full cursor-pointer group">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                        <StatusBadge status={doc.status} />
                      </div>
                      <CardTitle className="text-xl text-primary">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{doc.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Quick Access Guides */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">For Institutional Stakeholders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Recommended reading order:</p>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Gold Paper (overview)</li>
                  <li>Legal & Compliance</li>
                  <li>Technical Architecture</li>
                  <li>DAO Governance (planned)</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">For Researchers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Recommended reading order:</p>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Gold Paper (overview)</li>
                  <li>Tokenomics (conceptual)</li>
                  <li>Treasury & Monetary Policy</li>
                  <li>Vesting & Deflation</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
