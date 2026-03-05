import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useGetMapMarkers } from '../hooks/useQueries';
import { useSharedLocation } from '../hooks/useSharedLocation';
import { calculateDistance } from '../utils/distance';
import { MapMarker } from '../backend';

// Leaflet is loaded via CDN in index.html
/* eslint-disable @typescript-eslint/no-explicit-any */
declare const L: any;

const STATIC_COIN_MARKERS: MapMarker[] = [
  { id: 'c1', latitude: 38.7169, longitude: -9.1399, markerType: 'coin' as any, description: 'Lisboa Centro' },
  { id: 'c2', latitude: 41.1579, longitude: -8.6291, markerType: 'coin' as any, description: 'Porto Centro' },
  { id: 'c3', latitude: 37.0194, longitude: -7.9322, markerType: 'coin' as any, description: 'Faro' },
  { id: 'c4', latitude: 40.2033, longitude: -8.4103, markerType: 'coin' as any, description: 'Coimbra' },
  { id: 'c5', latitude: 38.5667, longitude: -7.9000, markerType: 'coin' as any, description: 'Évora' },
  { id: 'c6', latitude: 48.8566, longitude: 2.3522, markerType: 'coin' as any, description: 'Paris' },
  { id: 'c7', latitude: 51.5074, longitude: -0.1278, markerType: 'coin' as any, description: 'Londres' },
  { id: 'c8', latitude: 40.4168, longitude: -3.7038, markerType: 'coin' as any, description: 'Madrid' },
  { id: 'c9', latitude: 41.9028, longitude: 12.4964, markerType: 'coin' as any, description: 'Roma' },
  { id: 'c10', latitude: 52.5200, longitude: 13.4050, markerType: 'coin' as any, description: 'Berlim' },
  { id: 'c11', latitude: 40.7128, longitude: -74.0060, markerType: 'coin' as any, description: 'Nova Iorque' },
  { id: 'c12', latitude: 35.6762, longitude: 139.6503, markerType: 'coin' as any, description: 'Tóquio' },
  { id: 'c13', latitude: -23.5505, longitude: -46.6333, markerType: 'coin' as any, description: 'São Paulo' },
  { id: 'c14', latitude: -33.8688, longitude: 151.2093, markerType: 'coin' as any, description: 'Sydney' },
  { id: 'c15', latitude: 55.7558, longitude: 37.6173, markerType: 'coin' as any, description: 'Moscovo' },
];

export default function MapPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [capturedIds, setCapturedIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const { data: backendMarkers } = useGetMapMarkers();
  const { location } = useSharedLocation();

  const showMessage = (msg: string, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    if (typeof L === 'undefined') {
      console.error('Leaflet not loaded');
      return;
    }

    const map = L.map(mapRef.current, {
      center: [38.7169, -9.1399],
      zoom: 5,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // Add markers to map
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current || typeof L === 'undefined') return;

    const map = leafletMapRef.current;
    const markers = backendMarkers && backendMarkers.length > 0 ? backendMarkers : STATIC_COIN_MARKERS;

    // Clear existing coin markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    markers.forEach((marker) => {
      if (capturedIds.has(marker.id)) return;

      const markerTypeStr = JSON.stringify(marker.markerType).toLowerCase();
      const isCoin = markerTypeStr.includes('coin');
      if (!isCoin) return;

      const coinIcon = L.divIcon({
        html: `<div style="
          width:32px;height:32px;
          background:#F59E0B;border:2px solid #D97706;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:14px;font-weight:bold;color:#000;
          box-shadow:0 0 8px rgba(245,158,11,0.6);cursor:pointer;
        ">Q</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: coinIcon })
        .addTo(map)
        .bindPopup(`
          <div style="background:#111;color:#F59E0B;padding:8px;border:1px solid #D97706;min-width:160px;font-family:sans-serif;">
            <strong style="font-size:14px;">💰 ${marker.description || t('coinMarker')}</strong><br/>
            <small style="color:#9CA3AF;">${marker.latitude.toFixed(4)}, ${marker.longitude.toFixed(4)}</small><br/>
            ${isAuthenticated
              ? `<button onclick="window.__captureMarker('${marker.id}')" style="
                  margin-top:8px;background:#F59E0B;color:#000;border:none;
                  padding:4px 12px;cursor:pointer;font-weight:bold;width:100%;
                ">Capturar</button>`
              : `<small style="color:#9CA3AF;">Login para capturar</small>`
            }
          </div>
        `, { maxWidth: 200 });

      markersRef.current.set(marker.id, leafletMarker);
    });

    // Add user location marker if available
    if (location) {
      const userIcon = L.divIcon({
        html: `<div style="
          width:16px;height:16px;
          background:#3B82F6;border:3px solid #fff;border-radius:50%;
          box-shadow:0 0 10px rgba(59,130,246,0.8);
        "></div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([location.latitude, location.longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup(`<div style="background:#111;color:#fff;padding:6px;font-family:sans-serif;">${t('yourLocation')}</div>`);
    }
  }, [mapReady, backendMarkers, capturedIds, location, isAuthenticated, t]);

  // Global capture handler
  const handleCapture = useCallback((markerId: string) => {
    if (!isAuthenticated) {
      showMessage('Precisas de fazer login para capturar moedas!');
      return;
    }

    const markers = backendMarkers && backendMarkers.length > 0 ? backendMarkers : STATIC_COIN_MARKERS;
    const marker = markers.find((m) => m.id === markerId);
    if (!marker) return;

    if (!location) {
      showMessage('A aguardar localização GPS...');
      return;
    }

    const dist = calculateDistance(
      location.latitude, location.longitude,
      marker.latitude, marker.longitude
    );

    if (dist > 50) {
      showMessage(`${t('tooFar')} (${Math.round(dist)}m)`);
      return;
    }

    setCapturedIds((prev) => new Set([...prev, markerId]));
    const leafletMarker = markersRef.current.get(markerId);
    if (leafletMarker) {
      leafletMarker.remove();
      markersRef.current.delete(markerId);
    }
    showMessage(`${t('captured')} +1 QMY, +${Math.max(1, Math.round(dist))} XP`);
  }, [isAuthenticated, backendMarkers, location, t]);

  useEffect(() => {
    (window as any).__captureMarker = handleCapture;
    return () => { delete (window as any).__captureMarker; };
  }, [handleCapture]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 136px)' }}>
      <div ref={mapRef} className="w-full h-full" />

      {/* Title overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-black/80 border border-gold-600 px-3 py-2">
        <h1 className="text-sm font-cinzel font-bold text-gold-400">{t('mapTitle')}</h1>
        <p className="text-xs text-gray-400 font-rajdhani">{t('mapSubtitle')}</p>
      </div>

      {/* Message toast */}
      {message && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] bg-black border border-gold-500 px-4 py-2 text-gold-400 text-sm font-rajdhani font-semibold whitespace-nowrap">
          {message}
        </div>
      )}

      {/* Location status */}
      {!location && (
        <div className="absolute bottom-4 left-3 z-[1000] bg-black/80 border border-yellow-700 px-3 py-1.5 text-xs text-yellow-400 font-rajdhani">
          📍 A obter localização GPS...
        </div>
      )}

      {/* Captured count */}
      {capturedIds.size > 0 && (
        <div className="absolute bottom-4 right-3 z-[1000] bg-black/80 border border-gold-600 px-3 py-1.5 text-xs text-gold-400 font-rajdhani">
          ✅ {capturedIds.size} moeda(s) capturada(s)
        </div>
      )}
    </div>
  );
}
