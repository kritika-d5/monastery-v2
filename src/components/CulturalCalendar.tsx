import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react";
import { useState } from "react";

export const CulturalCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const festivals = [
    {
      id: 1,
      name: "Losar (Tibetan New Year)",
      date: "February 10-12, 2024",
      month: 1,
      monastery: "All Monasteries",
      type: "Major Festival",
      description: "Three-day celebration marking the Tibetan New Year with prayers, dances, and traditional foods.",
      duration: "3 days",
      participants: "Open to all",
      significance: "Most important Buddhist festival in Sikkim",
      activities: ["Cham Dances", "Prayer Ceremonies", "Traditional Feasts", "Butter Sculptures"]
    },
    {
      id: 2,
      name: "Saga Dawa",
      date: "May 23, 2024",
      month: 4,
      monastery: "Rumtek, Pemayangtse",
      type: "Sacred Observance",
      description: "Celebrates Buddha's birth, enlightenment, and death. Most auspicious day for merit-making.",
      duration: "1 day",
      participants: "Devotees welcome",
      significance: "Triple blessed day - birth, enlightenment, and parinirvana of Buddha",
      activities: ["Meditation Sessions", "Merit-making", "Offerings", "Scripture Reading"]
    },
    {
      id: 3,
      name: "Bumchu Festival",
      date: "March 15, 2024",
      month: 2,
      monastery: "Tashiding Monastery",
      type: "Sacred Water Ceremony",
      description: "Sacred water ceremony where holy water blessed the previous year is distributed.",
      duration: "1 day",
      participants: "Pilgrims and locals",
      significance: "Prophecy through sacred water levels predicts the year ahead",
      activities: ["Holy Water Distribution", "Ritual Prayers", "Pilgrimage", "Divination"]
    },
    {
      id: 4,
      name: "Phang Lhabsol",
      date: "August 28, 2024",
      month: 7,
      monastery: "All major monasteries",
      type: "Guardian Deity Festival",
      description: "Honors Mount Khangchendzonga, the guardian deity of Sikkim.",
      duration: "1 day",
      participants: "State holiday - all welcome",
      significance: "Unity of different communities in Sikkim under Khangchendzonga's protection",
      activities: ["Mask Dances", "Warrior Dances", "Traditional Music", "Community Feast"]
    },
    {
      id: 5,
      name: "Drukpa Kunley Festival",
      date: "September 15, 2024",
      month: 8,
      monastery: "Druk Sangag Choeling",
      type: "Spiritual Celebration",
      description: "Celebrates the divine madman saint known for unconventional teaching methods.",
      duration: "2 days",
      participants: "Buddhist practitioners",
      significance: "Honors non-conventional path to enlightenment",
      activities: ["Spiritual Teachings", "Cultural Performances", "Traditional Arts", "Community Gathering"]
    },
    {
      id: 6,
      name: "Drupka Teshi",
      date: "June 4, 2024",
      month: 5,
      monastery: "Enchey, Rumtek",
      type: "Dharma Festival",
      description: "Celebrates Buddha's first sermon at Sarnath after his enlightenment.",
      duration: "1 day",
      participants: "All devotees",
      significance: "Turning of the Wheel of Dharma",
      activities: ["Dharma Teachings", "Group Meditation", "Sutra Chanting", "Merit Dedication"]
    }
  ];

  const upcomingFestivals = festivals.filter(festival => {
    const currentMonth = new Date().getMonth();
    return festival.month >= currentMonth;
  }).slice(0, 3);

  const currentMonthFestivals = festivals.filter(festival => festival.month === selectedMonth);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Major Festival": return "bg-tibetan-red text-white";
      case "Sacred Observance": return "bg-monastery-gold text-white";
      case "Sacred Water Ceremony": return "bg-himalayan-blue text-white";
      case "Guardian Deity Festival": return "bg-gradient-peaceful text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-2xl bg-gradient-monastery bg-clip-text text-transparent flex items-center gap-2">
            <Calendar className="h-6 w-6 text-monastery-gold" />
            Upcoming Sacred Events
          </CardTitle>
          <p className="text-muted-foreground">
            Join the spiritual celebrations at Sikkim's monasteries
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {upcomingFestivals.map((festival) => (
              <Card key={festival.id} className="border-l-4 border-monastery-gold hover:shadow-monastery transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-playfair font-semibold text-lg">{festival.name}</h3>
                        <Badge className={getTypeColor(festival.type)}>
                          {festival.type}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground text-sm">{festival.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-monastery-gold" />
                          <span>{festival.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-himalayan-blue" />
                          <span>{festival.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-tibetan-red" />
                          <span>{festival.monastery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-green-600" />
                          <span>{festival.participants}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-1" />
                        Remind Me
                      </Button>
                      <Button size="sm" className="bg-gradient-monastery hover:shadow-monastery">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-xl">Festival Calendar</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {months.map((month, index) => (
              <Button
                key={month}
                variant={selectedMonth === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(index)}
                className={selectedMonth === index ? "bg-gradient-monastery" : ""}
              >
                {month}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {currentMonthFestivals.length > 0 ? (
            <div className="grid gap-4">
              {currentMonthFestivals.map((festival) => (
                <Card key={festival.id} className="hover:shadow-peaceful transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-playfair font-semibold">{festival.name}</h3>
                        <Badge className={getTypeColor(festival.type)}>
                          {festival.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{festival.significance}</p>
                      
                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm mb-2">Festival Activities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {festival.activities.map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No festivals scheduled for {months[selectedMonth]}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Check other months to discover upcoming sacred celebrations
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};