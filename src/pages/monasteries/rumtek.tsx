import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { NearbyServicesMap } from "@/components/NearbyServicesMap";
import { 
  Globe, 
  MapPin, 
  Eye, 
  Camera,
  BookOpen,
  Headphones,
  Users,
  Maximize,
  ShieldCheck,
  ShieldX,
  Star,
  Hotel,
  Utensils,
  HeartPulse,
  Siren,
  ThumbsUp,
  ThumbsDown,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Loader2,
  Wind,
  Sunrise,
  Sunset,
  Zap,
  ChevronRight,
  ParkingSquare, 
  PersonStanding
} from "lucide-react";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Helper function to map weather codes to icons and descriptions
const getWeatherInfo = (code: number) => {
  switch (code) {
    case 0: return { icon: <Sun />, description: 'Clear sky' };
    case 1:
    case 2:
    case 3: return { icon: <Cloud />, description: 'Partly cloudy' };
    case 51:
    case 53:
    case 55: return { icon: <CloudRain />, description: 'Drizzle' };
    case 61:
    case 63:
    case 65: return { icon: <CloudRain />, description: 'Rain' };
    case 71:
    case 73:
    case 75: return { icon: <Snowflake />, description: 'Snow fall' };
    case 80:
    case 81:
    case 82: return { icon: <CloudRain />, description: 'Rain showers' };
    case 95: return { icon: <CloudRain />, description: 'Thunderstorm' };
    default: return { icon: <Cloud />, description: 'Weather' };
  }
};

