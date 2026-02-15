import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaticMapView from '@/components/map/StaticMapView';
import HUDOverlay from '@/components/HUDOverlay';
import CapturedMonstersPanel from '@/components/monsters/CapturedMonstersPanel';
import AuthGate from '@/components/auth/AuthGate';

export default function ARMode() {
  return (
    <PageShell>
      <AuthGate>
        <Container>
          <div className="py-4 md:py-8 space-y-4 md:space-y-6">
            <PageTitle icon={<Camera className="w-8 h-8 md:w-10 md:h-10" />}>
              AR Mode
            </PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <Card className="glass-card border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-primary text-base md:text-lg">AR View</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <StaticMapView className="mb-4" />
                    <p className="text-primary text-xs md:text-sm text-center">
                      Simulated AR environment with synchronized markers
                    </p>
                  </CardContent>
                </Card>

                <CapturedMonstersPanel />
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
