import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Play,
  Headphones,
  Globe,
  Filter
} from "lucide-react";
import { useState } from "react";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import pemayangtseImage from "@/assets/pemayangtse-monastery.jpg";
import tashidingImage from "@/assets/tashiding-monastery.jpg";

const ExploreVirtual = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const virtualTours = [
    {
      id: 1,
      name: "Rumtek Monastery",
      description: "Explore the largest monastery in Sikkim, home to the Karmapa lineage",
      location: "Rumtek, East Sikkim",
      established: "1966",
      type: "Karma Kagyu",
      difficulty: "Easy Access",
      duration: "45 minutes",
      rating: 4.8,
      reviews: 1247,
      languages: ["English", "Hindi", "Nepali", "Tibetan"],
      features: ["360° Views", "Audio Guide", "Historical Timeline", "Interactive Hotspots"],
      thumbnail: rumtekImage,
      isNew: false,
      isPopular: true
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      description: "One of Sikkim's oldest and most important Nyingma monasteries",
      location: "Pelling, West Sikkim",
      established: "1705",
      type: "Nyingma School",
      difficulty: "Moderate Access",
      duration: "35 minutes",
      rating: 4.7,
      reviews: 892,
      languages: ["English", "Hindi", "Nepali"],
      features: ["360° Views", "Sacred Sculptures", "Mountain Views", "Prayer Wheels"],
      thumbnail: pemayangtseImage,
      isNew: false,
      isPopular: true
    },
    {
      id: 3,
      name: "Tashiding Monastery",
      description: "The most sacred monastery in Sikkim with holy chorten",
      location: "Tashiding, West Sikkim", 
      established: "1717",
      type: "Sacred Site",
      difficulty: "Challenging Access",
      duration: "40 minutes",
      rating: 4.9,
      reviews: 567,
      languages: ["English", "Nepali", "Tibetan"],
      features: ["360° Views", "Sacred Chorten", "Pilgrimage Path", "Ritual Ceremonies"],
      thumbnail: tashidingImage,
      isNew: true,
      isPopular: false
    },
    {
      id: 4,
      name: "Enchey Monastery",
      description: "Beautiful monastery overlooking Gangtok city",
      location: "Gangtok, East Sikkim",
      established: "1909",
      type: "Nyingma School",
      difficulty: "Easy Access",
      duration: "25 minutes",
      rating: 4.6,
      reviews: 734,
      languages: ["English", "Hindi", "Nepali"],
      features: ["360° Views", "City Views", "Traditional Architecture", "Monk Quarters"],
      thumbnail: rumtekImage,
      isNew: false,
      isPopular: false
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      description: "Sikkim's first monastery with rich historical significance",
      location: "Yuksom, West Sikkim",
      established: "1701",
      type: "Historical",
      difficulty: "Moderate Access",
      duration: "30 minutes",
      rating: 4.5,
      reviews: 423,
      languages: ["English", "Nepali"],
      features: ["360° Views", "Historical Artifacts", "Forest Setting", "Ancient Murals"],
      thumbnail: pemayangtseImage,
      isNew: true,
      isPopular: false
    },
    {
      id: 6,
      name: "Ralang Monastery",
      description: "Kagyu monastery known for its annual Chaam dance",
      location: "Ralang, South Sikkim",
      established: "1768",
      type: "Kagyu School",
      difficulty: "Easy Access",
      duration: "35 minutes",
      rating: 4.4,
      reviews: 289,
      languages: ["English", "Hindi", "Nepali"],
      features: ["360° Views", "Dance Performances", "Prayer Halls", "Monastery Gardens"],
      thumbnail: tashidingImage,
      isNew: false,
      isPopular: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy Access": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Moderate Access": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Challenging Access": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTours = virtualTours.filter(tour =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
          Virtual Monastery Tours
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Immerse yourself in Sikkim's sacred monasteries through cutting-edge 360° virtual reality experiences
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search monasteries by name, type, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-monastery-gold/20 focus:border-monastery-gold"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border rounded-md border-monastery-gold/20 focus:border-monastery-gold bg-background"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="nepali">Nepali</option>
                <option value="tibetan">Tibetan</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <Card key={tour.id} className="group hover:shadow-monastery transition-all duration-300 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-peaceful overflow-hidden">
              <img 
                src={tour.thumbnail} 
                alt={tour.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {tour.isNew && (
                  <Badge className="bg-tibetan-red text-white">
                    New
                  </Badge>
                )}
                {tour.isPopular && (
                  <Badge className="bg-monastery-gold text-white">
                    Popular
                  </Badge>
                )}
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <Link to={tour.id === 1 ? "/virtual-tours/rumtek" : "#"}>
                  <Button size="lg" className="bg-white text-monastery-gold hover:bg-white/90">
                    <Play className="h-6 w-6 mr-2" />
                    Start Tour
                  </Button>
                </Link>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-playfair text-lg group-hover:text-monastery-gold transition-colors">
                    {tour.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{tour.type}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-muted-foreground">({tour.reviews})</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {tour.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-monastery-gold" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-himalayan-blue" />
                  <span>{tour.duration}</span>
                  <Badge className={getDifficultyColor(tour.difficulty)}>
                    {tour.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Available Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Features</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {tour.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-gradient-monastery hover:shadow-monastery">
                  <Camera className="h-4 w-4 mr-2" />
                  Start 360° Tour
                </Button>
                <Button variant="outline" size="sm">
                  <Headphones className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTours.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tours found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse all available virtual tours
            </p>
            <Button 
              onClick={() => setSearchQuery("")} 
              className="mt-4 bg-gradient-monastery"
            >
              View All Tours
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold font-playfair mb-4">
            Experience More with Premium Tours
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Unlock exclusive content, high-resolution imagery, expert commentary, 
            and offline downloads with our premium virtual tour collection.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-monastery-gold hover:bg-white/90">
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreVirtual;