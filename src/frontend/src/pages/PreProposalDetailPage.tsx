import { useParams } from '@tanstack/react-router';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { usePreProposalsStore } from '@/hooks/usePreProposalsStore';
import AuthGate from '@/components/auth/AuthGate';

export default function PreProposalDetailPage() {
  const { proposalId } = useParams({ from: '/pre-proposals/$proposalId' });
  const { getProposal } = usePreProposalsStore();
  const proposal = getProposal(proposalId);

  if (!proposal) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Pre-proposal not found</p>
            <Link to="/pre-proposals">
              <Button variant="outline" className="mt-4">
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
      <AuthGate>
        <Container>
          <div className="py-12 space-y-8">
            <Link to="/pre-proposals">
              <Button variant="outline" className="mb-4 border-primary/40">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pre-Proposals
              </Button>
            </Link>

            <PageTitle icon={<FileText className="w-12 h-12" />}>
              {proposal.title}
            </PageTitle>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Proposal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Author</p>
                  <p className="text-primary font-mono text-sm">{proposal.author}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Created</p>
                  <p className="text-primary text-sm">
                    {new Date(proposal.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                    Simulated
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{proposal.description}</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground text-center">
                  Voting and execution are disabled for simulated pre-proposals
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </AuthGate>
    </PageShell>
  );
}
