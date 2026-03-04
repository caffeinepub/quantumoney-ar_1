import React, { useEffect, useRef, useState } from 'react';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { COIN_MARKERS, MONSTER_MARKERS } from '../lib/map/mapDatasets';
import { MapPin, Loader2 } from 'lucide-react';

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const { data: backendMarkers, isLoading } = useMapMarkers();

  // Load Leaflet CSS + JS
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    if (!document.getElementById('leaflet-css-map')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-map';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js-map')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js-map';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLeafletLoaded(true);
      document.head.appendChild(script);
    } else {
      // Script tag exists but may already be loaded
      if ((window as any).L) {
        setLeafletLoaded(true);
      } else {
        const existing = document.getElementById('leaflet-js-map') as HTMLScriptElement;
        existing.addEventListener('load', () => setLeafletLoaded(true));
      }
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    const Lx = (window as any).L;
    if (!Lx) return;

    const map = Lx.map(mapRef.current, {
      center: [20.0, 0.0],
      zoom: 2,
      zoomControl: true,
    });

    Lx.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Add markers
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const Lx = (window as any).L;
    if (!Lx) return;

    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer instanceof Lx.Marker) {
        map.removeLayer(layer);
      }
    });

    const useBackend = backendMarkers && backendMarkers.length > 0;

    if (useBackend) {
      backendMarkers.forEach((marker: any) => {
        const isCoin = marker.markerType === 'coin';
        const icon = Lx.icon({
          iconUrl: isCoin
            ? '/assets/generated/qmy-coin-pin.dim_40x40.png'
            : '/assets/generated/monster-pin.dim_40x40.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
        Lx.marker([marker.latitude, marker.longitude], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="color:#FFD700;background:#000;border:1px solid #FFD700;padding:8px;font-family:sans-serif">` +
            `<b>${isCoin ? '🪙 QMY Coin' : '👾 Monstro'}</b><br/>${marker.description}</div>`
          );
      });
    } else {
      // Fallback: static coin markers
      COIN_MARKERS.forEach((loc) => {
        const icon = Lx.icon({
          iconUrl: '/assets/generated/qmy-coin-pin.dim_40x40.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
        Lx.marker([loc.latitude, loc.longitude], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="color:#FFD700;background:#000;border:1px solid #FFD700;padding:8px;font-family:sans-serif">` +
            `<b>🪙 QMY Coin</b><br/>${loc.name}</div>`
          );
      });

      // Fallback: static monster markers
      MONSTER_MARKERS.forEach((loc) => {
        const icon = Lx.icon({
          iconUrl: '/assets/generated/monster-pin.dim_40x40.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
        Lx.marker([loc.latitude, loc.longitude], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="color:#FFD700;background:#000;border:1px solid #FFD700;padding:8px;font-family:sans-serif">` +
            `<b>👾 Monstro</b><br/>${loc.name}</div>`
          );
      });
    }
  }, [mapReady, backendMarkers]);

  return (
    <div className="flex flex-col" style={{ height: '100dvh', paddingTop: '4rem' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-yellow-500/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-yellow-400" />
          <h1 className="text-lg font-bold text-yellow-400 font-cinzel">Mapa Global QMY</h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-rajdhani text-yellow-300/60">
          <span className="flex items-center gap-1">
            <img src="/assets/generated/qmy-coin-pin.dim_40x40.png" alt="coin" className="w-4 h-4" />
            Moedas (
            {backendMarkers
              ? backendMarkers.filter((m: any) => m.markerType === 'coin').length
              : COIN_MARKERS.length}
            )
          </span>
          <span className="flex items-center gap-1">
            <img src="/assets/generated/monster-pin.dim_40x40.png" alt="monster" className="w-4 h-4" />
            Monstros (
            {backendMarkers
              ? backendMarkers.filter((m: any) => m.markerType === 'monster').length
              : MONSTER_MARKERS.length}
            )
          </span>
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative">
        {(!leafletLoaded || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="flex items-center gap-3 text-yellow-400 font-rajdhani">
              <Loader2 className="w-6 h-6 animate-spin" />
              A carregar mapa...
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
