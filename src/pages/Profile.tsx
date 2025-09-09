import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Cake, MapPin, Globe, Edit, Mountain } from 'lucide-react';

type Profile = Tables<'profiles'>;

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth is done and there's no user, redirect to sign-in
    if (!authLoading && !user) {
      navigate('/auth/sign-in');
    }

    const fetchProfile = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-5 w-1/3 mx-auto mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
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
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto shadow-monastery">
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                        <AvatarFallback className="bg-muted">
                           <User className="h-12 w-12 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-playfair">{profile.full_name}</CardTitle>
                    <p className="text-muted-foreground">{user?.email}</p>
                </CardHeader>
                <CardContent className="mt-6 space-y-6">
                    <div className="flex items-center">
                        <Cake className="h-5 w-5 mr-4 text-monastery-gold" />
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-medium ml-2">{profile.age}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-4 text-monastery-gold" />
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium ml-2">{profile.city}, {profile.country}</span>
                    </div>
                    <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-4 text-monastery-gold" />
                        <span className="text-muted-foreground">Language Preference:</span>
                        <span className="font-medium ml-2 capitalize">{profile.language_pref}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile (Coming Soon)
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8">
                    <div className="flex items-center gap-2">
                        <Mountain className="h-8 w-8 text-monastery-gold" />
                        <span className="font-playfair text-xl font-bold bg-gradient-monastery bg-clip-text text-transparent">MonasteryExplorer</span>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">Preserving Sikkim's sacred heritage through immersive technology and cultural appreciation.</p>
                </div>
            </div>
            <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
                <p className="text-xs leading-5 text-muted-foreground">&copy; 2024 MonasteryExplorer. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </main>
  );
};

export default ProfilePage;