import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Camera, Navigation, Mountain, Star } from "lucide-react";
import { useState } from "react";
import sikkimMapImage from "@/assets/sikkim-topographic-map.jpg";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import pemayangtseImage from "@/assets/pemayangtse-monastery.jpg";
import tashidingImage from "@/assets/tashiding-monastery.jpg";

export const InteractiveSikkimMap = () => {
  const [selectedMonastery, setSelectedMonastery] = useState<number | null>(null);

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: { x: 65, y: 45 },
      type: "Karma Kagyu Gompa",
      established: "1966",
      visitors: "High",
      timings: "6:00 AM - 6:00 PM",
      description: "The largest monastery in Sikkim, seat of the 17th Karmapa. Known for its golden stupa and sacred relics.",
      difficulty: "Easy",
      virtualTour: true,
      elevation: "1,547m",
      nearbyCity: "Gangtok (24km)",
      image: rumtekImage,
      highlights: ["Golden Stupa", "Sacred Relics", "Main Prayer Hall", "Monastery Museum"],
      bestTime: "March-May, Oct-Dec"
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      location: { x: 25, y: 55 },
      type: "Nyingma School",
      established: "1705",
      visitors: "Medium",
      timings: "7:00 AM - 5:00 PM",
      description: "One of the oldest and most important monasteries, offering stunning views of Kanchenjunga.",
      difficulty: "Moderate",
      virtualTour: true,
      elevation: "2,085m",
      nearbyCity: "Pelling (2km)",
      image: pemayangtseImage,
      highlights: ["7-Tiered Wooden Structure", "Kanchenjunga Views", "Ancient Sculptures", "Monastery Library"],
      bestTime: "Oct-Dec, Mar-May"
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      location: { x: 35, y: 65 },
      type: "Sacred Pilgrimage Site",
      established: "1717",
      visitors: "Low",
      timings: "6:00 AM - 6:00 PM",
      description: "Most sacred monastery with the holy Thongwa Rangdol chorten that purifies sins.",
      difficulty: "Challenging",
      virtualTour: true,
      elevation: "1,465m",
      nearbyCity: "Yuksom (40km)",
      image: tashidingImage,
      highlights: ["Sacred Chorten", "Pilgrimage Path", "Holy Water", "Bumchu Festival"],
      bestTime: "Feb-Mar (Bumchu), Oct-Nov"
    },
    {
      id: 4,
      name: "Enchey Monastery",
      location: { x: 70, y: 40 },
      type: "Nyingma School",
      established: "1909",
      visitors: "Medium",
      timings: "5:30 AM - 7:00 PM",
      description: "Located in Gangtok with panoramic city views and traditional architecture.",
      difficulty: "Easy",
      virtualTour: true,
      elevation: "1,650m",
      nearbyCity: "Gangtok (3km)",
      image: rumtekImage,
      highlights: ["City Views", "Traditional Architecture", "Cham Dance", "Meditation Hall"],
      bestTime: "Year Round"
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      location: { x: 20, y: 70 },
      type: "Historical Heritage",
      established: "1701",
      visitors: "Low",
      timings: "6:00 AM - 5:30 PM",
      description: "Sikkim's first monastery with immense historical significance and forest setting.",
      difficulty: "Moderate",
      virtualTour: true,
      elevation: "2,100m",
      nearbyCity: "Yuksom (5km)",
      image: pemayangtseImage,
      highlights: ["First Monastery", "Forest Trek", "Historical Artifacts", "Meditation Caves"],
      bestTime: "Oct-Dec, Mar-May"
    },
    {
      id: 6,
      name: "Phensang Monastery",
      location: { x: 80, y: 30 },
      type: "Nyingma School",
      established: "1721",
      visitors: "Low",
      timings: "6:00 AM - 6:00 PM",
      description: "Serene monastery known for its peaceful environment and traditional teachings.",
      difficulty: "Easy",
      virtualTour: false,
      elevation: "1,400m",
      nearbyCity: "Gangtok (15km)",
      image: tashidingImage,
      highlights: ["Peaceful Setting", "Traditional Teachings", "Mountain Views", "Prayer Wheels"],
      bestTime: "Year Round"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success border-success/30";
      case "Moderate": return "bg-warning/20 text-warning border-warning/30";
      case "Challenging": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getVisitorColor = (visitors: string) => {
    switch (visitors) {
      case "High": return "text-destructive";
      case "Medium": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Interactive Map */}
      <Card className="overflow-hidden border-monastery-gold/20 shadow-monastery">
        <CardHeader className="bg-gradient-peaceful">
          <CardTitle className="font-playfair text-3xl bg-gradient-monastery bg-clip-text text-transparent flex items-center gap-3">
            <Mountain className="h-8 w-8 text-monastery-gold" />
            Sacred Monasteries of Sikkim
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Explore monastery locations on our interactive topographical map. Click markers to discover each sacred site.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={sikkimMapImage} 
              alt="Detailed topographical map of Sikkim showing monastery locations" 
              className="w-full h-[700px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            
            {/* Monastery Markers */}
            {monasteries.map((monastery) => (
              <button
                key={monastery.id}
                onClick={() => setSelectedMonastery(selectedMonastery === monastery.id ? null : monastery.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ 
                  left: `${monastery.location.x}%`, 
                  top: `${monastery.location.y}%` 
                }}
              >
                <div className="relative">
                  <div className={`w-6 h-6 rounded-full shadow-monastery transition-all duration-300 ${
                    selectedMonastery === monastery.id 
                      ? 'bg-monastery-gold scale-150 ring-4 ring-monastery-gold/30' 
                      : 'bg-tibetan-red group-hover:scale-125 animate-pulse'
                  }`} />
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-tibetan-red/20 rounded-full animate-ping" />
                  
                  {/* Enhanced Tooltip */}
                  <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20 ${
                    selectedMonastery === monastery.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}>
                    <div className="bg-card border border-monastery-gold/30 rounded-xl p-4 shadow-monastery min-w-[280px] backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <img 
                          src={monastery.image} 
                          alt={monastery.name}
                          className="w-16 h-16 rounded-lg object-cover border border-monastery-gold/20"
                        />
                        <div className="flex-1">
                          <h4 className="font-playfair font-semibold text-foreground text-lg">{monastery.name}</h4>
                          <p className="text-sm text-muted-foreground">{monastery.type}</p>
                          <p className="text-xs text-muted-foreground">Est. {monastery.established}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mountain className="w-4 h-4 text-monastery-gold" />
                          <span>{monastery.elevation} • {monastery.nearbyCity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-himalayan-blue" />
                          <span>{monastery.timings}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${getVisitorColor(monastery.visitors)}`} />
                          <span>{monastery.visitors} crowd density</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className={getDifficultyColor(monastery.difficulty)}>
                          {monastery.difficulty}
                        </Badge>
                        {monastery.virtualTour && (
                          <Badge variant="secondary" className="bg-monastery-gold/20 text-monastery-gold border-monastery-gold/30">
                            <Camera className="w-3 h-3 mr-1" />
                            360° Tour
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-gradient-monastery hover:shadow-monastery"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to virtual tour
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Explore Details
                      </Button>
                    </div>
                  </div>
                </div>
              </button>
            ))}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-monastery-gold/30 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-tibetan-red rounded-full"></div>
                  <span>Monastery Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-monastery-gold rounded-full"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-3 h-3 text-monastery-gold" />
                  <span>Virtual Tour Available</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Monastery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monasteries.map((monastery) => (
          <Card key={monastery.id} className="group hover:shadow-monastery transition-all duration-300 border-monastery-gold/20">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={monastery.image} 
                alt={monastery.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {monastery.virtualTour && (
                  <Badge className="bg-monastery-gold text-white">
                    <Camera className="w-3 h-3 mr-1" />
                    360° Tour
                  </Badge>
                )}
                <Badge className={getDifficultyColor(monastery.difficulty)}>
                  {monastery.difficulty}
                </Badge>
              </div>
              
              {/* Quick Stats */}
              <div className="absolute bottom-3 left-3 text-white text-sm">
                <p className="font-semibold">{monastery.elevation}</p>
                <p className="text-white/80">{monastery.nearbyCity}</p>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-playfair font-bold text-xl text-foreground group-hover:text-monastery-gold transition-colors">
                    {monastery.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{monastery.type}</p>
                  <p className="text-xs text-muted-foreground">Established {monastery.established}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{monastery.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-himalayan-blue" />
                  <span>{monastery.timings}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className={`h-4 w-4 ${getVisitorColor(monastery.visitors)}`} />
                  <span>{monastery.visitors} crowd density</span>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Best Time to Visit:</p>
                  <p className="font-medium">{monastery.bestTime}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {monastery.highlights.slice(0, 3).map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-monastery-gold/30">
                      {highlight}
                    </Badge>
                  ))}
                  {monastery.highlights.length > 3 && (
                    <Badge variant="outline" className="text-xs border-monastery-gold/30">
                      +{monastery.highlights.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {monastery.virtualTour ? (
                  <Button size="sm" className="flex-1 bg-gradient-monastery hover:shadow-monastery">
                    <Camera className="h-4 w-4 mr-2" />
                    Virtual Tour
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="flex-1 border-monastery-gold/30 hover:bg-monastery-gold/10">
                    <MapPin className="h-4 w-4 mr-2" />
                    Plan Visit
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-monastery-gold/30 hover:bg-monastery-gold/10">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};