import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, SectionTitle } from '@/components/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { usePreProposalsStore } from '@/hooks/usePreProposalsStore';
import { Link } from '@tanstack/react-router';
import AuthGate from '@/components/auth/AuthGate';

export default function PreProposalsPage() {
  const { proposals, createProposal } = usePreProposalsStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      createProposal(title, description);
      toast.success('Pre-proposal created successfully!');
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to create pre-proposal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <AuthGate>
        <Container>
          <div className="py-12 space-y-8">
            <div className="flex items-center justify-between">
              <PageTitle icon={<FileText className="w-12 h-12" />}>
                Pre-Proposals
              </PageTitle>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Pre-Proposal
              </Button>
            </div>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">About Pre-Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pre-proposals are simulated governance items for testing and discussion.
                  Create and explore proposals before formal DAO submission.
                </p>
              </CardContent>
            </Card>

            {showForm && (
              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">Create Pre-Proposal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-primary">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter proposal title"
                      className="mt-2 border-primary/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-primary">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your proposal"
                      rows={6}
                      className="mt-2 border-primary/40"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Pre-Proposal'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="border-primary/40"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <SectionTitle>All Pre-Proposals</SectionTitle>
              {proposals.length === 0 ? (
                <Card className="glass-card border-primary/30">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No pre-proposals yet. Create the first one!</p>
                  </CardContent>
                </Card>
              ) : (
                proposals.map((proposal) => (
                  <Link
                    key={proposal.id}
                    to="/pre-proposals/$proposalId"
                    params={{ proposalId: proposal.id }}
                  >
                    <Card className="glass-card border-primary/30 hover:border-primary/50 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-primary">{proposal.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2 mb-3">
                          {proposal.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By: {proposal.author.slice(0, 8)}...</span>
                          <span>•</span>
                          <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="text-primary">Simulated</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        </Container>
      </AuthGate>
    </PageShell>
  );
}
