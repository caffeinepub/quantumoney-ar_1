export interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface MapPoint {
  x: number;
  y: number;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

const DEFAULT_BOUNDS: MapBounds = {
  minLat: -60,
  maxLat: 75,
  minLng: -170,
  maxLng: 180,
};

export function projectLatLngToXY(
  lat: number,
  lng: number,
  imageWidth: number,
  imageHeight: number,
  bounds: MapBounds = DEFAULT_BOUNDS
): MapPoint {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * imageWidth;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * imageHeight;

  return { x, y };
}

export function generateDeterministicMarkers(
  seed: string,
  count: number,
  bounds: MapBounds = DEFAULT_BOUNDS
): Array<GeoPoint & { id: string; type: 'coin' | 'monster' }> {
  const markers: Array<GeoPoint & { id: string; type: 'coin' | 'monster' }> = [];
  
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }

  for (let i = 0; i < count; i++) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const lat = bounds.minLat + (hash % 10000) / 10000 * (bounds.maxLat - bounds.minLat);
    
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const lng = bounds.minLng + (hash % 10000) / 10000 * (bounds.maxLng - bounds.minLng);
    
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const type = (hash % 2) === 0 ? 'coin' : 'monster';

    markers.push({
      id: `${type}-${i}`,
      latitude: lat,
      longitude: lng,
      type,
    });
  }

  return markers;
}
