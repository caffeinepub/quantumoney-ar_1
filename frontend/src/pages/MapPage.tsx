import { useEffect, useRef } from 'react';
import { COIN_MARKERS, MONSTER_MARKERS } from '../lib/map/mapDatasets';
import { useGetMapMarkers } from '../hooks/useMapMarkers';

// Common marker shape used internally for rendering
interface RenderMarker {
  latitude: number;
  longitude: number;
  label: string;
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const { data: backendMarkers } = useGetMapMarkers();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Build coin render markers — prefer backend data if available
    const backendCoins = backendMarkers
      ? backendMarkers.filter(m => (m.markerType as unknown as string) === 'coin')
      : [];

    const coinRenderMarkers: RenderMarker[] =
      backendCoins.length > 0
        ? backendCoins.map(m => ({
            latitude: m.latitude,
            longitude: m.longitude,
            label: m.description,
          }))
        : COIN_MARKERS.map(m => ({
            latitude: m.latitude,
            longitude: m.longitude,
            label: m.name,
          }));

    // Build monster render markers — prefer backend data if available
    const backendMonsters = backendMarkers
      ? backendMarkers.filter(m => (m.markerType as unknown as string) === 'monster')
      : [];

    const monsterRenderMarkers: RenderMarker[] =
      backendMonsters.length > 0
        ? backendMonsters.map(m => ({
            latitude: m.latitude,
            longitude: m.longitude,
            label: m.description,
          }))
        : MONSTER_MARKERS.map(m => ({
            latitude: m.latitude,
            longitude: m.longitude,
            label: m.name,
          }));

    const coinIcon = L.divIcon({
      html: `<div style="width:32px;height:32px;background:radial-gradient(circle,#FFD700,#B8860B);border-radius:50%;border:2px solid #FFD700;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 0 8px rgba(255,215,0,0.8);">💰</div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const monsterIcon = L.divIcon({
      html: `<div style="width:32px;height:32px;background:radial-gradient(circle,#9B59B6,#6C3483);border-radius:50%;border:2px solid #9B59B6;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 0 8px rgba(155,89,182,0.8);">🐉</div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    coinRenderMarkers.forEach((marker: RenderMarker) => {
      L.marker([marker.latitude, marker.longitude], { icon: coinIcon })
        .addTo(map)
        .bindPopup(
          `<div style="color:#FFD700;background:#000;border:1px solid #FFD700;padding:8px;min-width:160px;">
            <strong style="font-family:serif;">💰 Moeda QMY</strong><br/>
            <small style="color:#FFD700aa;">${marker.label}</small><br/>
            <small style="color:#FFD700aa;">📍 ${marker.latitude.toFixed(4)}, ${marker.longitude.toFixed(4)}</small>
          </div>`
        );
    });

    monsterRenderMarkers.forEach((marker: RenderMarker) => {
      L.marker([marker.latitude, marker.longitude], { icon: monsterIcon })
        .addTo(map)
        .bindPopup(
          `<div style="color:#9B59B6;background:#000;border:1px solid #9B59B6;padding:8px;min-width:160px;">
            <strong style="font-family:serif;">🐉 Monstro</strong><br/>
            <small style="color:#9B59B6aa;">${marker.label}</small><br/>
            <small style="color:#9B59B6aa;">📍 ${marker.latitude.toFixed(4)}, ${marker.longitude.toFixed(4)}</small>
          </div>`
        );
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full" style={{ height: '100dvh', paddingTop: '64px' }}>
      {/* Legend */}
      <div className="absolute top-20 right-4 z-[1000] luxury-glass-card p-3 text-xs font-rajdhani space-y-2">
        <div className="text-qmy-gold font-cinzel font-bold text-sm mb-2">Legenda</div>
        <div className="flex items-center gap-2">
          <span>💰</span>
          <span className="text-qmy-gold/80">Moeda QMY ({COIN_MARKERS.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🐉</span>
          <span className="text-qmy-gold/80">Monstro ({MONSTER_MARKERS.length})</span>
        </div>
        {backendMarkers && backendMarkers.length > 0 && (
          <div className="text-green-400 text-xs mt-1">✓ Sincronizado</div>
        )}
      </div>

      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
