import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { getTopicById } from '@/lib/dao/daoForumSimData';

export default function DAOTopicDetailPage() {
  const { topicId } = useParams({ from: '/dao/$topicId' });
  const topic = getTopicById(topicId);

  if (!topic) {
    return (
      <PageShell>
        <Container>
          <div className="py-12">
            <Card className="glass-card border-red-900/30 bg-red-900/10">
              <CardContent className="p-6">
                <p className="text-red-200">Topic not found.</p>
                <Link to="/dao">
                  <Button variant="outline" className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Forum
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </PageShell>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'voting': return 'border-green-500/40 text-green-500';
      case 'discussion': return 'border-blue-500/40 text-blue-500';
      case 'passed': return 'border-primary/40 text-primary';
      case 'rejected': return 'border-red-500/40 text-red-500';
      case 'draft': return 'border-gray-500/40 text-gray-500';
      default: return 'border-primary/40 text-primary';
    }
  };

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-6">
          <Link to="/dao">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Forum
            </Button>
          </Link>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  <strong>Simulated Topic:</strong> This is a simulated DAO forum topic for demonstration purposes. 
                  No real voting or governance actions are possible.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <PageTitle>{topic.title}</PageTitle>
                  <Badge variant="outline" className={getStatusColor(topic.status)}>
                    {topic.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-primary">{topic.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-primary">{new Date(topic.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-primary">{topic.votes.toLocaleString()} votes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-primary">{topic.comments} comments</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {topic.category}
                  </Badge>
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/20 text-primary/80">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-primary leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: topic.content.replace(/\n/g, '<br />') }}
                />
              </div>

              <div className="pt-6 border-t border-primary/20">
                <div className="flex gap-3">
                  <Button variant="outline" disabled className="flex-1">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Vote (Disabled)
                  </Button>
                  <Button variant="outline" disabled className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Comment (Disabled)
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Voting and commenting are disabled in this simulated environment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
