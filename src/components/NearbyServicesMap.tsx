// src/components/NearbyServicesMap.tsx

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'; // Import Tooltip
import L from 'leaflet';
import { Utensils, HeartPulse, Siren, Hotel, ParkingSquare, PersonStanding } from 'lucide-react';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Mock data for nearby services - UPDATED
const services = [
  // Accommodation
  { id: 1, category: 'accommodation', name: 'Superview Waterfall Homestay Rumtek', position: [27.3, 88.59] },
  { id: 2, category: 'accommodation', name: 'Casa Tranquila', position: [27.29, 88.57] },
  { id: 3, category: 'accommodation', name: 'Bamboo Retreat Hotel', position: [27.3, 88.57] },
  { id: 4, category: 'accommodation', name: 'Kengbari Retreat', position: [27.3, 88.59] },
  { id: 5, category: 'accommodation', name: 'Riverside -Eco Friendly Resort', position: [27.31, 88.6] },
  // Restaurants
  { id: 6, category: 'restaurants', name: 'The Gateway Kitchen and Cafe', position: [27.29, 88.56] },
  { id: 7, category: 'restaurants', name: 'One Two One Coffee', position: [27.29, 88.56] },
  { id: 8, category: 'restaurants', name: 'Eclipse Fusion Restro & Banquet', position: [27.28, 88.58] },
  { id: 9, category: 'restaurants', name: 'Gloria Bae', position: [27.3, 88.57] },
  { id: 10, category: 'restaurants', name: "Queen's Pod", position: [27.32, 88.59] },
  // Parking
  { id: 11, category: 'parking', name: 'Rumtek Monastery Car Parking', position: [27.29, 88.56] },
  // Washroom
  { id: 12, category: 'washrooms', name: 'Rumtek Monastery Public Washroom', position: [27.29, 88.56] },
  // Police Station
  { id: 13, category: 'police', name: 'Ranipool Police Station', position: [27.29, 88.59] },
  // Hospitals
  { id: 14, category: 'hospitals', name: 'Central Referral Hospital', position: [27.32, 88.6] },
  { id: 15, category: 'hospitals', name: 'STNM Hospital', position: [27.35, 88.6] },
  { id: 16, category: 'hospitals', name: 'Community Health Center', position: [27.17, 88.78] },
  { id: 17, category: 'hospitals', name: 'District Hospital Singtam', position: [27.23, 88.49] },
  { id: 18, category: 'hospitals', name: 'New STNM Multispeciality Hospital', position: [27.35, 88.6] },
];


interface NearbyServicesMapProps {
  filter: string;
}

export const NearbyServicesMap = ({ filter }: NearbyServicesMapProps) => {
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
            {/* ADDED THIS TOOLTIP TO SHOW THE NAME PERMANENTLY */}
            <Tooltip permanent>
              {service.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};