import React, { useEffect, useRef } from 'react';
import PageShell from '../components/PageShell';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { Variant_coin_monster } from '../backend';
import { MapPin, Loader2, AlertTriangle } from 'lucide-react';

const COIN_ICON_URL = '/assets/generated/qmy-coin-pin.dim_40x40.png';
const MONSTER_ICON_URL = '/assets/generated/monster-pin.dim_40x40.png';

// Fallback static markers if backend returns empty
const FALLBACK_COIN_MARKERS = [
  { id: 'coin_1', latitude: 40.7128, longitude: -74.0060, markerType: Variant_coin_monster.coin, description: 'New York Central' },
  { id: 'coin_2', latitude: 34.0522, longitude: -118.2437, markerType: Variant_coin_monster.coin, description: 'Los Angeles Downtown' },
  { id: 'coin_3', latitude: 51.5074, longitude: -0.1278, markerType: Variant_coin_monster.coin, description: 'London City Center' },
  { id: 'coin_4', latitude: 48.8566, longitude: 2.3522, markerType: Variant_coin_monster.coin, description: 'Paris Centre' },
  { id: 'coin_5', latitude: 35.6895, longitude: 139.6917, markerType: Variant_coin_monster.coin, description: 'Tokyo Central' },
  { id: 'coin_6', latitude: -23.5505, longitude: -46.6333, markerType: Variant_coin_monster.coin, description: 'São Paulo Centro' },
  { id: 'coin_7', latitude: 55.7558, longitude: 37.6173, markerType: Variant_coin_monster.coin, description: 'Moscow Red Square' },
  { id: 'coin_8', latitude: 39.9042, longitude: 116.4074, markerType: Variant_coin_monster.coin, description: 'Beijing Tiananmen' },
  { id: 'coin_9', latitude: 19.4326, longitude: -99.1332, markerType: Variant_coin_monster.coin, description: 'Mexico City Zócalo' },
  { id: 'coin_10', latitude: -33.8688, longitude: 151.2093, markerType: Variant_coin_monster.coin, description: 'Sydney Opera House' },
  { id: 'coin_11', latitude: 28.6139, longitude: 77.2090, markerType: Variant_coin_monster.coin, description: 'New Delhi India Gate' },
  { id: 'coin_12', latitude: -1.2921, longitude: 36.8219, markerType: Variant_coin_monster.coin, description: 'Nairobi City Center' },
  { id: 'coin_13', latitude: 41.9028, longitude: 12.4964, markerType: Variant_coin_monster.coin, description: 'Rome Colosseum' },
  { id: 'coin_14', latitude: 37.5665, longitude: 126.9780, markerType: Variant_coin_monster.coin, description: 'Seoul Gyeongbokgung' },
  { id: 'coin_15', latitude: 1.3521, longitude: 103.8198, markerType: Variant_coin_monster.coin, description: 'Singapore Marina Bay' },
  { id: 'coin_16', latitude: 25.2048, longitude: 55.2708, markerType: Variant_coin_monster.coin, description: 'Dubai Burj Khalifa' },
  { id: 'coin_17', latitude: -34.6037, longitude: -58.3816, markerType: Variant_coin_monster.coin, description: 'Buenos Aires Obelisco' },
  { id: 'coin_18', latitude: 52.5200, longitude: 13.4050, markerType: Variant_coin_monster.coin, description: 'Berlin Brandenburg Gate' },
  { id: 'coin_19', latitude: 38.7223, longitude: -9.1393, markerType: Variant_coin_monster.coin, description: 'Lisboa Praça do Comércio' },
  { id: 'coin_20', latitude: 41.3851, longitude: 2.1734, markerType: Variant_coin_monster.coin, description: 'Barcelona Sagrada Família' },
  { id: 'coin_21', latitude: 30.0444, longitude: 31.2357, markerType: Variant_coin_monster.coin, description: 'Cairo Tahrir Square' },
  { id: 'coin_22', latitude: 43.6532, longitude: -79.3832, markerType: Variant_coin_monster.coin, description: 'Toronto CN Tower' },
];

const FALLBACK_MONSTER_MARKERS = [
  { id: 'monster_1', latitude: 27.1751, longitude: 78.0421, markerType: Variant_coin_monster.monster, description: 'Taj Mahal Monster Zone' },
  { id: 'monster_2', latitude: -22.9519, longitude: -43.2105, markerType: Variant_coin_monster.monster, description: 'Rio de Janeiro Monster Zone' },
  { id: 'monster_3', latitude: 29.9792, longitude: 31.1342, markerType: Variant_coin_monster.monster, description: 'Giza Pyramids Monster Zone' },
  { id: 'monster_4', latitude: 51.1789, longitude: -1.8262, markerType: Variant_coin_monster.monster, description: 'Stonehenge Monster Zone' },
  { id: 'monster_5', latitude: -13.1631, longitude: -72.5450, markerType: Variant_coin_monster.monster, description: 'Machu Picchu Monster Zone' },
  { id: 'monster_6', latitude: 37.9715, longitude: 23.7267, markerType: Variant_coin_monster.monster, description: 'Athens Acropolis Monster Zone' },
  { id: 'monster_7', latitude: 40.4319, longitude: 116.5704, markerType: Variant_coin_monster.monster, description: 'Great Wall Monster Zone' },
];

// Leaflet instance type (loaded dynamically via CDN)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletLib = any;

declare global {
  interface Window {
    L: LeafletLib;
  }
}

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const leafletLoadedRef = useRef(false);

  const { data: backendMarkers, isLoading, error } = useMapMarkers();

  const markers = (backendMarkers && backendMarkers.length > 0)
    ? backendMarkers
    : [...FALLBACK_COIN_MARKERS, ...FALLBACK_MONSTER_MARKERS];

  const coinMarkers = markers.filter(
    m => m.markerType === Variant_coin_monster.coin || (m.markerType as string) === 'coin'
  );
  const monsterMarkers = markers.filter(
    m => m.markerType === Variant_coin_monster.monster || (m.markerType as string) === 'monster'
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Load Leaflet CSS if not already loaded
    if (!document.getElementById('leaflet-css-dynamic')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-dynamic';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L: LeafletLib = window.L;
      if (!L || !mapContainerRef.current) return;

      // Destroy existing map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create map centered on world view
      const map = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Dark tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      // Coin icon (image)
      const coinIcon = L.icon({
        iconUrl: COIN_ICON_URL,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Monster icon (image)
      const monsterIcon = L.icon({
        iconUrl: MONSTER_ICON_URL,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Fallback div icons
      const coinDivIcon = L.divIcon({
        html: `<div style="width:32px;height:32px;background:radial-gradient(circle,#FFD700,#B8860B);border:2px solid #FFD700;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 10px rgba(255,215,0,0.6);">💰</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const monsterDivIcon = L.divIcon({
        html: `<div style="width:32px;height:32px;background:radial-gradient(circle,#8B00FF,#4B0082);border:2px solid #9B59B6;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 10px rgba(139,0,255,0.6);">👾</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Add coin markers
      coinMarkers.forEach(marker => {
        const lm = L.marker([marker.latitude, marker.longitude], { icon: coinIcon }).addTo(map);
        // Fallback to div icon if image fails
        lm.on('error', () => { try { lm.setIcon(coinDivIcon); } catch (_) { /* ignore */ } });
        lm.bindPopup(`
          <div style="font-family:sans-serif;min-width:160px;">
            <div style="font-size:18px;margin-bottom:4px;">💰 QMY Coin</div>
            <div style="font-size:14px;font-weight:600;color:#FFD700;">${marker.description}</div>
            <div style="font-size:11px;margin-top:4px;opacity:0.8;">${marker.latitude.toFixed(4)}, ${marker.longitude.toFixed(4)}</div>
          </div>
        `);
      });

      // Add monster markers
      monsterMarkers.forEach(marker => {
        const lm = L.marker([marker.latitude, marker.longitude], { icon: monsterIcon }).addTo(map);
        lm.on('error', () => { try { lm.setIcon(monsterDivIcon); } catch (_) { /* ignore */ } });
        lm.bindPopup(`
          <div style="font-family:sans-serif;min-width:160px;">
            <div style="font-size:18px;margin-bottom:4px;">👾 Monster Zone</div>
            <div style="font-size:14px;font-weight:600;color:#FFD700;">${marker.description}</div>
            <div style="font-size:11px;margin-top:4px;opacity:0.8;">${marker.latitude.toFixed(4)}, ${marker.longitude.toFixed(4)}</div>
          </div>
        `);
      });

      // Fix map rendering after mount
      setTimeout(() => { map.invalidateSize(); }, 150);
    };

    const loadLeaflet = async () => {
      if (leafletLoadedRef.current && window.L) {
        initMap();
        return;
      }

      if (!window.L) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.getElementById('leaflet-js');
          if (existing) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Leaflet'));
          document.head.appendChild(script);
        });
      }

      leafletLoadedRef.current = true;
      initMap();
    };

    loadLeaflet().catch(console.error);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // Re-run when marker count changes (backend data loaded)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinMarkers.length, monsterMarkers.length]);

  return (
    <PageShell>
      <div className="flex flex-col" style={{ height: 'calc(100dvh - 5rem)' }}>
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 glass-card border-b border-border/60 flex-shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-primary tracking-wide">
              QMY Global Map
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#FFD700', boxShadow: '0 0 6px rgba(255,215,0,0.8)' }} />
              <span className="text-primary font-medium">
                {coinMarkers.length} QMY Coins
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#8B00FF', boxShadow: '0 0 6px rgba(139,0,255,0.8)' }} />
              <span className="text-primary font-medium">
                {monsterMarkers.length} Monsters
              </span>
            </div>
            {isLoading && (
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-destructive/40 text-sm text-primary flex-shrink-0" style={{ background: 'rgba(220,38,38,0.1)' }}>
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span>Using cached map data. Backend sync unavailable.</span>
          </div>
        )}

        {/* Map container */}
        <div className="flex-1 relative">
          <div
            ref={mapContainerRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          />

          {/* Loading overlay */}
          {isLoading && !mapInstanceRef.current && (
            <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-primary font-medium">Loading QMY Map...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 glass-card border-t border-border/60 flex-shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            🌍 Mapa sincronizado via ICP canister — mesmo estado em{' '}
            <span className="text-primary font-semibold">quantumoney.app</span>
            {' '}e{' '}
            <span className="text-primary font-semibold">quantumoneyar.app</span>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
