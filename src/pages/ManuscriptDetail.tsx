import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, BookOpen, Calendar, Languages, Search, Share2, Download, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Manuscript = Tables<'archive_items'>;

const ManuscriptDetail = () => {
  const { manuscriptId } = useParams<{ manuscriptId: string }>();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManuscript = async () => {
      if (!manuscriptId) return;

      setLoading(true);
      try {
        // The select('*') query will automatically include your new 'history' column
        const { data, error } = await supabase
          .from('archive_items')
          .select('*')
          .eq('id', manuscriptId)
          .single();

        if (error) {
          throw new Error("Could not fetch manuscript details. It may not exist.");
        }
        
        setManuscript(data);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchManuscript();
  }, [manuscriptId]);

  if (loading) {
    return <ManuscriptSkeleton />;
  }

  if (error || !manuscript) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Manuscript Not Found</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button asChild>
          <Link to="/digital-archive">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Archive
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/digital-archive">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Digital Archive
          </Link>
        </Button>
        <h1 className="text-4xl font-bold font-playfair">{manuscript.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> <span>{manuscript.era}</span></div>
            <div className="flex items-center gap-2"><Languages className="h-4 w-4" /> <span>{manuscript.language}</span></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader><CardTitle>Image Gallery</CardTitle></CardHeader>
            <CardContent>
              {manuscript.images && manuscript.images.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {manuscript.images.map((img, index) => (
                      <CarouselItem key={index}><div className="p-1"><Card><CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg"><img src={img} alt={`${manuscript.title} page ${index + 1}`} className="w-full h-full object-contain" /></CardContent></Card></div></CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious /><CarouselNext />
                </Carousel>
              ) : (
                <p className="text-muted-foreground">No images available for this manuscript.</p>
              )}
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-monastery-gold" />
                About this Manuscript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{manuscript.description}</p>
            </CardContent>
          </Card>

          {/* History Section */}
          {manuscript.history && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-monastery-gold" />
                  History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{manuscript.history}</p>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Column: Details & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button className="w-full bg-gradient-monastery hover:shadow-monastery"><Download className="mr-2 h-4 w-4"/> Download High-Res</Button>
                <Button variant="outline" className="w-full"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vector Search Placeholder */}
       <Card className="bg-muted/30 border-dashed">
            <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5 text-monastery-gold" />Semantic Search (Coming Soon)</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Soon, you'll be able to search for similar concepts, phrases, or visual elements across our entire digital archive using powerful AI.</p></CardContent>
        </Card>
    </div>
  );
};

// A skeleton component for the loading state
const ManuscriptSkeleton = () => (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-5 w-1/2 mt-2" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    </div>
);

export default ManuscriptDetail;