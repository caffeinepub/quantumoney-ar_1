import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, Plus } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useCreateProposal } from '@/hooks/useDao';
import { toast } from 'sonner';

export default function DAOCreateProposalPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const createProposal = useCreateProposal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isAuthenticated = !!identity;
  const isRegistered = userProfile?.registered ?? false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createProposal.mutateAsync({ title: title.trim(), description: description.trim() });
      toast.success('Proposal created successfully!');
      navigate({ to: '/dao' });
    } catch (error: any) {
      console.error('Failed to create proposal:', error);
      toast.error(error.message || 'Failed to create proposal');
    }
  };

  const handleBack = () => {
    navigate({ to: '/dao' });
  };

  if (!isAuthenticated || (!isRegistered && !profileLoading)) {
    return (
      <PageShell>
        <Container>
          <div className="py-12 space-y-8">
            <PageTitle>Create Proposal</PageTitle>
            <Card className="glass-card border-amber-900/30 bg-amber-900/10">
              <CardContent className="p-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-amber-400 font-bold text-lg mb-2">Authentication Required</h3>
                  <p className="text-amber-300 text-sm leading-relaxed">
                    Please log in with Internet Identity and complete your profile registration to create proposals.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleBack} variant="outline" className="border-primary/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to DAO
            </Button>
          </div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Button onClick={handleBack} variant="ghost" size="icon" className="text-primary">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <PageTitle>Create New Proposal</PageTitle>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Proposal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-primary">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter proposal title"
                    className="border-primary/30"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">{title.length}/200 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-primary">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your proposal in detail"
                    className="border-primary/30 min-h-[200px]"
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground">{description.length}/2000 characters</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={createProposal.isPending || !title.trim() || !description.trim()}
                    className="bg-primary hover:bg-primary/90 text-black font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {createProposal.isPending ? 'Creating...' : 'Create Proposal'}
                  </Button>
                  <Button type="button" onClick={handleBack} variant="outline" className="border-primary/30">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Note:</strong> This proposal will be stored in the canister and visible to all users. 
                Voting is simulated/internal and does not execute real on-chain governance actions.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
