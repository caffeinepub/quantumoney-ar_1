import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, Vote } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetProposal, useVoteOnProposal, useRevokeVote } from '@/hooks/useDao';
import { toast } from 'sonner';

export default function DAOProposalDetailPage() {
  const navigate = useNavigate();
  const { proposalId } = useParams({ from: '/dao/$proposalId' });
  const { identity } = useInternetIdentity();
  const { data: proposal, isLoading } = useGetProposal(proposalId);
  const voteOnProposal = useVoteOnProposal();
  const revokeVote = useRevokeVote();

  const isAuthenticated = !!identity;

  const handleBack = () => {
    navigate({ to: '/dao' });
  };

  const handleVote = async (voteType: 'yes' | 'no' | 'abstain') => {
    if (!isAuthenticated) {
      toast.error('Please log in to vote');
      return;
    }

    try {
      await voteOnProposal.mutateAsync({ proposalId, vote: voteType });
      toast.success(`Vote cast: ${voteType.toUpperCase()}`);
    } catch (error: any) {
      console.error('Failed to vote:', error);
      toast.error(error.message || 'Failed to cast vote');
    }
  };

  const handleRevokeVote = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to revoke vote');
      return;
    }

    try {
      await revokeVote.mutateAsync(proposalId);
      toast.success('Vote revoked successfully');
    } catch (error: any) {
      console.error('Failed to revoke vote:', error);
      toast.error(error.message || 'Failed to revoke vote');
    }
  };

  if (isLoading) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading proposal...</p>
          </div>
        </Container>
      </PageShell>
    );
  }

  if (!proposal) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 space-y-8">
            <PageTitle>Proposal Not Found</PageTitle>
            <Button onClick={handleBack} variant="outline" className="border-primary/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to DAO
            </Button>
          </div>
        </Container>
      </PageShell>
    );
  }

  const yesVotes = proposal.yesVotes || 0;
  const noVotes = proposal.noVotes || 0;
  const abstainVotes = proposal.abstainVotes || 0;
  const totalVotes = yesVotes + noVotes + abstainVotes;

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Button onClick={handleBack} variant="ghost" size="icon" className="text-primary">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <PageTitle>Proposal Details</PageTitle>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-primary text-2xl mb-3">{proposal.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By: {proposal.authorName || 'Anonymous'}</span>
                    <span>•</span>
                    <span>{new Date(Number(proposal.createdAt) / 1_000_000).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/40 text-green-500">
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-primary font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{proposal.description}</p>
              </div>

              {proposal.userVote && (
                <Card className="glass-card border-amber-900/30 bg-amber-900/10">
                  <CardContent className="p-4">
                    <p className="text-amber-300 text-sm">
                      <strong>Your vote:</strong> {proposal.userVote.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <Vote className="w-6 h-6" />
                Voting Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-green-400 text-3xl font-bold mb-1">{yesVotes}</p>
                  <p className="text-green-400/80 text-sm">Yes</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-3xl font-bold mb-1">{noVotes}</p>
                  <p className="text-red-400/80 text-sm">No</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-500/10 border border-gray-500/30">
                  <p className="text-gray-400 text-3xl font-bold mb-1">{abstainVotes}</p>
                  <p className="text-gray-400/80 text-sm">Abstain</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-sm">Total Votes: <span className="text-primary font-semibold">{totalVotes}</span></p>
              </div>

              {isAuthenticated && (
                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <Button
                    onClick={() => handleVote('yes')}
                    disabled={voteOnProposal.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Vote Yes
                  </Button>
                  <Button
                    onClick={() => handleVote('no')}
                    disabled={voteOnProposal.isPending}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Vote No
                  </Button>
                  <Button
                    onClick={() => handleVote('abstain')}
                    disabled={voteOnProposal.isPending}
                    variant="outline"
                    className="border-gray-500/40 text-gray-400"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Abstain
                  </Button>
                  {proposal.userVote && (
                    <Button
                      onClick={handleRevokeVote}
                      disabled={revokeVote.isPending}
                      variant="outline"
                      className="border-primary/30"
                    >
                      Revoke Vote
                    </Button>
                  )}
                </div>
              )}

              {!isAuthenticated && (
                <p className="text-center text-muted-foreground text-sm pt-4">
                  Please log in to vote on this proposal
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Note:</strong> Voting is simulated/internal. Results are persisted in the canister but do not 
                execute real on-chain governance actions. You can change or revoke your vote at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
