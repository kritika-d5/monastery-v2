import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mountain, 
  Camera, 
  Map, 
  Users, 
  BookOpen, 
  Calendar,
  Globe,
  Heart,
  Navigation
} from "lucide-react";
import heroImage from "@/assets/hero-monastery.jpg";

const Index = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "360° Immersive Tours",
      description: "Explore monasteries with breathtaking virtual reality experiences that transport you to sacred spaces."
    },
    {
      icon: <Navigation className="h-8 w-8" />,
      title: "Smart Journey Planning",
      description: "AI-powered itineraries with weather updates, accessibility info, and personalized recommendations."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Wisdom",
      description: "Real traveler reviews, hidden gem discoveries, and local insights from the Sikkim community."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Digital Heritage Archives",
      description: "Discover ancient manuscripts, sacred murals, and ritual traditions preserved for future generations."
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Majestic Himalayan monastery in Sikkim" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <div className="hidden sm:mb-10 sm:flex">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-monastery-gold/20 transition-colors">
                Preserving Sikkim's sacred heritage through technology.{' '}
                <span className="font-semibold text-monastery-gold">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Learn more <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight font-playfair text-foreground sm:text-6xl">
              Explore Ancient{' '}
              <span className="bg-gradient-monastery bg-clip-text text-transparent">
                Monasteries
              </span>{' '}
              from Anywhere
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover Sikkim's sacred Buddhist monasteries through immersive virtual tours, 
              smart journey planning, and authentic cultural experiences. Preserving heritage while inspiring exploration.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link to="/auth/sign-up">
                <Button size="lg" className="bg-gradient-monastery hover:shadow-monastery transition-all duration-300 text-lg px-8 py-3">
                  <Heart className="mr-2 h-5 w-5" />
                  Create Free Account
                </Button>
              </Link>
              
              <Link to="/explore">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-monastery-gold text-monastery-gold hover:bg-monastery-gold hover:text-monastery-gold-foreground">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Virtual Tours
                </Button>
              </Link>
              
              <Link to="/journey-planner">
                <Button variant="ghost" size="lg" className="text-lg px-8 py-3 text-himalayan-blue hover:text-himalayan-blue hover:bg-himalayan-blue/10">
                  <Map className="mr-2 h-5 w-5" />
                  Plan Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-monastery-gold">Sacred Technology</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight font-playfair text-foreground sm:text-4xl">
              Bridging Ancient Wisdom with Modern Innovation
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Experience Sikkim's monastic heritage through cutting-edge technology that respects tradition while making it accessible to the world.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={feature.title} className="group hover:shadow-monastery transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-monastery text-monastery-gold-foreground group-hover:shadow-sacred transition-all duration-300">
                      {feature.icon}
                    </div>
                    <dt className="mt-4 font-semibold leading-7 text-foreground font-playfair">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 leading-7 text-muted-foreground">
                      {feature.description}
                    </dd>
                  </CardContent>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative isolate overflow-hidden bg-gradient-hero">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight font-playfair text-white sm:text-4xl">
              Begin Your Sacred Journey Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
              Join thousands of explorers discovering Sikkim's monastic treasures. Create your free account and start your spiritual adventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth/sign-up">
                <Button size="lg" variant="secondary" className="bg-white text-monastery-gold hover:bg-white/90 font-semibold">
                  Start Exploring Now
                </Button>
              </Link>
              <Link to="/explore" className="text-sm font-semibold leading-6 text-white hover:text-white/80">
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card">
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
                      <Link to="/explore" className="text-sm leading-6 text-muted-foreground hover:text-monastery-gold">
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

export default Index;