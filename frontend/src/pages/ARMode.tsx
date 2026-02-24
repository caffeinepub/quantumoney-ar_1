import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ARMode() {
  return (
    <PageShell>
      <Container>
        <div className="py-16 space-y-8">
          <div className="text-center space-y-4">
            <PageTitle icon={<Camera className="w-12 h-12" />} className="justify-center">
              AR Mode
            </PageTitle>
            <BodyText className="max-w-2xl mx-auto text-center">
              Augmented Reality experience placeholder
            </BodyText>
          </div>

          <Card className="glass-card border-primary/30">
            <CardContent className="p-16 text-center">
              <Camera className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
              <p className="text-muted-foreground text-lg">AR Mode content coming soon</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
