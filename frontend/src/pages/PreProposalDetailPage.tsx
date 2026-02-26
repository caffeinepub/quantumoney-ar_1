import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Link, useParams } from '@tanstack/react-router';
import { getPreProposalById } from '@/lib/dao/preProposalsData';

export default function PreProposalDetailPage() {
  const { proposalId } = useParams({ from: '/pre-proposals/$proposalId' });
  const proposal = getPreProposalById(proposalId);

  if (!proposal) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">Proposal not found</p>
            <Link to="/pre-proposals">
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pre-Proposals
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
        <div className="py-12 space-y-8">
          <Link to="/pre-proposals">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pre-Proposals
            </Button>
          </Link>

          <div className="space-y-3">
            <PageTitle icon={<FileText className="w-12 h-12" />}>
              {proposal.title}
            </PageTitle>
            <Badge variant="outline" className="border-primary/40 text-primary">
              {proposal.category}
            </Badge>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500 ml-2">
              Educational / Informational
            </Badge>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{proposal.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-3">
                  <Target className="w-6 h-6" />
                  Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.objective}</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Expected Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.impact}</p>
              </CardContent>
            </Card>
          </div>

          {proposal.fullDetails && proposal.fullDetails.length > 0 && (
            <div className="space-y-4">
              {proposal.fullDetails.map((detail, i) => (
                <Card key={i} className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{detail.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{detail.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Educational Purpose:</strong> This pre-proposal is for learning and discussion only.
                No governance actions, voting, or execution are available at this stage.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
