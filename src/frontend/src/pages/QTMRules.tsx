import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function QTMRules() {
  return (
    <PageShell>
      <Container>
        <div className="py-16 space-y-8">
          <div className="text-center space-y-4">
            <PageTitle icon={<BookOpen className="w-12 h-12" />} className="justify-center">
              QTM Rules
            </PageTitle>
            <BodyText className="max-w-2xl mx-auto text-center">
              Game rules and guidelines placeholder
            </BodyText>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="p-16 text-center">
              <BookOpen className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
              <p className="text-muted-foreground text-lg">Rules content coming soon</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
