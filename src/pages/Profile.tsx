import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Cake, MapPin, Globe, Edit, Calendar, Loader2, Trash2 } from 'lucide-react'; // Added Calendar, Loader2, Trash2
import { useToast } from '@/hooks/use-toast'; // Added useToast

type Profile = Tables<'profiles'>;
type Story = Tables<'stories'>;
type BucketList = Tables<'bucketlist'>;

// Define a type for our saved events
type SavedEvent = {
  id: string;
  event_id: string;
  event_title: string;
  event_date: string;
};

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize toast
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [bucketlist, setBucketlist] = useState<any[]>([]);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]); // State for saved events
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/sign-in');
    }

    const fetchData = async () => {
      if (user) {
        setLoading(true);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (profileError) console.error("Profile Error:", profileError);
        else setProfile(profileData);

        // Fetch stories
        const { data: storiesData, error: storiesError } = await supabase
          .from('stories')
          .select('*')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });
        if (storiesError) console.error("Stories Error:", storiesError);
        else setStories(storiesData || []);

        // Fetch bucket list
        if (profileData) {
            const { data: bucketData, error: bucketError } = await supabase
              .from('bucketlist')
              .select('*, itineraries(*)')
              .eq('profile_id', profileData.id);
            if (bucketError) console.error("Bucketlist Error:", bucketError);
            else setBucketlist(bucketData || []);
        }

        // Fetch saved events
        const { data: eventsData, error: eventsError } = await supabase
            .from('saved_events')
            .select('*')
            .eq('user_id', user.id)
            .order('event_date', { ascending: true });
        if (eventsError) console.error("Saved Events Error:", eventsError);
        else setSavedEvents(eventsData || []);


        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading, navigate]);
  
  const handleDeleteEvent = async (eventId: string) => {
    const { error } = await supabase
      .from('saved_events')
      .delete()
      .match({ id: eventId, user_id: user?.id });

    if (error) {
        toast({ title: "Error", description: "Could not remove the event.", variant: "destructive" });
    } else {
        setSavedEvents(savedEvents.filter(event => event.id !== eventId));
        toast({ title: "Event Removed", description: "The event has been removed from your reminders." });
    }
  };


  if (loading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-destructive">Could not load profile.</h2>
        <p className="text-muted-foreground">Please try logging out and signing in again.</p>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12 space-y-8">

        {/* === Profile Card === */}
        <Card className="w-full max-w-5xl mx-auto shadow-monastery">
             <CardHeader className="items-center text-center">
         <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
           <AvatarFallback className="bg-muted">
             <User className="h-12 w-12 text-muted-foreground" />
           </AvatarFallback>
         </Avatar>
         <CardTitle className="text-3xl font-playfair">{profile.full_name}</CardTitle>
         <p className="text-muted-foreground">{user?.email}</p>
       </CardHeader>
       <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
         <div className="flex items-center justify-center md:justify-start">
           <Cake className="h-5 w-5 mr-4 text-monastery-gold" />
           <div>
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium ml-2">{profile.age}</span>
           </div>
         </div>
         <div className="flex items-center justify-center md:justify-start">
           <MapPin className="h-5 w-5 mr-4 text-monastery-gold" />
           <div>
            <span className="text-muted-foreground">From:</span>
            <span className="font-medium ml-2">{profile.city}, {profile.country}</span>
           </div>
         </div>
         <div className="flex items-center justify-center md:justify-start">
           <Globe className="h-5 w-5 mr-4 text-monastery-gold" />
           <div>
            <span className="text-muted-foreground">Language:</span>
            <span className="font-medium ml-2 capitalize">{profile.language_pref}</span>
           </div>
         </div>
       </CardContent>
       <CardFooter>
         <Button variant="outline" className="w-full max-w-xs mx-auto">
           <Edit className="h-4 w-4 mr-2" />
           Edit Profile 
         </Button>
       </CardFooter>
        </Card>

        {/* === Grid for other sections === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
          {/* Festival Reminders */}
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-monastery-gold" />
                    Your Festival Reminders
                </CardTitle>
            </CardHeader>
            <CardContent>
                {savedEvents.length > 0 ? (
                    <div className="space-y-4">
                    {savedEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                        <div>
                            <p className="font-semibold">{event.event_title}</p>
                            <p className="text-sm text-muted-foreground">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                            })}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-6">You haven't saved any events yet.</p>
                )}
            </CardContent>
          </Card>

          {/* Shared Stories */}
          <Card>
            <CardHeader>
              <CardTitle>Your Shared Stories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stories.length === 0 ? (
                <p className="text-muted-foreground">You haven't shared any stories yet.</p>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="p-4 border rounded-md">
                    <p>{story.content}</p>
                    {story.image_url && <img src={story.image_url} alt="story" className="mt-2 w-full rounded" />}
                    <span className="text-xs text-muted-foreground">{new Date(story.created_at!).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Bucket List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Bucket List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bucketlist.length === 0 ? (
                <p className="text-muted-foreground">You haven't added any itineraries yet.</p>
              ) : (
                bucketlist.map((item) => (
                  <div key={item.id} className="p-4 border rounded-md">
                    <p className="font-medium">{item.itineraries?.[0]?.name || "Unnamed Itinerary"}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.added_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;