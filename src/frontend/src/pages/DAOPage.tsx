import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertCircle, TrendingUp, FileText, BarChart3, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Link } from '@tanstack/react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { daoTopics } from '@/lib/dao/daoForumSimData';
import DAOProfilePanel from '@/components/dao/DAOProfilePanel';

export default function DAOPage() {
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
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<Users className="w-12 h-12" />}>
              DAO Governance Forum
            </PageTitle>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Simulated / Not Active
            </Badge>
          </div>

          <Card className="glass-card border-red-900/30 bg-red-900/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <CardTitle className="text-2xl font-serif text-red-400">
                  DAO Not Active
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-red-200 leading-relaxed">
                The DAO governance system is planned but not active. No voting is enabled. No proposals can be created. 
                No governance execution exists. This page provides conceptual information only for educational purposes.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5" />
                      Total Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary mb-1">{daoTopics.length}</p>
                    <p className="text-sm text-muted-foreground">(Simulated)</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5" />
                      Active Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary mb-1">1,250</p>
                    <p className="text-sm text-muted-foreground">(Simulated)</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2 text-lg">
                      <BarChart3 className="w-5 h-5" />
                      Participation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary mb-1">68%</p>
                    <p className="text-sm text-muted-foreground">(Simulated)</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Forum Topics (Simulated)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-primary/20">
                        <TableHead className="text-primary">Title</TableHead>
                        <TableHead className="text-primary">Category</TableHead>
                        <TableHead className="text-primary">Status</TableHead>
                        <TableHead className="text-primary text-right">Votes</TableHead>
                        <TableHead className="text-primary text-right">Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {daoTopics.map((topic) => (
                        <TableRow key={topic.id} className="border-primary/10">
                          <TableCell className="text-primary font-medium">
                            <Link 
                              to="/dao/$topicId"
                              params={{ topicId: topic.id }}
                              className="hover:text-primary/80 transition-colors"
                            >
                              {topic.title}
                            </Link>
                          </TableCell>
                          <TableCell className="text-primary">{topic.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(topic.status)}>
                              {topic.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-primary text-right">{topic.votes.toLocaleString()}</TableCell>
                          <TableCell className="text-primary text-right">
                            <div className="flex items-center justify-end gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {topic.comments}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <DAOProfilePanel />

              <Card className="glass-card border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">Governance Cycle</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img
                    src="/assets/generated/dao-governance-cycle-conceptual.dim_800x600.png"
                    alt="DAO Governance Cycle"
                    className="w-full rounded-lg border border-primary/20"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
