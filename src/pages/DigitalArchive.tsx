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
import { useState } from "react";
import digitalArchiveImage from "@/assets/digital-archive.jpg";
import manuscript1 from "@/assets/manuscript-1.jpg";
import mural1 from "@/assets/mural-1.jpg";
import rumtekImage from "@/assets/rumtek-monastery.jpg";

const DigitalArchive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEra, setSelectedEra] = useState("all");

  const categories = [
    { id: "all", label: "All Items", icon: <BookOpen className="h-4 w-4" /> },
    { id: "manuscripts", label: "Manuscripts", icon: <FileText className="h-4 w-4" /> },
    { id: "murals", label: "Murals", icon: <Image className="h-4 w-4" /> },
    { id: "artifacts", label: "Artifacts", icon: <Tag className="h-4 w-4" /> },
    { id: "rituals", label: "Rituals", icon: <Video className="h-4 w-4" /> }
  ];

  const eras = [
    { id: "all", label: "All Periods" },
    { id: "17th", label: "17th Century" },
    { id: "18th", label: "18th Century" },
    { id: "19th", label: "19th Century" },
    { id: "20th", label: "20th Century" },
    { id: "contemporary", label: "Contemporary" }
  ];

  const archiveItems = [
    {
      id: 1,
      title: "Kangyur Manuscript Collection",
      description: "Complete collection of Buddha's teachings in Tibetan, handwritten on traditional bark paper",
      category: "manuscripts",
      era: "18th",
      monastery: "Pemayangtse Monastery",
      period: "1750-1800",
      language: "Classical Tibetan",
      condition: "Well Preserved",
      significance: "Contains rare commentaries and original translations from Sanskrit",
      tags: ["Buddhist Canon", "Tibetan Script", "Religious Text", "Historical"],
      images: 127,
      pages: 1048,
      downloadCount: 234,
      isHighResAvailable: true
    },
    {
      id: 2,
      title: "Chaam Dance Ritual Masks",
      description: "Sacred masks used in traditional Cham dance ceremonies representing Buddhist deities",
      category: "artifacts",
      era: "19th",
      monastery: "Rumtek Monastery",
      period: "1850-1900",
      language: "N/A",
      condition: "Restored",
      significance: "Used in annual festival ceremonies to ward off evil spirits",
      tags: ["Dance", "Ceremonial", "Deities", "Festival"],
      images: 45,
      pages: null,
      downloadCount: 189,
      isHighResAvailable: true
    },
    {
      id: 3,
      title: "Tara Mural Paintings",
      description: "Exquisite wall paintings depicting the 21 forms of Goddess Tara",
      category: "murals",
      era: "17th",
      monastery: "Tashiding Monastery",
      period: "1680-1720",
      language: "Sanskrit/Tibetan",
      condition: "Partially Restored",
      significance: "Represents the finest example of Sikkimese Buddhist art",
      tags: ["Goddess Tara", "Wall Art", "Buddhist Art", "Sacred"],
      images: 89,
      pages: null,
      downloadCount: 512,
      isHighResAvailable: true
    },
    {
      id: 4,
      title: "Prayer Wheel Inscriptions",
      description: "Ancient mantras and prayers inscribed on traditional prayer wheels",
      category: "manuscripts",
      era: "19th",
      monastery: "Enchey Monastery",
      period: "1820-1880",
      language: "Tibetan/Sanskrit",
      condition: "Good",
      significance: "Contains rare mantras passed down through oral tradition",
      tags: ["Mantras", "Prayer Wheels", "Oral Tradition", "Sacred Text"],
      images: 156,
      pages: 340,
      downloadCount: 145,
      isHighResAvailable: false
    },
    {
      id: 5,
      title: "Losar Festival Ritual Documentation",
      description: "Complete documentation of Tibetan New Year celebration rituals and ceremonies",
      category: "rituals",
      era: "20th",
      monastery: "Multiple Monasteries",
      period: "1920-1980",
      language: "Tibetan/Nepali",
      condition: "Digitized",
      significance: "Preserves traditional festival practices for future generations",
      tags: ["Losar", "Festival", "Ceremonies", "Cultural Heritage"],
      images: 203,
      pages: null,
      downloadCount: 367,
      isHighResAvailable: true
    },
    {
      id: 6,
      title: "Medicinal Plant Manuscripts",
      description: "Traditional Tibetan medicine texts documenting healing plants found in Sikkim",
      category: "manuscripts",
      era: "18th",
      monastery: "Dubdi Monastery",
      period: "1720-1780",
      language: "Classical Tibetan",
      condition: "Fragile - Digitally Preserved",
      significance: "Unique knowledge of Himalayan medicinal plants and their uses",
      tags: ["Medicine", "Botany", "Healing", "Traditional Knowledge"],
      images: 78,
      pages: 245,
      downloadCount: 98,
      isHighResAvailable: true
    }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "well preserved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "good": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "restored": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "partially restored": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "fragile - digitally preserved": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryMap: Record<string, JSX.Element> = {
      manuscripts: <FileText className="h-4 w-4" />,
      murals: <Image className="h-4 w-4" />,
      artifacts: <Tag className="h-4 w-4" />,
      rituals: <Video className="h-4 w-4" />
    };
    return categoryMap[category] || <BookOpen className="h-4 w-4" />;
  };

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesEra = selectedEra === "all" || item.era === selectedEra;
    
    return matchesSearch && matchesCategory && matchesEra;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
          Digital Heritage Archive
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Preserve and explore Sikkim's Buddhist heritage through our comprehensive digital collection 
          of manuscripts, murals, artifacts, and ritual documentation
        </p>
      </div>

      {/* Hero Image */}
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img 
            src={digitalArchiveImage} 
            alt="Ancient Buddhist manuscripts and artifacts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 space-y-4">
              <h2 className="text-3xl font-bold font-playfair text-foreground">
                Preserving Sacred Knowledge
              </h2>
              <p className="text-muted-foreground max-w-md">
                Every artifact tells a story. Every manuscript holds wisdom. 
                Explore thousands of digitally preserved treasures from Sikkim's monasteries.
              </p>
              <Button className="bg-gradient-monastery hover:shadow-monastery">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search manuscripts, artifacts, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-monastery-gold/20 focus:border-monastery-gold"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Categories:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 ${
                  selectedCategory === category.id ? "bg-gradient-monastery" : ""
                }`}
              >
                {category.icon}
                {category.label}
              </Button>
            ))}
          </div>

          {/* Era Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground">Time Period:</span>
            {eras.map((era) => (
              <Button
                key={era.id}
                variant={selectedEra === era.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEra(era.id)}
                className={selectedEra === era.id ? "bg-gradient-monastery" : ""}
              >
                {era.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Archive Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-monastery transition-all duration-300 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={item.category === 'manuscripts' ? manuscript1 : 
                     item.category === 'murals' ? mural1 : 
                     rumtekImage} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge className={getConditionColor(item.condition)}>
                  {item.condition}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-playfair text-lg group-hover:text-monastery-gold transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{item.category.toUpperCase()}</p>
                </div>
                {item.isHighResAvailable && (
                  <Badge variant="secondary" className="text-xs">
                    HD Available
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-monastery-gold" />
                  <span>{item.monastery}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-himalayan-blue" />
                  <span>{item.period}</span>
                </div>
                {item.language !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-tibetan-red" />
                    <span>{item.language}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.images} Images</span>
                  {item.pages && <span>{item.pages} Pages</span>}
                  <span>{item.downloadCount} Downloads</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-gradient-monastery h-1 rounded-full" 
                    style={{ width: `${Math.min((item.downloadCount / 600) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-1 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-monastery hover:shadow-monastery">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse different categories
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedEra("all");
              }} 
              className="bg-gradient-monastery"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics & CTA */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold font-playfair mb-4">
            Help Preserve Digital Heritage
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold mb-1">2,847</div>
              <div className="text-white/80 text-sm">Total Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">23</div>
              <div className="text-white/80 text-sm">Monasteries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">156,234</div>
              <div className="text-white/80 text-sm">Digital Pages</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">94%</div>
              <div className="text-white/80 text-sm">Preservation Rate</div>
            </div>
          </div>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join our mission to digitally preserve Sikkim's Buddhist heritage. 
            Contribute, translate, or help fund our digitization efforts.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-monastery-gold hover:bg-white/90">
            Contribute to Archive
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalArchive;