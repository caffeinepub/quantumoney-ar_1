export function projectLatLonToXY(
  latitude: number,
  longitude: number,
  centerLat: number,
  centerLon: number,
  zoom: number,
  viewWidth: number,
  viewHeight: number
): { x: number; y: number } {
  // Normalize longitude relative to center
  let deltaLon = longitude - centerLon;
  
  // Handle wrapping around the date line
  if (deltaLon > 180) deltaLon -= 360;
  if (deltaLon < -180) deltaLon += 360;

  // Simple equirectangular projection with zoom
  const x = viewWidth / 2 + (deltaLon / 180) * (viewWidth / 2) * zoom;
  const y = viewHeight / 2 - ((latitude - centerLat) / 90) * (viewHeight / 2) * zoom;

  return { x, y };
}