const RumtekMonasteryPage = () => {
  const tourRef = useRef<HTMLDivElement>(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [activeMapFilter, setActiveMapFilter] = useState("accommodation");

  const handleFullscreen = () => {
    if (tourRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        tourRef.current.requestFullscreen();
      }
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      comment: "Absolutely breathtaking! The virtual tour felt so real. The intricate details of the murals are stunning. A must-see for anyone interested in Tibetan Buddhism.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      comment: "A very serene and spiritual experience. The audio guide was informative. The only downside was that some hotspots in the 360° tour were a bit slow to load.",
    },
  ];

  const services = [
    // Accommodation
    { id: 1, category: 'accommodation', name: 'Superview Waterfall Homestay Rumtek', position: [27.3, 88.59], rating: 4.5, type: 'Homestay' },
    { id: 2, category: 'accommodation', name: 'Casa Tranquila', position: [27.29, 88.57], rating: 4.8, type: 'Hotel' },
    { id: 3, category: 'accommodation', name: 'Bamboo Retreat Hotel', position: [27.3, 88.57], rating: 4.2, type: 'Hotel' },
    { id: 4, category: 'accommodation', name: 'Kengbari Retreat', position: [27.3, 88.59], rating: 4.0, type: 'Retreat' },
    { id: 5, category: 'accommodation', name: 'Riverside -Eco Friendly Resort', position: [27.31, 88.6], rating: 4.6, type: 'Resort' },
    // Restaurants
    { id: 6, category: 'restaurants', name: 'The Gateway Kitchen and Cafe', position: [27.29, 88.56], rating: 4.3, type: 'Cafe' },
    { id: 7, category: 'restaurants', name: 'One Two One Coffee', position: [27.29, 88.56], rating: 4.7, type: 'Coffee Shop' },
    { id: 8, category: 'restaurants', name: 'Eclipse Fusion Restro & Banquet', position: [27.28, 88.58], rating: 4.1, type: 'Restaurant' },
    { id: 9, category: 'restaurants', name: 'Gloria Bae', position: [27.3, 88.57], rating: 4.5, type: 'Restaurant' },
    { id: 10, category: 'restaurants', name: "Queen's Pod", position: [27.32, 88.59], rating: 4.0, type: 'Cafe' },
    // Parking
    { id: 11, category: 'parking', name: 'Rumtek Monastery Car Parking', position: [27.29, 88.56], type: 'Public Parking' },
    // Washroom
    { id: 12, category: 'washrooms', name: 'Rumtek Monastery Public Washroom', position: [27.29, 88.56], type: 'Public Facility' },
    // Police Station
    { id: 13, category: 'police', name: 'Ranipool Police Station', position: [27.29, 88.59], type: 'Government' },
    // Hospitals
    { id: 14, category: 'hospitals', name: 'Central Referral Hospital', position: [27.32, 88.6], rating: 4.4, type: 'Hospital' },
    { id: 15, category: 'hospitals', name: 'STNM Hospital', position: [27.35, 88.6], rating: 4.6, type: 'Hospital' },
    { id: 16, category: 'hospitals', name: 'Community Health Center', position: [27.17, 88.78], rating: 3.9, type: 'Clinic' },
    { id: 17, category: 'hospitals', name: 'District Hospital Singtam', position: [27.23, 88.49], rating: 4.1, type: 'Hospital' },
    { id: 18, category: 'hospitals', name: 'New STNM Multispeciality Hospital', position: [27.35, 88.6], rating: 4.7, type: 'Hospital' },
  ];

  const filteredServices = services.filter(service => service.category === activeMapFilter);

  const getIcon = (category: string) => {
    const className = "h-6 w-6 text-monastery-gold";
    switch (category) {
        case 'restaurants': return <Utensils className={className} />;
        case 'hospitals': return <HeartPulse className={className} />;
        case 'police': return <Siren className={className} />;
        case 'washrooms': return <PersonStanding className={className} />;
        case 'accommodation': return <Hotel className={className} />;
        case 'parking': return <ParkingSquare className={className} />;
        default: return null;
    }
  };
  
  useEffect(() => {
    const fetchWeather = async () => {
      const lat = 27.294;
      const lon = 88.576;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,sunrise,sunset&timezone=Asia%2FCalcutta`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setWeatherError(true);
        console.error("Failed to fetch weather data:", err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);
  
  const rumtekPosition: [number, number] = [27.294, 88.576];

  const todayWeather = weather?.daily?.time[0] ? {
    date: new Date(weather.daily.time[0]),
    tempMax: weather.daily.temperature_2m_max[0],
    tempMin: weather.daily.temperature_2m_min[0],
    weatherInfo: getWeatherInfo(weather.daily.weather_code[0]),
  } : null;

  const selectedDayWeather = weather?.daily?.time[selectedDayIndex] ? {
    date: new Date(weather.daily.time[selectedDayIndex]),
    tempMax: weather.daily.temperature_2m_max[selectedDayIndex],
    tempMin: weather.daily.temperature_2m_min[selectedDayIndex],
    weatherInfo: getWeatherInfo(weather.daily.weather_code[selectedDayIndex]),
    uvIndex: weather.daily.uv_index_max[selectedDayIndex],
    windSpeed: weather.daily.wind_speed_10m_max[selectedDayIndex],
    sunrise: new Date(weather.daily.sunrise[selectedDayIndex]),
    sunset: new Date(weather.daily.sunset[selectedDayIndex]),
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img 
          src={rumtekImage} 
          alt="Rumtek Monastery" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold font-playfair text-white">
            Rumtek Monastery
          </h1>
          <p className="text-xl text-white/90">
            A Virtual Tour of Sikkim's Largest Monastery
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 360 Tour & Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-monastery-gold" />
                360° Virtual Tour
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleFullscreen}>
                <Maximize className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </CardHeader>
            <CardContent>
              {/* Placeholder for 360 Tour */}
              <div ref={tourRef} className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-md">
                <p className="text-muted-foreground">
                  360° Tour Viewer Coming Soon
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-monastery-gold" />
                About Rumtek Monastery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Rumtek Monastery, also known as the Dharmachakra Centre, is a 
                Tibetan Buddhist monastery located in the Indian state of Sikkim.
                It is the largest monastery in Sikkim and is the seat of the 
                Karmapa, the head of the Karma Kagyu school of Tibetan Buddhism.
              </p>
              <p>
                The monastery is a replica of the original Kagyu headquarters 
                in Tsurphu, Tibet. It houses some of the world's most unique 
                and rare Buddhist religious scriptures and art objects. The 
                main temple is a four-story building adorned with traditional 
                murals, thangkas, and statues.
              </p>
            </CardContent>
          </Card>
          
          {/* Gallery Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6 text-monastery-gold" />
                Explore Rumtek Monastery Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Discover the beauty, culture, and unique charm of this destination through our curated collection of images. From iconic landmarks to hidden gems, each photograph highlights the essence and atmosphere that make this place truly special.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group relative">
                  <img src="https://th.bing.com/th/id/R.270f07b7f38f4cfc548481185db5c3d2?rik=51wLN48AOvJWqQ&riu=http%3a%2f%2fwww.sikkimtourismindia.com%2fblog%2fwp-content%2fuploads%2f2018%2f12%2fRumtek-Monastery1.jpg&ehk=DNfl8M2hRF3kuzO84IxeOjPQrelIge99IK%2f%2bgcJbdno%3d&risl=&pid=ImgRaw&r=0" alt="Rumtek Monastery main building" className="rounded-lg w-full h-40 object-cover cursor-pointer transition-transform transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
                <div className="group relative">
                  <img src="https://tse3.mm.bing.net/th/id/OIP.JU_2qFt9_zecZlWQxSjr6gHaFj?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Rumtek Monastery courtyard view" className="rounded-lg w-full h-40 object-cover cursor-pointer transition-transform transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
                <div className="group relative">
                  <img src="https://thf.bing.com/th/id/OIP.4HZNnql8ooIDAL_6GCIyRwHaEK?o=7&cb=thfc1rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Golden Stupa inside Rumtek Monastery" className="rounded-lg w-full h-40 object-cover cursor-pointer transition-transform transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
                <div className="group relative">
                  <img src="https://images.squarespace-cdn.com/content/v1/58cad42137c5813452b6b86a/1489897232772-UT7GHG4U6UESHCTNPD5H/Screen+Shot+2017-03-17+at+1.25.58+AM.png" alt="Rumtek Monastery prayer hall interior" className="rounded-lg w-full h-40 object-cover cursor-pointer transition-transform transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules & Regulations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-monastery-gold" />
                Rules & Regulations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Maintain silence within the monastery premises, especially in the prayer halls.</li>
                <li>Dress modestly. Cover shoulders and knees.</li>
                <li>Photography is prohibited inside the main prayer hall and other restricted areas.</li>
                <li>Do not touch the statues, murals, or religious artifacts.</li>
                <li>Circumambulate the stupas and temple in a clockwise direction.</li>
                <li>Smoking and consumption of alcohol are strictly forbidden.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <div>
            <h2 className="text-2xl font-bold font-playfair mb-4">Do's and Don'ts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <ThumbsUp className="h-6 w-6" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Be respectful to the monks and local culture.</li>
                    <li>Make a small donation if you wish.</li>
                    <li>Try the local butter tea if offered.</li>
                    <li>Ask for permission before taking photos of people.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <ThumbsDown className="h-6 w-6" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Do not wear shoes inside the prayer halls.</li>
                    <li>Do not point your feet towards the statues or monks.</li>
                    <li>Avoid loud conversations and public displays of affection.</li>
                    <li>Do not disturb the praying monks.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>

        {/* Right Column: Options & Recommendations */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-monastery-gold" />
                Language Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Select your preferred language for the audio guide and text.
              </p>
              <LanguageDropdown />
              <Button className="w-full">
                <Headphones className="h-4 w-4 mr-2" />
                Start Audio Guide
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-monastery-gold" />
                Visitor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Timings:</strong> 6:00 AM - 6:00 PM</p>
              <p><strong>Entry Fee:</strong> ₹10 per person</p>
              <p><strong>Best Time to Visit:</strong> March-May, Oct-Dec</p>
              <p><strong>Dress Code:</strong> Modest clothing required</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-himalayan-blue" />
                Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weatherLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 animate-spin text-himalayan-blue" />
                </div>
              ) : weatherError ? (
                <p className="text-destructive text-sm">Could not fetch weather data. Please try again later.</p>
              ) : (
                <>
                {/* Today's weather */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 text-himalayan-blue my-2">{todayWeather.weatherInfo.icon}</div>
                        <div>
                            <p className="text-sm font-medium">Today</p>
                            <p className="font-semibold text-lg">{Math.round(todayWeather.tempMax)}°C / {Math.round(todayWeather.tempMin)}°C</p>
                            <p className="text-xs text-muted-foreground">{todayWeather.weatherInfo.description}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDayIndex(0)}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Other days' navigation */}
                <div className="grid grid-cols-4 gap-2">
                    {weather.daily.time.slice(1).map((date: string, index: number) => {
                        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                        const isSelected = selectedDayIndex === index + 1;
                        return (
                            <Button 
                                key={index} 
                                variant={isSelected ? "default" : "outline"} 
                                size="sm" 
                                className={isSelected ? 'bg-gradient-monastery' : ''}
                                onClick={() => setSelectedDayIndex(index + 1)}
                            >
                                {day}
                            </Button>
                        )
                    })}
                </div>

                {/* Detailed weather for selected day */}
                {selectedDayWeather && (
                    <div className="space-y-4 pt-4 border-t mt-4">
                        <p className="text-lg font-bold">Details for {selectedDayWeather.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-monastery-gold"><Zap className="h-4 w-4" /> UV Index</span>
                            <span className="font-medium text-foreground">{selectedDayWeather.uvIndex} (Extreme)</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-himalayan-blue"><Wind className="h-4 w-4" /> Wind</span>
                            <span className="font-medium text-foreground">{selectedDayWeather.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-monastery-gold"><Sunrise className="h-4 w-4" /> Sunrise</span>
                            <span className="font-medium text-foreground">{selectedDayWeather.sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-himalayan-blue"><Sunset className="h-4 w-4" /> Sunset</span>
                            <span className="font-medium text-foreground">{selectedDayWeather.sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                )}
                </>
              )}
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-monastery-gold" />
                Visitor Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Write a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nearby Services Map & Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-monastery-gold" />
            Nearby Services
          </CardTitle>
          <p className="text-muted-foreground">Explore essential services around Rumtek Monastery.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button size="sm" variant={activeMapFilter === 'accommodation' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('accommodation')} className={activeMapFilter === 'accommodation' ? 'bg-gradient-monastery' : ''}>
              <Hotel className="h-4 w-4 mr-2" /> Accommodation
            </Button>
            <Button size="sm" variant={activeMapFilter === 'restaurants' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('restaurants')} className={activeMapFilter === 'restaurants' ? 'bg-gradient-monastery' : ''}>
              <Utensils className="h-4 w-4 mr-2" /> Restaurants
            </Button>
            <Button size="sm" variant={activeMapFilter === 'parking' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('parking')} className={activeMapFilter === 'parking' ? 'bg-gradient-monastery' : ''}>
              <ParkingSquare className="h-4 w-4 mr-2" /> Parking
            </Button>
            <Button size="sm" variant={activeMapFilter === 'washrooms' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('washrooms')} className={activeMapFilter === 'washrooms' ? 'bg-gradient-monastery' : ''}>
              <PersonStanding className="h-4 w-4 mr-2" /> Washrooms
            </Button>
            <Button size="sm" variant={activeMapFilter === 'police' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('police')} className={activeMapFilter === 'police' ? 'bg-gradient-monastery' : ''}>
              <Siren className="h-4 w-4 mr-2" /> Police
            </Button>
            <Button size="sm" variant={activeMapFilter === 'hospitals' ? 'default' : 'outline'} onClick={() => setActiveMapFilter('hospitals')} className={activeMapFilter === 'hospitals' ? 'bg-gradient-monastery' : ''}>
              <HeartPulse className="h-4 w-4 mr-2" /> Hospitals
            </Button>
          </div>
          <NearbyServicesMap filter={activeMapFilter} services={services} />

          <div className="mt-6">
            <h3 className="text-xl font-bold font-playfair mb-4 capitalize">
              Nearby {activeMapFilter}
            </h3>
            {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredServices.map((service) => (
                        <Card key={service.id} className="group hover:shadow-monastery transition-all duration-300">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted p-3 rounded-md">
                                            {getIcon(service.category)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold group-hover:text-monastery-gold">
                                                {service.name}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">{service.type}</p>
                                        </div>
                                    </div>
                                    {service.rating && (
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{service.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" size="sm" className="w-full">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Get Directions
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-4">
                    No services found for this category.
                </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RumtekMonasteryPage;