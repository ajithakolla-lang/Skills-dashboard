import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Employee } from '../types';

// Fix for default icon issue with bundlers like Vite/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface LocationMapProps {
  employees: Employee[];
  onLocationClick: (location: string) => void;
}

const locationCoordinates: Record<string, [number, number]> = {
  'Santa Clara': [37.3541, -121.9552],
  'Toronto': [43.6532, -79.3832],
  'Bellevue': [47.6104, -122.2007],
};

export const LocationMap: React.FC<LocationMapProps> = ({ employees, onLocationClick }) => {
  const employeeCountsByLocation = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      if (locationCoordinates[emp.location]) {
        counts[emp.location] = (counts[emp.location] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([location, count]) => ({
      name: location,
      count,
      position: locationCoordinates[location],
    }));
  }, [employees]);

  if (employeeCountsByLocation.length === 0) {
    return <div className="text-center text-text-secondary">No location data to display on map.</div>;
  }
  
  // Calculate center of map to reasonably fit all markers
  const latitudes = employeeCountsByLocation.map(l => l.position[0]);
  const longitudes = employeeCountsByLocation.map(l => l.position[1]);
  const center: [number, number] = [
      (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
      (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
  ];
  
  // A simple zoom level adjustment
  const zoomLevel = employeeCountsByLocation.length > 1 ? 2 : 5;


  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden z-0 relative">
        <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {employeeCountsByLocation.map(location => (
            <Marker
              key={location.name}
              position={location.position}
              eventHandlers={{
                click: () => onLocationClick(location.name),
              }}
            >
                <Popup>
                <strong>{location.name}</strong><br />
                {location.count} employee{location.count > 1 ? 's' : ''}
                </Popup>
            </Marker>
            ))}
      </MapContainer>
    </div>
  );
};