export interface GoldPaperHotspot {
  id: string;
  name: string;
  region: string;
  allocation: number;
  latitude: number;
  longitude: number;
  type: 'tourist' | 'landmark' | 'cultural' | 'natural';
}

export interface GoldPaperDistribution {
  totalStrategic: number;
  hotspots: GoldPaperHotspot[];
  regionalBreakdown: Array<{
    region: string;
    allocation: number;
    percentage: number;
  }>;
}

export function getGoldPaperData(): GoldPaperDistribution {
  return {
    totalStrategic: 600000000,
    hotspots: [
      {
        id: 'eiffel-tower',
        name: 'Eiffel Tower',
        region: 'Europe',
        allocation: 15000000,
        latitude: 48.8584,
        longitude: 2.2945,
        type: 'landmark',
      },
      {
        id: 'great-wall',
        name: 'Great Wall of China',
        region: 'Asia',
        allocation: 25000000,
        latitude: 40.4319,
        longitude: 116.5704,
        type: 'landmark',
      },
      {
        id: 'statue-liberty',
        name: 'Statue of Liberty',
        region: 'North America',
        allocation: 20000000,
        latitude: 40.6892,
        longitude: -74.0445,
        type: 'landmark',
      },
      {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        region: 'Latin America',
        allocation: 12000000,
        latitude: -13.1631,
        longitude: -72.5450,
        type: 'cultural',
      },
      {
        id: 'pyramids-giza',
        name: 'Pyramids of Giza',
        region: 'Africa',
        allocation: 18000000,
        latitude: 29.9792,
        longitude: 31.1342,
        type: 'landmark',
      },
      {
        id: 'sydney-opera',
        name: 'Sydney Opera House',
        region: 'Others',
        allocation: 10000000,
        latitude: -33.8568,
        longitude: 151.2153,
        type: 'cultural',
      },
    ],
    regionalBreakdown: [
      { region: 'Asia', allocation: 240000000, percentage: 40 },
      { region: 'North America', allocation: 120000000, percentage: 20 },
      { region: 'Europe', allocation: 90000000, percentage: 15 },
      { region: 'Latin America', allocation: 60000000, percentage: 10 },
      { region: 'Africa', allocation: 60000000, percentage: 10 },
      { region: 'Others', allocation: 30000000, percentage: 5 },
    ],
  };
}
