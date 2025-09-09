"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, Star, Camera, Ticket, ChevronLeft, ChevronRight, PlusCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

// Using images from your assets as placeholders
import muralImage from "@/assets/mural-1.jpg";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import pemayangtseImage from "@/assets/pemayangtse-monastery.jpg";
import tashidingImage from "@/assets/tashiding-monastery.jpg";
import heroImage from "@/assets/hero-monastery.jpg";


export function CulturalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"month" | "list">("month")
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const events = [
    // ... (keep the same events array from the previous step) ...
     {
      id: "losar-2025",
      title: "Losar - Tibetan New Year",
      date: new Date(2025, 1, 28), // Feb 28, 2025
      monastery: "All Monasteries",
      type: "religious",
      description: "The most important festival in Tibetan Buddhism, celebrating the new year with prayers, dances, and traditional foods.",
      duration: "3 days",
      significance: "Marks the beginning of the Tibetan calendar year",
      activities: ["Cham Dance", "Prayer ceremonies", "Traditional feast", "Butter lamp lighting"],
      image: muralImage,
      ticketRequired: false,
      bestTime: "Morning ceremonies start at 6 AM",
      crowdLevel: "High",
    },
    {
      id: "saga-dawa-2025",
      title: "Saga Dawa",
      date: new Date(2025, 5, 12), // June 12, 2025
      monastery: "Rumtek Monastery",
      type: "religious",
      description: "Commemorates Buddha's birth, enlightenment, and death. One of the most sacred days in Buddhism.",
      duration: "1 day",
      significance: "Triple blessed day for merit-making",
      activities: ["Circumambulation", "Merit-making activities", "Meditation sessions"],
      image: rumtekImage,
      ticketRequired: false,
      bestTime: "Dawn to dusk",
      crowdLevel: "Very High",
    },
    {
      id: "bumchu-2025",
      title: "Bumchu Festival",
      date: new Date(2025, 2, 6), // March 6, 2025
      monastery: "Tashiding Monastery",
      type: "ritual",
      description: "Sacred water ceremony where holy water levels predict the coming year's fortune.",
      duration: "1 day",
      significance: "Ancient divination ritual for the year ahead",
      activities: ["Holy water ceremony", "Prayers for prosperity", "Community gathering"],
      image: tashidingImage,
      ticketRequired: false,
      bestTime: "Early morning ceremony",
      crowdLevel: "Medium",
    },
    {
      id: "phang-lhabsol-2025",
      title: "Phang Lhabsol",
      date: new Date(2025, 8, 2), // Sep 2, 2025
      monastery: "All Major Monasteries",
      type: "performance",
      description: "A festival unique to Sikkim, honouring Mt. Khangchendzonga as the guardian deity.",
      duration: "1 day",
      significance: "Celebrates the unity and protection of Sikkim",
      activities: ["Warrior dances (Pangtoed Chaam)", "Traditional music", "Community feast"],
      image: heroImage,
      ticketRequired: false,
      bestTime: "Afternoon",
      crowdLevel: "High",
    },
    {
      id: "holi-2025",
      title: "Holi",
      date: new Date(2025, 2, 14), // March 14, 2025
      monastery: "India-wide",
      type: "cultural",
      description: "The vibrant Hindu festival of colors, celebrating the arrival of spring and the victory of good over evil.",
      duration: "1 day",
      significance: "Festival of Colors and Love",
      activities: ["Playing with colors", "Bonfires", "Traditional sweets", "Community gatherings"],
      image: "https://images.unsplash.com/photo-1583324188344-32d5257c9a62",
      ticketRequired: false,
      bestTime: "Morning to Afternoon",
      crowdLevel: "High",
    },
    {
      id: "diwali-2025",
      title: "Diwali",
      date: new Date(2025, 9, 21), // Oct 21, 2025
      monastery: "India-wide",
      type: "cultural",
      description: "The Hindu festival of lights, symbolizing the spiritual victory of light over darkness.",
      duration: "5 days",
      significance: "Festival of Lights",
      activities: ["Lighting oil lamps (diyas)", "Fireworks", "Family feasts", "Exchanging gifts"],
      image: "https://images.unsplash.com/photo-1542888264-d625a3b20248",
      ticketRequired: false,
      bestTime: "Evening",
      crowdLevel: "Very High",
    },
    {
      id: "eid-2025",
      title: "Eid al-Fitr",
      date: new Date(2025, 2, 30), // March 30, 2025
      monastery: "India-wide",
      type: "cultural",
      description: "Marks the end of Ramadan, the Islamic holy month of fasting. A day of celebration and feasting.",
      duration: "1 day",
      significance: "Conclusion of month-long fasting",
      activities: ["Special prayers", "Charitable acts", "Family visits", "Festive meals"],
      image: "https://images.unsplash.com/photo-1588123223075-3c1a32b1a5e1",
      ticketRequired: false,
      bestTime: "All day",
      crowdLevel: "High",
    },
    {
      id: "christmas-2025",
      title: "Christmas",
      date: new Date(2025, 11, 25), // Dec 25, 2025
      monastery: "Worldwide",
      type: "cultural",
      description: "Christian festival celebrating the birth of Jesus Christ.",
      duration: "1 day",
      significance: "Birth of Jesus",
      activities: ["Church services", "Carol singing", "Feasting", "Gift exchange"],
      image: "https://images.unsplash.com/photo-1513297887114-1d3b2a209c11",
      ticketRequired: false,
      bestTime: "All day",
      crowdLevel: "Medium",
    },
  ];

  const handleSaveEvent = async (event: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save events to your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Format date to 'YYYY-MM-DD' for Supabase 'date' type
    const eventDate = new Date(event.date).toISOString().split('T')[0];

    const { error } = await supabase.from('saved_events').insert({
      user_id: user.id,
      event_id: event.id,
      event_title: event.title,
      event_date: eventDate,
    });

    if (error) {
      toast({
        title: "Error Saving Event",
        description: error.code === '23505' ? "You have already saved this event." : error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Event Saved!",
        description: (
          <p>
            {event.title} has been added to your profile.
            <Link to="/profile" className="font-bold text-monastery-gold underline ml-2">
              View Profile
            </Link>
          </p>
        ),
      });
    }
    setIsSaving(false);
  };
  
  // ... (keep all the other functions like monthNames, getDaysInMonth, renderCalendar, etc.)
  const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getEventsForDate = (date: Date) => events.filter((event) => new Date(event.date).toDateString() === date.toDateString());
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "religious": return "bg-red-500/10 text-red-700 hover:bg-red-500/20";
      case "cultural": return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20";
      case "ritual": return "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20";
      case "performance": return "bg-green-500/10 text-green-700 hover:bg-green-500/20";
      default: return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(direction === "prev" ? prev.getMonth() - 1 : prev.getMonth() + 1)
      return newDate
    })
  }
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    for (let i = 0; i < firstDay; i++) { days.push(<div key={`empty-${i}`} className="h-24 border-t border-r border-border"></div>) }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      days.push(
        <div key={day} className={`h-24 border-t border-r border-border p-1 ${isToday ? "bg-primary/5 border-primary" : "hover:bg-muted/50"}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <Dialog key={event.id}><DialogTrigger asChild><div className={`text-xs p-1 rounded cursor-pointer truncate ${getEventTypeColor(event.type)}`} onClick={() => setSelectedEvent(event)}>{event.title}</div></DialogTrigger></Dialog>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }
    return days
  }
  const upcomingEvents = events.filter((event) => event.date >= new Date()).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 6);

  return (
    <div className="space-y-6">
       {/* ... (The UI for View Toggle, Month View, and List View remains the same) ... */}
       <div className="flex justify-center"><div className="flex bg-muted rounded-lg p-1"><Button variant={viewMode === "month" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("month")} className={viewMode === 'month' ? 'bg-gradient-monastery' : ''}><Calendar className="h-4 w-4 mr-2" /> Month View</Button><Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className={viewMode === 'list' ? 'bg-gradient-monastery' : ''}>List View</Button></div></div>
      {viewMode === "month" ? (<div className="grid grid-cols-1 lg:grid-cols-4 gap-6"><div className="lg:col-span-3"><Card><CardHeader><div className="flex items-center justify-between"><CardTitle className="text-2xl font-playfair">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</CardTitle><div className="flex space-x-2"><Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}><ChevronLeft className="h-4 w-4" /></Button><Button variant="outline" size="sm" onClick={() => navigateMonth("next")}><ChevronRight className="h-4 w-4" /></Button></div></div></CardHeader><CardContent><div className="grid grid-cols-7 text-center font-medium text-muted-foreground border-t border-x">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (<div key={day} className="py-2 border-b border-r">{day}</div>))}</div><div className="grid grid-cols-7 border-l border-b">{renderCalendar()}</div></CardContent></Card></div><div className="space-y-6"><Card><CardHeader><CardTitle className="text-lg font-playfair">Upcoming Events</CardTitle></CardHeader><CardContent className="space-y-3">{upcomingEvents.map((event) => (<Dialog key={event.id}><DialogTrigger asChild><div className="p-3 rounded-lg border hover:bg-muted cursor-pointer" onClick={() => setSelectedEvent(event)}><div className="flex items-center justify-between mb-1"><h4 className="font-medium text-sm">{event.title}</h4><Badge variant="secondary" className="text-xs capitalize">{event.type}</Badge></div><p className="text-xs text-muted-foreground flex items-center"><Calendar className="h-3 w-3 mr-1" />{event.date.toLocaleDateString()}</p></div></DialogTrigger></Dialog>))}</CardContent></Card><Card><CardHeader><CardTitle className="text-lg font-playfair">Event Types</CardTitle></CardHeader><CardContent className="space-y-2"><div className="flex items-center space-x-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm">Religious Festivals</span></div><div className="flex items-center space-x-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm">Cultural Events</span></div><div className="flex items-center space-x-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><span className="text-sm">Ritual Ceremonies</span></div><div className="flex items-center space-x-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Performances</span></div></CardContent></Card></div></div>
      ) : ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{events.map((event) => (<Card key={event.id} className="overflow-hidden hover:shadow-monastery transition-shadow"><div className="relative aspect-video"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /><Badge className="absolute top-2 left-2 bg-primary capitalize">{event.type}</Badge><div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded px-2 py-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="text-white text-xs">4.9</span></div></div><CardContent className="p-4"><CardHeader className="p-0 mb-3"><CardTitle className="text-lg font-playfair">{event.title}</CardTitle><CardDescription className="flex items-center justify-between"><span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{event.monastery}</span><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{event.date.toLocaleDateString()}</span></CardDescription></CardHeader><p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p><div className="flex items-center justify-between text-sm text-muted-foreground mb-4"><div className="flex items-center"><Clock className="h-4 w-4 mr-1" /><span>{event.duration}</span></div><div className="flex items-center"><Users className="h-4 w-4 mr-1" /><span>{event.crowdLevel}</span></div></div><Dialog><DialogTrigger asChild><Button className="w-full bg-gradient-monastery hover:shadow-monastery" onClick={() => setSelectedEvent(event)}>View Details</Button></DialogTrigger></Dialog></CardContent></Card>))}</div>)}

      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* The Dialog Header and Tabs section remain the same */}
            <DialogHeader><DialogTitle className="flex items-center text-2xl font-playfair"><Calendar className="h-6 w-6 mr-2 text-primary" />{selectedEvent.title}</DialogTitle><DialogDescription className="flex items-center space-x-4 pt-2"><span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{selectedEvent.monastery}</span><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{selectedEvent.date.toLocaleDateString()}</span><Badge variant="secondary" className="capitalize">{selectedEvent.type}</Badge></DialogDescription></DialogHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activities">Activities</TabsTrigger><TabsTrigger value="planning">Planning</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4"><div className="aspect-video rounded-lg overflow-hidden border"><img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" /></div><div><p className="text-muted-foreground mb-4">{selectedEvent.description}</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Card><CardContent className="p-4"><h4 className="font-semibold mb-2 font-playfair">Event Details</h4><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Duration:</span><span>{selectedEvent.duration}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Best Time:</span><span>{selectedEvent.bestTime}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Crowd Level:</span><span>{selectedEvent.crowdLevel}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Ticket:</span><span>{selectedEvent.ticketRequired ? "Required" : "Not Required"}</span></div></div></CardContent></Card><Card><CardContent className="p-4"><h4 className="font-semibold mb-2 font-playfair">Cultural Significance</h4><p className="text-sm text-muted-foreground">{selectedEvent.significance}</p></CardContent></Card></div></div></TabsContent>
              <TabsContent value="activities" className="space-y-4 pt-4"><Card><CardContent className="p-6"><h4 className="font-semibold mb-4 font-playfair">Festival Activities</h4><ul className="space-y-2">{selectedEvent.activities.map((activity: string, index: number) => (<li key={index} className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-primary" />{activity}</li>))}</ul></CardContent></Card></TabsContent>
              <TabsContent value="planning" className="space-y-4 pt-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Card><CardContent className="p-4"><h4 className="font-semibold mb-4 font-playfair">What to Bring</h4><ul className="space-y-2 text-sm text-muted-foreground"><li>Comfortable walking shoes</li><li>Warm clothing</li><li>Camera (where permitted)</li><li>Respectful attire</li></ul></CardContent></Card><Card><CardContent className="p-4"><h4 className="font-semibold mb-4 font-playfair">Guidelines</h4><ul className="space-y-2 text-sm text-muted-foreground"><li>Arrive early for best viewing</li><li>Maintain silence during prayers</li><li>Follow photography rules</li><li>Respect local customs</li></ul></CardContent></Card></div></TabsContent>
            </Tabs>
            
            {/* MODIFIED BUTTON SECTION */}
            <div className="flex space-x-2 pt-4">
              <Button 
                className="flex-1 bg-gradient-monastery hover:shadow-monastery" 
                onClick={() => handleSaveEvent(selectedEvent)}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <PlusCircle className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Add to Profile'}
              </Button>
              <Button variant="outline" className="flex-1"><Camera className="h-4 w-4 mr-2" />Virtual Preview</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
