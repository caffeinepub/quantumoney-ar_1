import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, AlertCircle, Vote, FileText } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useGetProposals } from '@/hooks/useDao';

export default function DAOPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: proposals, isLoading: proposalsLoading } = useGetProposals();

  const isAuthenticated = !!identity;
  const isRegistered = userProfile?.registered ?? false;

  const handleCreateProposal = () => {
    if (!isAuthenticated || !isRegistered) {
      return;
    }
    navigate({ to: '/dao/new' });
  };

  const handleViewProposal = (proposalId: string) => {
    navigate({ to: '/dao/$proposalId', params: { proposalId } });
  };

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<Users className="w-12 h-12" />}>
              DAO Governance
            </PageTitle>
            <BodyText className="max-w-2xl">
              Internal simulated governance system for community proposals and voting
            </BodyText>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Simulated / Internal
            </Badge>
          </div>

          {!isAuthenticated && (
            <Card className="glass-card border-amber-900/30 bg-amber-900/10">
              <CardContent className="p-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-400 font-bold text-lg mb-2">Login Required</h3>
                  <p className="text-amber-300 text-sm leading-relaxed">
                    Please log in with Internet Identity to view proposals and participate in DAO governance.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {isAuthenticated && !isRegistered && !profileLoading && (
            <Card className="glass-card border-amber-900/30 bg-amber-900/10">
              <CardContent className="p-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-400 font-bold text-lg mb-2">Registration Required</h3>
                  <p className="text-amber-300 text-sm leading-relaxed">
                    Please complete your profile registration to create proposals and vote.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {isAuthenticated && isRegistered && (
            <div className="flex justify-end">
              <Button
                onClick={handleCreateProposal}
                className="bg-primary hover:bg-primary/90 text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
            </div>
          )}

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Active Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {proposalsLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading proposals...</p>
                </div>
              ) : !proposals || proposals.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No proposals yet. Be the first to create one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <Card
                      key={proposal.id}
                      className="glass-card border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                      onClick={() => handleViewProposal(proposal.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-primary font-semibold text-lg mb-2">{proposal.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{proposal.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>By: {proposal.authorName || 'Anonymous'}</span>
                              <span>•</span>
                              <span>{new Date(Number(proposal.createdAt) / 1_000_000).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="outline" className="border-green-500/40 text-green-500">
                              {proposal.status}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm">
                              <Vote className="w-4 h-4 text-primary" />
                              <span className="text-primary font-semibold">{proposal.totalVotes || 0} votes</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Note:</strong> This is a simulated/internal DAO governance system. All proposals and votes 
                are stored in the canister but do not execute real on-chain governance actions. This system is for 
                educational and community engagement purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
