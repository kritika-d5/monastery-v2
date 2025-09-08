import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Camera } from "lucide-react";
import sikkimMapImage from "@/assets/sikkim-topographic-map.jpg";

export const SikkimMap = () => {
  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: { x: 45, y: 60 },
      type: "Main Gompa",
      established: "1966",
      visitors: "High",
      timings: "6:00 AM - 6:00 PM",
      description: "The largest monastery in Sikkim, seat of the Karmapa",
      difficulty: "Easy",
      virtualTour: true
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      location: { x: 25, y: 45 },
      type: "Nyingma School",
      established: "1705",
      visitors: "Medium",
      timings: "7:00 AM - 5:00 PM",
      description: "One of the oldest and most important monasteries",
      difficulty: "Moderate",
      virtualTour: true
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      location: { x: 35, y: 35 },
      type: "Sacred Site",
      established: "1717",
      visitors: "Low",
      timings: "6:00 AM - 6:00 PM",
      description: "Most sacred monastery with holy chorten",
      difficulty: "Challenging",
      virtualTour: false
    },
    {
      id: 4,
      name: "Enchey Monastery",
      location: { x: 55, y: 75 },
      type: "Nyingma School",
      established: "1909",
      visitors: "Medium",
      timings: "5:30 AM - 7:00 PM",
      description: "Located in Gangtok with city views",
      difficulty: "Easy",
      virtualTour: true
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      location: { x: 30, y: 50 },
      type: "Historical",
      established: "1701",
      visitors: "Low",
      timings: "6:00 AM - 5:30 PM",
      description: "First monastery established in Sikkim",
      difficulty: "Moderate",
      virtualTour: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Challenging": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVisitorColor = (visitors: string) => {
    switch (visitors) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Interactive Map */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl bg-gradient-monastery bg-clip-text text-transparent">
            Sacred Monasteries of Sikkim
          </CardTitle>
          <p className="text-muted-foreground">
            Explore monastery locations and click to learn more about each sacred site
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={sikkimMapImage} 
              alt="Interactive map of Sikkim monasteries" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10" />
            
            {/* Monastery Markers */}
            {monasteries.map((monastery) => (
              <button
                key={monastery.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ 
                  left: `${monastery.location.x}%`, 
                  top: `${monastery.location.y}%` 
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-tibetan-red rounded-full shadow-sacred animate-pulse group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-tibetan-red/20 rounded-full animate-ping" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-card border rounded-lg p-3 shadow-monastery min-w-[200px]">
                      <h4 className="font-semibold text-sm text-foreground">{monastery.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{monastery.type}</p>
                      <p className="text-xs text-muted-foreground">Est. {monastery.established}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getDifficultyColor(monastery.difficulty)}>
                          {monastery.difficulty}
                        </Badge>
                        {monastery.virtualTour && (
                          <Badge variant="secondary" className="text-xs">
                            <Camera className="w-3 h-3 mr-1" />
                            360°
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monastery Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monasteries.map((monastery) => (
          <Card key={monastery.id} className="group hover:shadow-monastery transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-playfair font-semibold text-lg text-foreground group-hover:text-monastery-gold transition-colors">
                  {monastery.name}
                </h3>
                {monastery.virtualTour && (
                  <Badge variant="secondary" className="text-xs">
                    <Camera className="w-3 h-3 mr-1" />
                    360°
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{monastery.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-monastery-gold" />
                  <span className="text-sm">{monastery.type}</span>
                  <Badge className={getDifficultyColor(monastery.difficulty)}>
                    {monastery.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-himalayan-blue" />
                  <span className="text-sm">{monastery.timings}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className={`h-4 w-4 ${getVisitorColor(monastery.visitors)}`} />
                  <span className="text-sm">{monastery.visitors} crowd density</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                {monastery.virtualTour ? (
                  <Button size="sm" className="flex-1 bg-gradient-monastery hover:shadow-monastery">
                    Take Virtual Tour
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="flex-1">
                    Plan Visit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};