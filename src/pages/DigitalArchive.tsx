import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  Image, 
  Video, 
  FileText, 
  Calendar,
  MapPin,
  Eye,
  Download,
  Share2,
  Filter,
  Tag
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import digitalArchiveImage from "@/assets/digital-archive.jpg";
import manuscript1 from "@/assets/manuscript-1.jpg";
import mural1 from "@/assets/mural-1.jpg";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import { Skeleton } from "@/components/ui/skeleton";

type ArchiveItemWithMonastery = Tables<'archive_items'> & {
  monasteries: { name: string } | null;
};

const DigitalArchive = () => {
  const [archiveItems, setArchiveItems] = useState<ArchiveItemWithMonastery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEra, setSelectedEra] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchArchiveItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('archive_items')
        .select(`
          *,
          monasteries ( name )
        `);

      if (data) {
        setArchiveItems(data);
      }
      if (error) {
        console.error("Error fetching archive items:", error);
      }
      setLoading(false);
    };

    fetchArchiveItems();
  }, []);

  const handleDownload = (downloadUrl: string | null) => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      toast({
        title: "Download Not Available",
        description: "There is no file available for download for this item.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (itemTitle: string, itemId: string) => {
    const shareUrl = `${window.location.origin}/digital-archive/${itemId}`;
    const shareData = {
      title: `MonasteryExplorer: ${itemTitle}`,
      text: `Check out this amazing artifact from the MonasteryExplorer Digital Archive: ${itemTitle}`,
      url: shareUrl,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "The link to this archive item has been copied to your clipboard.",
      });
    }
  };

  const categories = [
    { id: "all", label: "All Items", icon: <BookOpen className="h-4 w-4" /> },
    { id: "manuscript", label: "Manuscripts", icon: <FileText className="h-4 w-4" /> },
    { id: "mural", label: "Murals", icon: <Image className="h-4 w-4" /> },
    { id: "artifact", label: "Artifacts", icon: <Tag className="h-4 w-4" /> },
  ];

  const eras = [
    { id: "all", label: "All Periods" },
    { id: "17th Century", label: "17th Century" },
    { id: "18th Century", label: "18th Century" },
    { id: "19th Century", label: "19th Century" },
  ];

  // Updated filter logic to include tags
  const filteredItems = archiveItems.filter(item => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(lowerCaseQuery) ||
                         (item.description && item.description.toLowerCase().includes(lowerCaseQuery)) ||
                         (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)));
    const matchesCategory = selectedCategory === "all" || item.type === selectedCategory;
    const matchesEra = selectedEra === "all" || item.era === selectedEra;
    
    return matchesSearch && matchesCategory && matchesEra;
  });

  const getConditionColor = (condition: string | null) => {
    switch (condition?.toLowerCase()) {
      case "well preserved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "restored": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "partially restored": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header and other sections remain the same */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">Digital Heritage Archive</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Preserve and explore Sikkim's Buddhist heritage through our comprehensive digital collection.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search by title, description, or tag..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">Categories:</span>
            {categories.map((c) => <Button key={c.id} variant={selectedCategory === c.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(c.id)} className={`flex items-center gap-1 ${selectedCategory === c.id ? "bg-gradient-monastery" : ""}`}>{c.icon}{c.label}</Button>)}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">Time Period:</span>
            {eras.map((e) => <Button key={e.id} variant={selectedEra === e.id ? "default" : "outline"} size="sm" onClick={() => setSelectedEra(e.id)} className={selectedEra === e.id ? "bg-gradient-monastery" : ""}>{e.label}</Button>)}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}><Skeleton className="h-48 w-full" /><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-10 w-full mt-4" /></CardContent></Card>
          ))
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-monastery transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img src={item.images && item.images.length > 0 ? item.images[0] : manuscript1} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {item.condition && <div className="absolute top-3 right-3"><Badge className={getConditionColor(item.condition)}>{item.condition}</Badge></div>}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-playfair text-lg group-hover:text-monastery-gold transition-colors line-clamp-2">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.type.toUpperCase()}</p>
                  </div>
                  {item.is_hd_available && <Badge variant="secondary" className="text-xs">HD Available</Badge>}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                <div className="space-y-2 text-sm">
                  {item.monasteries && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-monastery-gold" /><span>{item.monasteries.name}</span></div>}
                  {item.period && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-himalayan-blue" /><span>{item.period}</span></div>}
                  {item.language && <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-tibetan-red" /><span>{item.language}</span></div>}
                </div>
                
                {/* New Tags Section */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-auto pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, index) => <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>)}
                      {item.tags.length > 3 && <Badge variant="outline" className="text-xs">+{item.tags.length - 3}</Badge>}
                    </div>
                  </div>
                )}
                
              </CardContent>
              <div className="p-6 pt-0 mt-4">
                 <div className="flex gap-1">
                  <Button asChild size="sm" className="flex-1 bg-gradient-monastery hover:shadow-monastery"><Link to={`/digital-archive/${item.id}`}><Eye className="h-3 w-3 mr-1" />View</Link></Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(item.downloadable_url)} disabled={!item.downloadable_url}><Download className="h-3 w-3" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(item.title, item.id)}><Share2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      
    </div>
  );
};

export default DigitalArchive;
