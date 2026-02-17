import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, Target, Zap, Users } from 'lucide-react';
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
            <div className="flex items-center gap-3">
              <PageTitle icon={<FileText className="w-12 h-12" />}>
                {proposal.title}
              </PageTitle>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                {proposal.category}
              </Badge>
              <Badge variant="outline" className="border-amber-500/40 text-amber-500">
                Educational
              </Badge>
            </div>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{proposal.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.objective}</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.impact}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Users className="w-5 h-5" />
                Full Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.fullDetails.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-primary font-semibold">{section.heading}</h4>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Educational Notice:</strong> This pre-proposal is for informational and educational purposes only. 
                No voting, submission, or governance execution is available. This content helps the community understand 
                potential future governance topics.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
