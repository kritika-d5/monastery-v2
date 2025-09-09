import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { NearbyServicesMap } from "@/components/NearbyServicesMap";
import { 
  Globe, 
  MapPin, 
  Eye, 
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
  Camera,
  ParkingSquare, 
  PersonStanding 
} from "lucide-react";
import rumtekImage from "@/assets/rumtek-monastery.jpg";

const RumtekMonasteryPage = () => {
  const tourRef = useRef<HTMLDivElement>(null);

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
  
  const [activeMapFilter, setActiveMapFilter] = useState("restaurants");

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

      {/* Nearby Services Map */}
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
          <NearbyServicesMap filter={activeMapFilter} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RumtekMonasteryPage;
