export interface MapMarker {
  latitude: number;
  longitude: number;
  name: string;
}

export const DEFAULT_CENTER = {
  latitude: 20.0,
  longitude: 0.0,
};

export const COIN_MARKERS: MapMarker[] = [
  // Europe
  { latitude: 48.8584, longitude: 2.2945, name: 'Eiffel Tower - Paris' },
  { latitude: 41.8902, longitude: 12.4922, name: 'Colosseum - Rome' },
  { latitude: 51.5007, longitude: -0.1246, name: 'Big Ben - London' },
  { latitude: 40.4168, longitude: -3.7038, name: 'Madrid Center' },
  { latitude: 52.52, longitude: 13.405, name: 'Berlin Center' },

  // North America
  { latitude: 40.6892, longitude: -74.0445, name: 'Statue of Liberty - USA' },
  { latitude: 34.1341, longitude: -118.3215, name: 'Hollywood Sign - USA' },
  { latitude: 19.4326, longitude: -99.1332, name: 'Mexico City Center' },
  { latitude: 43.6426, longitude: -79.3871, name: 'CN Tower - Canada' },

  // South America
  { latitude: -22.9519, longitude: -43.2105, name: 'Christ the Redeemer - Brazil' },
  { latitude: -34.6037, longitude: -58.3816, name: 'Buenos Aires Center' },
  { latitude: -13.1631, longitude: -72.545, name: 'Machu Picchu - Peru' },

  // Africa
  { latitude: -33.9249, longitude: 18.4241, name: 'Cape Town' },
  { latitude: 30.0444, longitude: 31.2357, name: 'Cairo' },
  { latitude: -1.2921, longitude: 36.8219, name: 'Nairobi' },

  // Asia
  { latitude: 35.6586, longitude: 139.7454, name: 'Tokyo Tower' },
  { latitude: 27.1751, longitude: 78.0421, name: 'Taj Mahal' },
  { latitude: 31.2304, longitude: 121.4737, name: 'Shanghai' },
  { latitude: 25.2048, longitude: 55.2708, name: 'Dubai' },
  { latitude: 1.3521, longitude: 103.8198, name: 'Singapore' },

  // Oceania
  { latitude: -33.8568, longitude: 151.2153, name: 'Sydney Opera House' },
  { latitude: -36.8485, longitude: 174.7633, name: 'Auckland' },
];

export const MONSTER_MARKERS: MapMarker[] = [
  { latitude: 29.9792, longitude: 31.1342, name: 'Pyramids of Giza' },
  { latitude: 27.9881, longitude: 86.925, name: 'Mount Everest' },
  { latitude: 36.1069, longitude: -112.1129, name: 'Grand Canyon' },
  { latitude: 64.1466, longitude: -21.9426, name: 'Iceland' },
  { latitude: 55.7558, longitude: 37.6173, name: 'Moscow' },
  { latitude: 13.7563, longitude: 100.5018, name: 'Bangkok' },
  { latitude: -25.3444, longitude: 131.0369, name: 'Uluru - Australia' },
];
