import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaticMapView from '@/components/map/StaticMapView';
import HUDOverlay from '@/components/HUDOverlay';
import AuthGate from '@/components/auth/AuthGate';

export default function MapMode() {
  return (
    <PageShell>
      <AuthGate>
        <Container>
          <div className="py-4 md:py-8 space-y-4 md:space-y-6">
            <PageTitle icon={<Map className="w-8 h-8 md:w-10 md:h-10" />}>
              Map Mode
            </PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="lg:col-span-3">
                <Card className="glass-card border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-primary text-base md:text-lg">World Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <StaticMapView />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1 space-y-4">
                <HUDOverlay variant="inline" />
              </div>
            </div>
          </div>
        </Container>
      </AuthGate>
    </PageShell>
  );
}
