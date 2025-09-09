import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/types/database.types";
type Itinerary = Database["public"]["Tables"]["itineraries"]["Row"];
type TravelAgent = Database["public"]["Tables"]["travel_agents"]["Row"];

import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Cloud,
  Sun,
  CloudRain,
  Mountain,
  Route,
  Save,
  Download,
  Share,
  Briefcase,
  ExternalLink,
  Phone,
  Mail,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { InteractiveSikkimMap } from "@/components/InteractiveSikkimMap";
import { CulturalCalendar } from "@/components/CulturalCalendar";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const JourneyPlanner = () => {
  const [selectedTab, setSelectedTab] = useState("planner");
  const [journeyData, setJourneyData] = useState({
    travelers: 2,
    duration: 3,
    interests: [] as string[],
    accessibility: "moderate",
    startDate: ""
  });

  const [recommendedItineraries, setRecommendedItineraries] = useState<any[]>([]);
  const [travelAgents, setTravelAgents] = useState<TravelAgent[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingItinerary, setPendingItinerary] = useState<string | null>(null);

  const weatherData = [
    { day: "Today", temp: "18°C", condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
    { day: "Tomorrow", temp: "22°C", condition: "Sunny", icon: <Sun className="h-5 w-5" /> },
    { day: "Thu", temp: "16°C", condition: "Light Rain", icon: <CloudRain className="h-5 w-5" /> },
    { day: "Fri", temp: "20°C", condition: "Sunny", icon: <Sun className="h-5 w-5" /> },
    { day: "Sat", temp: "19°C", condition: "Partly Cloudy", icon: <Cloud className="h-5 w-5" /> },
  ];

  const interests = [
    "Buddhist Philosophy", "Architecture", "Photography", "Meditation", 
    "Cultural Events", "Trekking", "Local Cuisine", "Art & Crafts", 
    "History", "Spirituality", "Nature", "Adventure"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchItineraries = async () => {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .order("duration_days", { ascending: true });

      if (error) {
        console.error("Error fetching itineraries:", error.message);
      } else {
        const mapped = data.map((i) => ({
          id: i.id,
          title: i.title,
          duration: `${i.duration_days} Days`,
          difficulty: i.difficulty,
          highlights: i.highlights || [],
          description: i.description,
          monasteries: i.num_monasteries,
          travelTime: i.total_hours,
          bestSeason: i.season
        }));
        setRecommendedItineraries(mapped);
      }
    };
    
    const fetchTravelAgents = async () => {
      const { data, error } = await supabase
        .from("travel_agents")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching travel agents:", error.message);
      } else {
        setTravelAgents(data);
      }
    };

    fetchItineraries();
    fetchTravelAgents();
  }, []);

  const addToBucketlist = async (itineraryId: string) => {
  if (!user) {
    setPendingItinerary(itineraryId);
    setLoginModalOpen(true);
    return;
  }

  // ✅ Get the user's profile row
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profileData) {
    console.error("Error fetching profile:", profileError);
    console.log("Could not fetch your profile. Please try again.");
    return;
  }

  const profileId = profileData.id;

  // ✅ Insert into bucketlist with correct profile_id
  const { error } = await supabase.from("bucketlist").insert([
    { profile_id: profileId, itinerary_id: itineraryId },
  ]);

  if (error) {
    console.error("Error adding to bucketlist:", error);
    if (error.code === "23505") {
      console.log("This itinerary is already in your bucketlist.");
    } else {
      console.log("Could not add itinerary. Please try again.");
    }
  } else {
    console.log("Itinerary added to your bucketlist!");
  }
};


  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const tabs = [
    { id: "planner", label: "Journey Planner", icon: <Route className="h-4 w-4" /> },
    { id: "agents", label: "Travel Agents", icon: <Briefcase className="h-4 w-4" /> },
    { id: "map", label: "Interactive Map", icon: <MapPin className="h-4 w-4" /> },
    { id: "calendar", label: "Cultural Calendar", icon: <Calendar className="h-4 w-4" /> }
  ];

  const toggleInterest = (interest: string) => {
    setJourneyData(prevData => ({
      ...prevData,
      interests: prevData.interests.includes(interest)
        ? prevData.interests.filter(i => i !== interest)
        : [...prevData.interests, interest]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
          Plan Your Sacred Journey
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Create personalized itineraries for exploring Sikkim's monasteries with smart recommendations, 
          weather updates, and cultural insights
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                  selectedTab === tab.id
                    ? "border-b-2 border-monastery-gold text-monastery-gold bg-monastery-gold/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTab === "planner" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-xl">Journey Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Input
                      id="travelers"
                      type="number"
                      min="1"
                      max="20"
                      value={journeyData.travelers}
                      onChange={(e) => setJourneyData({...journeyData, travelers: parseInt(e.target.value)})}
                      className="border-monastery-gold/20 focus:border-monastery-gold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (Days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="14"
                      value={journeyData.duration}
                      onChange={(e) => setJourneyData({...journeyData, duration: parseInt(e.target.value)})}
                      className="border-monastery-gold/20 focus:border-monastery-gold"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={journeyData.startDate}
                    onChange={(e) => setJourneyData({...journeyData, startDate: e.target.value})}
                    className="border-monastery-gold/20 focus:border-monastery-gold"
                  />
                </div>

                <div>
                  <Label>Accessibility Level</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["easy", "moderate", "challenging"].map((level) => (
                      <Button
                        key={level}
                        variant={journeyData.accessibility === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setJourneyData({...journeyData, accessibility: level})}
                        className={journeyData.accessibility === level ? "bg-gradient-monastery" : ""}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Your Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={journeyData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          journeyData.interests.includes(interest)
                            ? "bg-monastery-gold hover:bg-monastery-gold/80"
                            : "hover:bg-monastery-gold/10"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-monastery hover:shadow-monastery">
                  Generate Personalized Itinerary
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-lg flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-himalayan-blue" />
                  Weather Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="text-himalayan-blue">{day.icon}</div>
                        <div>
                          <p className="font-medium">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{day.temp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-playfair">Recommended Itineraries</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save All
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {recommendedItineraries.map((itinerary) => (
                <Card key={itinerary.id} className="hover:shadow-monastery transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold font-playfair text-monastery-gold">
                          {itinerary.title}
                        </h3>
                        <p className="text-muted-foreground">{itinerary.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{itinerary.duration}</Badge>
                        <Badge className="bg-gradient-monastery text-white">{itinerary.difficulty}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-monastery-gold" />
                        <span>{itinerary.groupType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mountain className="h-4 w-4 text-himalayan-blue" />
                        <span>{itinerary.monasteries} Monasteries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-tibetan-red" />
                        <span>{itinerary.travelTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span>{itinerary.bestSeason}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {itinerary.highlights.map((highlight: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-monastery hover:shadow-monastery" onClick={() => addToBucketlist(itinerary.id)}>
                        Select This Itinerary
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "agents" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-playfair mb-4">Recommended Travel Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelAgents.map((agent) => (
              <Card key={agent.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl flex items-center gap-2">
                    {agent.name}
                    {agent.grade && <Badge variant="secondary">{agent.grade}</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-monastery-gold" />
                      <span>{agent.address}</span>
                    </div>
                    {agent.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-monastery-gold" />
                        <a href={`tel:${agent.phone}`} className="hover:underline">{agent.phone}</a>
                      </div>
                    )}
                    {agent.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-monastery-gold" />
                        <a href={`mailto:${agent.email}`} className="hover:underline">{agent.email}</a>
                      </div>
                    )}
                  </div>
                  {agent.services && (
                    <div className="space-y-1">
                      <p className="font-semibold">Services:</p>
                      <p className="text-muted-foreground">{agent.services}</p>
                    </div>
                  )}
                  {agent.health_safety_compliant !== null && (
                    <div className="flex items-center gap-2">
                      {agent.health_safety_compliant ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <p className="font-medium">Health & Safety Compliant</p>
                    </div>
                  )}
                </CardContent>
                <div className="p-6 pt-0">
                  {agent.booking_link && (
                    <a href={agent.booking_link} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full bg-gradient-monastery hover:shadow-monastery"
                      >
                        Book Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "map" && (
        <div className="space-y-6">
          <InteractiveSikkimMap />
        </div>
      )}

      {selectedTab === "calendar" && (
        <div className="space-y-6">
          <CulturalCalendar />
        </div>
      )}

      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please login to save itineraries to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setLoginModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-monastery-gold" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JourneyPlanner;