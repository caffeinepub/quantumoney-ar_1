import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe } from 'lucide-react';
import { getGoldPaperData } from '@/lib/qmy/goldPaperSimData';

export default function GoldPaperUniverseVisualization() {
  const data = getGoldPaperData();
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const currentHotspot = data.hotspots.find((h) => h.id === selectedHotspot);

  return (
    <div className="space-y-6">
      <div className="relative min-h-[400px] bg-gradient-to-b from-purple-900/20 via-black to-amber-900/20 rounded-xl border border-amber-500/30 p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center mb-8">
          <Globe className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-amber-400 mb-2">
            Global Distribution Network
          </h3>
          <p className="text-gray-300 text-sm">
            600 Million QMY Strategic Allocation
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => setSelectedHotspot(hotspot.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedHotspot === hotspot.id
                  ? 'border-amber-500 bg-amber-900/30'
                  : 'border-amber-500/30 bg-black/40 hover:border-amber-500/60'
              }`}
            >
              <MapPin className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-amber-300 text-sm font-semibold mb-1">{hotspot.name}</p>
              <p className="text-gray-400 text-xs">{hotspot.region}</p>
            </button>
          ))}
        </div>
      </div>

      {currentHotspot && (
        <Card className="glass-card bg-amber-900/10 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-amber-400 mb-1">{currentHotspot.name}</h4>
                <p className="text-gray-300 text-sm">{currentHotspot.region}</p>
              </div>
              <Badge variant="outline" className="border-amber-500/40 text-amber-500">
                {currentHotspot.type}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Allocation</p>
                <p className="text-amber-400 font-bold">{currentHotspot.allocation.toLocaleString()} QMY</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Coordinates</p>
                <p className="text-amber-400 font-mono text-sm">
                  {currentHotspot.latitude.toFixed(4)}, {currentHotspot.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card bg-black/40 border-amber-500/30">
        <CardContent className="p-6">
          <h4 className="text-amber-400 font-bold mb-4">Regional Breakdown</h4>
          <div className="space-y-3">
            {data.regionalBreakdown.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{region.region}</span>
                  <span className="text-amber-400 font-semibold">
                    {region.allocation.toLocaleString()} QMY ({region.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card bg-amber-900/10 border-amber-500/30">
        <CardContent className="p-6">
          <p className="text-sm text-amber-300 leading-relaxed">
            <strong>Note:</strong> This visualization represents the conceptual strategic distribution of 600 million QMY tokens 
            across global hotspots and tourist points. All data is simulated and prepared to reflect future AR hotspot integration 
            with QuantumoneyAR.app. No tokens are currently distributed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
