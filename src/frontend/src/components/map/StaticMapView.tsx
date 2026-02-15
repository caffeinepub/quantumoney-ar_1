import { useEffect, useRef, useState } from 'react';
import { projectLatLngToXY } from '@/lib/map/staticMapProjection';
import { useUnifiedPlayerState } from '@/hooks/useUnifiedPlayerState';
import { useSharedMapState } from '@/contexts/SharedMapStateContext';

interface StaticMapViewProps {
  className?: string;
}

export default function StaticMapView({ className = '' }: StaticMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1600, height: 900 });
  const { principal } = useUnifiedPlayerState();
  const { markers, refreshMarkers, selectedMarkerId, setSelectedMarkerId } = useSharedMapState();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = (width * 9) / 16;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (principal && markers.length === 0) {
      refreshMarkers(principal, 50);
    }
  }, [principal, markers.length, refreshMarkers]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative" style={{ paddingBottom: '56.25%' }}>
        <img
          src="/assets/generated/static-map-background.dim_1600x900.png"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {markers.map((marker) => {
            const { x, y } = projectLatLngToXY(
              marker.latitude,
              marker.longitude,
              dimensions.width,
              dimensions.height
            );

            const isSelected = marker.id === selectedMarkerId;

            return (
              <g
                key={marker.id}
                onClick={() => setSelectedMarkerId(isSelected ? null : marker.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "10" : "8"}
                  fill={marker.type === 'coin' ? '#FFD700' : '#FF6B6B'}
                  opacity={isSelected ? "1" : "0.8"}
                  stroke={isSelected ? '#FFD700' : '#000'}
                  strokeWidth={isSelected ? "2" : "1"}
                />
                <text
                  x={x}
                  y={y + 20}
                  fontSize="10"
                  fill="#FFD700"
                  textAnchor="middle"
                  className="font-bold"
                  style={{ textShadow: '0 0 3px #000' }}
                >
                  {marker.type === 'coin' ? 'QTM' : 'M'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex gap-4 justify-center text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FFD700]" />
          <span className="text-primary">Coins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FF6B6B]" />
          <span className="text-primary">Monsters</span>
        </div>
      </div>
    </div>
  );
}
