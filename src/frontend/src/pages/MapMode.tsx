import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle, BodyText } from '@/components/Typography';
import { Map, MapPin, Coins as CoinsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { COIN_MARKERS, MONSTER_MARKERS, DEFAULT_CENTER } from '@/lib/map/mapDatasets';
import { projectLatLonToXY } from '@/lib/map/simulatedMapProjection';

export default function MapMode() {
  const [centerLat, setCenterLat] = useState(DEFAULT_CENTER.latitude);
  const [centerLon, setCenterLon] = useState(DEFAULT_CENTER.longitude);
  const [zoom, setZoom] = useState(1.5);

  const viewWidth = 800;
  const viewHeight = 400;

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<Map className="w-12 h-12" />}>
              Global Map
            </PageTitle>
            <BodyText className="max-w-2xl">
              Simulated world map showing QMY coin and monster locations at famous landmarks worldwide
            </BodyText>
            <Badge variant="outline" className="border-amber-500/40 text-amber-500">
              Simulated / Internal
            </Badge>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="centerLat" className="text-primary">Center Latitude</Label>
                  <Input
                    id="centerLat"
                    type="number"
                    value={centerLat}
                    onChange={(e) => setCenterLat(parseFloat(e.target.value) || 0)}
                    step="0.1"
                    className="border-primary/30"
                  />
                </div>
                <div>
                  <Label htmlFor="centerLon" className="text-primary">Center Longitude</Label>
                  <Input
                    id="centerLon"
                    type="number"
                    value={centerLon}
                    onChange={(e) => setCenterLon(parseFloat(e.target.value) || 0)}
                    step="0.1"
                    className="border-primary/30"
                  />
                </div>
                <div>
                  <Label htmlFor="zoom" className="text-primary">Zoom Level</Label>
                  <Input
                    id="zoom"
                    type="number"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value) || 1)}
                    step="0.1"
                    min="0.5"
                    max="5"
                    className="border-primary/30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Map className="w-6 h-6" />
                World Map Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full bg-gradient-to-b from-blue-950/30 to-green-950/30 rounded-lg overflow-hidden border border-primary/20" style={{ height: `${viewHeight}px` }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="absolute inset-0">
                  <rect width={viewWidth} height={viewHeight} fill="rgba(0,0,0,0.3)" />
                  
                  {/* Grid lines */}
                  {Array.from({ length: 13 }).map((_, i) => {
                    const lon = -180 + i * 30;
                    const { x } = projectLatLonToXY(0, lon, centerLat, centerLon, zoom, viewWidth, viewHeight);
                    return (
                      <line
                        key={`vline-${i}`}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={viewHeight}
                        stroke="rgba(255, 215, 0, 0.1)"
                        strokeWidth="1"
                      />
                    );
                  })}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const lat = -90 + i * 30;
                    const { y } = projectLatLonToXY(lat, 0, centerLat, centerLon, zoom, viewWidth, viewHeight);
                    return (
                      <line
                        key={`hline-${i}`}
                        x1={0}
                        y1={y}
                        x2={viewWidth}
                        y2={y}
                        stroke="rgba(255, 215, 0, 0.1)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Coin markers */}
                  {COIN_MARKERS.map((marker, idx) => {
                    const { x, y } = projectLatLonToXY(
                      marker.latitude,
                      marker.longitude,
                      centerLat,
                      centerLon,
                      zoom,
                      viewWidth,
                      viewHeight
                    );
                    if (x < 0 || x > viewWidth || y < 0 || y > viewHeight) return null;
                    return (
                      <g key={`coin-${idx}`}>
                        <circle cx={x} cy={y} r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
                        <title>{marker.name}</title>
                      </g>
                    );
                  })}

                  {/* Monster markers */}
                  {MONSTER_MARKERS.map((marker, idx) => {
                    const { x, y } = projectLatLonToXY(
                      marker.latitude,
                      marker.longitude,
                      centerLat,
                      centerLon,
                      zoom,
                      viewWidth,
                      viewHeight
                    );
                    if (x < 0 || x > viewWidth || y < 0 || y > viewHeight) return null;
                    return (
                      <g key={`monster-${idx}`}>
                        <polygon
                          points={`${x},${y - 8} ${x + 7},${y + 4} ${x - 7},${y + 4}`}
                          fill="#FF4500"
                          stroke="#8B0000"
                          strokeWidth="2"
                        />
                        <title>{marker.name}</title>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FFD700] border-2 border-[#FFA500]"></div>
                  <span className="text-muted-foreground">QMY Coins ({COIN_MARKERS.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF4500] border-2 border-[#8B0000]" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                  <span className="text-muted-foreground">Monsters ({MONSTER_MARKERS.length})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <CoinsIcon className="w-5 h-5" />
                  Coin Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {COIN_MARKERS.slice(0, 10).map((marker, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-primary/5">
                      <span className="text-muted-foreground">{marker.name}</span>
                      <span className="text-primary text-xs">
                        {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                      </span>
                    </div>
                  ))}
                  {COIN_MARKERS.length > 10 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      + {COIN_MARKERS.length - 10} more locations
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Monster Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {MONSTER_MARKERS.map((marker, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-2 rounded bg-primary/5">
                      <span className="text-muted-foreground">{marker.name}</span>
                      <span className="text-primary text-xs">
                        {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-6">
              <p className="text-sm text-amber-300 leading-relaxed">
                <strong>Note:</strong> This is a simulated map projection. No external map tiles or services are used. 
                Coordinates represent famous tourist landmarks worldwide. Both Quantumoney.app and QuantumoneyAR.app 
                use the same internal dataset for consistency.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
