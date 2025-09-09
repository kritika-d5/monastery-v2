// src/components/NearbyServicesMap.tsx

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Utensils, HeartPulse, Siren, Hotel, ParkingSquare, PersonStanding } from 'lucide-react';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define a type for the service object
interface Service {
  id: number;
  category: string;
  name: string;
  position: [number, number];
}


interface NearbyServicesMapProps {
  filter: string;
  services: Service[]; // Accept services as a prop
}

export const NearbyServicesMap = ({ filter, services }: NearbyServicesMapProps) => {
  const rumtekPosition: [number, number] = [27.294, 88.576]; // Approximate coordinates for Rumtek
  const filteredServices = services.filter(service => service.category === filter || filter === 'all');

  const getIcon = (category: string) => {
    switch (category) {
      case 'restaurants': return <Utensils className="h-4 w-4" />;
      case 'hospitals': return <HeartPulse className="h-4 w-4" />;
      case 'police': return <Siren className="h-4 w-4" />;
      case 'washrooms': return <PersonStanding className="h-4 w-4" />;
      case 'accommodation': return <Hotel className="h-4 w-4" />;
      case 'parking': return <ParkingSquare className="h-4 w-4" />;
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
          <Tooltip permanent>Rumtek Monastery</Tooltip>
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
            {/* Tooltip now appears on hover */}
            <Tooltip>
              {service.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};