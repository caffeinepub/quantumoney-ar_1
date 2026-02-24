import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { useNavigate } from '@tanstack/react-router';
import { getPreProposals } from '@/lib/dao/preProposalsData';

export default function PreProposalsPage() {
  const proposals = getPreProposals();
  const navigate = useNavigate();

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<FileText className="w-12 h-12" />}>
              Pre-Proposals
            </PageTitle>
            <p className="text-muted-foreground text-lg">
              Educational proposals for community review before DAO submission
            </p>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Educational / Informational
            </Badge>
          </div>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  <strong>Educational Purpose:</strong> These pre-proposals are for learning and discussion only. 
                  No governance actions, voting, or execution are available. This section helps the community 
                  understand potential future governance topics.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="glass-card border-primary/30 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-primary text-xl mb-2">
                        {proposal.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {proposal.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-primary/40 text-primary shrink-0">
                      {proposal.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Objective</h4>
                      <p className="text-sm text-muted-foreground">{proposal.objective}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Impact</h4>
                      <p className="text-sm text-muted-foreground">{proposal.impact}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/40 text-primary hover:bg-primary/10"
                    onClick={() => navigate({ to: '/pre-proposals/$proposalId', params: { proposalId: proposal.id } })}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
