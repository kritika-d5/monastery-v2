import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Users, BookOpen, Leaf, Star } from "lucide-react";
import heroImage from "@/assets/pemayangtse-monastery.jpg";

const AboutSikkim = () => {
  const historyFacts = [
    { year: "1642", event: "The Namgyal dynasty establishes the kingdom of Sikkim." },
    { year: "1890", event: "Sikkim becomes a British protectorate." },
    { year: "1975", event: "Sikkim merges with India and becomes its 22nd state." },
  ];

  const culturalAspects = [
    { title: "Languages", content: "Nepali, Sikkimese (Bhutia), Lepcha, and English are the official languages." },
    { title: "Festivals", content: "Major festivals include Losar, Saga Dawa, and Phang Lhabsol." },
    { title: "Cuisine", content: "Famous for Momos (dumplings), Thukpa (noodle soup), and Gundruk." },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-96">
        <img 
          src={heroImage} 
          alt="View of the Himalayas from Sikkim" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-0 w-full text-center p-8">
          <h1 className="text-5xl font-bold font-playfair text-white drop-shadow-lg">
            About Sikkim
          </h1>
          <p className="text-xl text-white/90 mt-2 drop-shadow-md">
            The Himalayan Jewel of India
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Introduction */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-playfair bg-gradient-monastery bg-clip-text text-transparent">
            Welcome to the Land of Mystic Splendor
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nestled in the Himalayas, Sikkim is a land of breathtaking landscapes, snow-capped mountains, vibrant culture, and serene monasteries. It is a destination that captivates the soul with its pristine beauty and spiritual aura.
          </p>
        </section>

        {/* History Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-monastery-gold" />
              A Glimpse into History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Sikkim's history is a rich tapestry of monarchs, spirituality, and political evolution. From an independent kingdom to a modern Indian state, its journey is fascinating.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {historyFacts.map((fact) => (
                <div key={fact.year} className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-bold text-monastery-gold text-xl">{fact.year}</p>
                  <p className="text-sm text-muted-foreground">{fact.event}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* People & Culture Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-monastery-gold" />
              People & Culture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">The people of Sikkim are a harmonious blend of three main ethnic groups: the Lepchas (the original inhabitants), the Bhutias (of Tibetan origin), and the Nepalese. This diversity is reflected in the state's vibrant culture, languages, and traditions.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {culturalAspects.map((aspect) => (
                <div key={aspect.title}>
                  <h3 className="font-semibold text-lg">{aspect.title}</h3>
                  <p className="text-muted-foreground">{aspect.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Facts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-monastery-gold" />
              Key Facts about Sikkim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">India's First Organic State:</span> Sikkim is celebrated for being the first state in India, and one of the first in the world, to be 100% organic.
              </li>
              <li>
                <span className="font-semibold text-foreground">Home to Kanchenjunga:</span> The world's third-highest peak, Mount Kanchenjunga, is located on Sikkim's border with Nepal.
              </li>
              <li>
                <span className="font-semibold text-foreground">Biodiversity Hotspot:</span> Despite its small size, Sikkim is a global biodiversity hotspot with a rich variety of flora and fauna, including over 5,000 species of flowering plants.
              </li>
              <li>
                <span className="font-semibold text-foreground">Land of Monasteries:</span> The state is dotted with over 200 monasteries, making it a significant center for Tibetan Buddhism.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t">
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
                    <li>
                      <Link to="/virtual-tours" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
                        Virtual Tours
                      </Link>
                    </li>
                    <li>
                      <Link to="/journey-planner" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
                        Journey Planner
                      </Link>
                    </li>
                    <li>
                      <Link to="/digital-archive" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
                        Digital Archive
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-foreground">Account</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link to="/auth/sign-in" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth/sign-up" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
                        Create Account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-muted-foreground">
              &copy; 2024 MonasteryExplorer. Preserving heritage, inspiring exploration. Made with ❤️ for Sikkim.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default AboutSikkim;