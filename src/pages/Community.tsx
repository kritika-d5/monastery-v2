import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mountain, 
  Users, 
  PenSquare, 
  Star, 
  Camera, 
  MessageSquare,
  UserCheck,
  Filter
} from "lucide-react";
import heroImage from "@/assets/hero-monastery.jpg";
import rumtekImage from "@/assets/rumtek-monastery.jpg";
import pemayangtseImage from "@/assets/pemayangtse-monastery.jpg";
import muralImage from "@/assets/mural-1.jpg";

const CommunityPage = () => {
  const stories = [
    { id: 1, title: "My Spiritual Retreat at Pemayangtse", author: "Anjali Rao", image: pemayangtseImage, excerpt: "For seven days, I disconnected from the world and found a piece of myself amidst the chants and serene landscapes..." },
    { id: 2, title: "A Photographer's Dream: The Murals of Rumtek", author: "David Chen", image: muralImage, excerpt: "Every corner of Rumtek tells a story, and I tried to capture its soul through my lens. Here are some of my best shots..." },
    { id: 3, title: "Trekking to Tashiding: A Journey of a Lifetime", author: "Tenzin Lhamo", image: rumtekImage, excerpt: "The arduous trek was worth every step. Reaching the sacred chorten of Tashiding during Bumchu was an experience..." },
  ];

  const experts = [
    { id: 1, name: "Dr. Sonam Wangchuk", role: "Historian & Scholar", avatar: "SW", imageUrl: "https://i.pravatar.cc/150?u=sonam" },
    { id: 2, name: "Lama Pema Dorje", role: "Resident Monk, Rumtek", avatar: "LP", imageUrl: "https://i.pravatar.cc/150?u=pema" },
    { id: 3, name: "Yangchen Dolma", role: "Local Guide & Cultural Expert", avatar: "YD", imageUrl: "https://i.pravatar.cc/150?u=yangchen" },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-black">
        <img src={heroImage} alt="Community of travelers in Sikkim" className="w-full h-96 object-cover opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl font-bold font-playfair drop-shadow-lg">Join Our Sacred Journey</h1>
          <p className="mt-4 text-xl max-w-2xl text-white/90 drop-shadow-md">
            Share your experiences, connect with fellow explorers, and learn from local experts. This is your space to celebrate the spirit of Sikkim.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="bg-gradient-monastery hover:shadow-monastery">
              <PenSquare className="mr-2 h-5 w-5" />
              Share Your Story
            </Button>
            <Button size="lg" variant="secondary" className="bg-white/90 text-monastery-gold hover:bg-white">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask a Question
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Traveler Stories Section */}
        <section>
          <h2 className="text-3xl font-bold font-playfair text-center mb-8">Traveler Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map(story => (
              <Card key={story.id} className="group overflow-hidden hover:shadow-monastery transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair font-bold text-xl group-hover:text-monastery-gold">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">by {story.author}</p>
                  <p className="mt-3 text-muted-foreground line-clamp-3">{story.excerpt}</p>
                  <Button variant="link" className="px-0 mt-2">Read More →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Reviews Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold font-playfair">Community Reviews</h2>
            <div className="flex gap-2">
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter Reviews</Button>
              <Button className="bg-gradient-monastery hover:shadow-monastery">Write a Review</Button>
            </div>
          </div>
          {/* Add review components here */}
           <p className="text-center text-muted-foreground">Review section coming soon!</p>
        </section>

        {/* Meet The Experts Section */}
        <section>
          <h2 className="text-3xl font-bold font-playfair text-center mb-8">Meet The Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map(expert => (
              <Card key={expert.id} className="text-center p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-monastery-gold/50">
                  <AvatarImage src={expert.imageUrl} alt={expert.name} />
                  <AvatarFallback>{expert.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{expert.name}</h3>
                <p className="text-monastery-gold">{expert.role}</p>
                <Button variant="outline" size="sm" className="mt-4">Ask a Question</Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Q&A Section */}
        <section>
           <h2 className="text-3xl font-bold font-playfair text-center mb-8">Community Q&A Forum</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Have a question?</h3>
                <p className="text-muted-foreground mb-4">
                  Get answers from local experts and fellow travelers.
                </p>
                <Button className="bg-gradient-monastery">Join the Discussion</Button>
              </CardContent>
            </Card>
        </section>

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

export default CommunityPage;