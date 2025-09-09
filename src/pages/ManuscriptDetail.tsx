import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Tables } from "../integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { ArrowLeft, BookOpen, Calendar, Languages, Share2, Download, History, Volume2, SlidersHorizontal, Lightbulb, Mountain } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

type Manuscript = Tables<'archive_items'>;
type RelatedItem = Pick<Tables<'archive_items'>, 'id' | 'title' | 'images' | 'type'>;

const ManuscriptDetail = () => {
  const { manuscriptId } = useParams<{ manuscriptId: string }>();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchManuscript = async () => {
      if (!manuscriptId) return;

      setLoading(true);
      setError(null);
      setManuscript(null);
      setRelatedItems([]);

      try {
        const { data, error } = await supabase
          .from('archive_items')
          .select('*')
          .eq('id', manuscriptId)
          .single();

        if (error) throw new Error("Could not fetch manuscript details. It may not exist.");
        setManuscript(data);

        if (data.monastery_id) {
          const { data: relatedData } = await supabase
            .from('archive_items')
            .select('id, title, images, type')
            .eq('monastery_id', data.monastery_id)
            .neq('id', data.id)
            .limit(3);

          if (relatedData) {
            setRelatedItems(relatedData);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManuscript();
  }, [manuscriptId]);
  
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "The link to this page has been copied to your clipboard.",
    });
  };

  if (loading) return <ManuscriptSkeleton />;

  if (error || !manuscript) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Item Not Found</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button asChild><Link to="/digital-archive"><ArrowLeft className="mr-2 h-4 w-4" />Back to Archive</Link></Button>
      </div>
    );
  }

  const parsedSpecs = manuscript.specs?.split(',').map(s => s.trim()).filter(s => s.includes(':')) || [];

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Header Section with background */}
        <div className="relative pt-12 pb-8 bg-muted/30 border-b">
           <div className="container mx-auto px-4">
              <Button asChild variant="ghost" className="mb-4">
                <Link to="/digital-archive">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Digital Archive
                </Link>
              </Button>
              <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-foreground">{manuscript.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-monastery-gold" /> <span>{manuscript.era}</span></div>
                <div className="flex items-center gap-2"><Languages className="h-4 w-4 text-monastery-gold" /> <span>{manuscript.language}</span></div>
                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-monastery-gold" /> <span>{manuscript.type.charAt(0).toUpperCase() + manuscript.type.slice(1)}</span></div>
              </div>
           </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {manuscript.images && manuscript.images.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {manuscript.images.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <img src={img} alt={`${manuscript.title} page ${index + 1}`} className="w-full h-full object-contain" />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="ml-16" />
                      <CarouselNext className="mr-16" />
                    </Carousel>
                  ) : <div className="aspect-video bg-muted flex items-center justify-center"><p className="text-muted-foreground">No images available.</p></div>}
                </CardContent>
              </Card>

              {/* Tabbed Information */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="details" disabled={parsedSpecs.length === 0}>Details</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <Card><CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-monastery-gold" />About this Item</CardTitle></CardHeader><CardContent><p className="text-muted-foreground leading-relaxed">{manuscript.description || "No description available."}</p></CardContent></Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card><CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-monastery-gold" />History</CardTitle></CardHeader><CardContent><p className="text-muted-foreground leading-relaxed">{manuscript.history || "No history available for this item."}</p></CardContent></Card>
                </TabsContent>
                <TabsContent value="details">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5 text-monastery-gold" />Technical Details</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {parsedSpecs.map((spec, index) => {
                        const [key, value] = spec.split(':');
                        return (<div key={index} className="flex justify-between text-sm border-b pb-2"><span className="font-medium text-muted-foreground">{key}:</span><span className="text-foreground text-right">{value}</span></div>);
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="relative">
              <div className="space-y-6 sticky top-24">
                <Card>
                  <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <Button className="w-full bg-gradient-monastery hover:shadow-monastery" onClick={() => window.open(manuscript.downloadable_url || '', '_blank')} disabled={!manuscript.downloadable_url}><Download className="mr-2 h-4 w-4"/> Download</Button>
                    <Button variant="outline" className="w-full" onClick={handleShare}><Share2 className="mr-2 h-4 w-4"/> Share</Button>
                  </CardContent>
                </Card>

                {manuscript.audio_url && (
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Volume2 className="h-5 w-5 text-monastery-gold" />Audio Narration</CardTitle></CardHeader>
                    <CardContent>
                      <audio controls className="w-full h-10"><source src={manuscript.audio_url} type="audio/mpeg" />Your browser does not support the audio element.</audio>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {relatedItems.length > 0 && (
            <div className="pt-8 border-t mt-12">
              <h2 className="text-3xl font-bold font-playfair mb-6 flex items-center gap-2"><Lightbulb className="h-7 w-7 text-monastery-gold"/> You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedItems.map(item => (
                  <Link to={`/digital-archive/${item.id}`} key={item.id}>
                    <Card className="group hover:shadow-monastery transition-all duration-300 overflow-hidden">
                      <div className="h-40 overflow-hidden bg-muted"><img src={item.images && item.images[0] ? item.images[0] : `https://placehold.co/600x400/FFF3E0/78350F?text=${item.type}`} alt={item.title ?? "Related item"} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
                      <CardHeader><CardTitle className="text-base line-clamp-2 group-hover:text-monastery-gold">{item.title}</CardTitle></CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Standard Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Mountain className="h-8 w-8 text-monastery-gold" />
                <span className="font-playfair text-xl font-bold bg-gradient-monastery bg-clip-text text-transparent">
                  MonasteryExplorer
                </span>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Preserving Sikkim's sacred heritage through immersive technology and cultural appreciation.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-foreground">Explore</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li><Link to="/virtual-tours" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">Virtual Tours</Link></li>
                    <li><Link to="/journey-planner" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">Journey Planner</Link></li>
                    <li><Link to="/digital-archive" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">Digital Archive</Link></li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-foreground">Account</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li><Link to="/auth/sign-in" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">Sign in</Link></li>
                    <li><Link to="/auth/sign-up" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">Create Account</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-muted-foreground">&copy; 2024 MonasteryExplorer. Preserving heritage, inspiring exploration. Made with ❤️ for Sikkim.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

const ManuscriptSkeleton = () => (
  <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
    <Skeleton className="h-6 w-48 mb-4" />
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-5 w-1/2 mt-2" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  </div>
);

export default ManuscriptDetail;