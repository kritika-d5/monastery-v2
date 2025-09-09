// src/components/NearbyServicesMap.tsx

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Utensils, HeartPulse, Siren, Hotel } from 'lucide-react';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Mock data for nearby services
const services = [
  { id: 1, category: 'restaurants', name: 'Taste of Tibet', position: [27.30, 88.58] },
  { id: 2, category: 'hospitals', name: 'STNM Hospital', position: [27.33, 88.61] },
  { id: 3, category: 'police', name: 'Rumtek Police Outpost', position: [27.28, 88.57] },
  { id: 4, category: 'washrooms', name: 'Public Washroom', position: [27.29, 88.575] },
  { id: 5, category: 'restaurants', name: 'Hillside Cafe', position: [27.31, 88.59] },
];

interface NearbyServicesMapProps {
  filter: string;
}

export const NearbyServicesMap = ({ filter }: NearbyServicesMapProps) => {
  const rumtekPosition: [number, number] = [27.294, 88.576]; // Approximate coordinates for Rumtek
  const filteredServices = services.filter(service => service.category === filter);

  const getIcon = (category: string) => {
    switch (category) {
      case 'restaurants': return <Utensils className="h-4 w-4" />;
      case 'hospitals': return <HeartPulse className="h-4 w-4" />;
      case 'police': return <Siren className="h-4 w-4" />;
      case 'washrooms': return <Hotel className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-96 rounded-md overflow-hidden border">
      <MapContainer center={rumtekPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marker for Rumtek Monastery */}
        <Marker position={rumtekPosition}>
          <Popup>Rumtek Monastery</Popup>
        </Marker>

        {/* Markers for filtered services */}
        {filteredServices.map(service => (
          <Marker key={service.id} position={service.position as [number, number]}>
            <Popup>
              <div className="flex items-center gap-2">
                {getIcon(service.category)}
                <span className="font-semibold">{service.name}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};