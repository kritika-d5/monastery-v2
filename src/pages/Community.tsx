import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenSquare, MessageSquare, X } from "lucide-react";
import heroImage from "@/assets/hero-monastery.jpg";
import { supabase } from "@/integrations/supabase/client";

const CommunityPage = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [newStory, setNewStory] = useState({ content: "", image: null as File | null });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

        const fetchStories = async () => {
      const { data, error } = await supabase
        .from("stories")
        .select(`
          id, content, image_url, created_at,
          profiles:author_id (full_name, avatar_url)
        `)
        .order("created_at", { ascending: false });
    
      console.log("Supabase Response:", { data, error }); // Log the response for debugging
    
      if (error) {
        console.error("Error fetching stories:", error.message);
      }
      if (data) {
        setStories(data);
      }
    };

    fetchUser();
    fetchStories();
  }, []);

  const handlePostStory = async () => {
  if (!newStory.content) return;

  try {
    let imageUrl = null;

    if (newStory.image) {
      console.log("Uploading image:", newStory.image.name);

      const fileName = `${Date.now()}-${newStory.image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("stories") // ✅ must match bucket name exactly
        .upload(fileName, newStory.image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload failed:", uploadError.message);
        alert("Image upload failed. Check console for details.");
        return;
      }

      console.log("Upload success:", uploadData);

      const { data: publicUrlData } = supabase.storage
        .from("stories")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
      console.log("Generated public URL:", imageUrl);
    }

    const { data, error } = await supabase
      .from("stories")
      .insert([{ content: newStory.content, image_url: imageUrl, author_id: user.id }])
      .select();

    if (error) {
      console.error("Error inserting story:", error.message);
      alert("Could not post story. Check console.");
      return;
    }

    console.log("Inserted story:", data);

    setStories((prev) => [data[0], ...prev]);
    setNewStory({ content: "", image: null });
    setShowStoryModal(false);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong. See console.");
  }
};


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
            {user && (
              <Button size="lg" className="bg-gradient-monastery hover:shadow-monastery" onClick={() => setShowStoryModal(true)}>
                <PenSquare className="mr-2 h-5 w-5" />
                Share Your Story
              </Button>
            )}
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
            {stories.length === 0 && <p className="text-center col-span-3">No stories yet. Be the first to share!</p>}
            {stories.map((story) => (
              <Card key={story.id} className="group overflow-hidden hover:shadow-monastery transition-all duration-300">
                {story.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img src={story.image_url} alt="story" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={story.profiles?.avatar_url || "/default-avatar.png"} />
                      <AvatarFallback>
                        {story.profiles?.full_name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{story.profiles?.full_name || "Anonymous"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(story.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground whitespace-pre-line">{story.content}</p>
                </CardContent>

              </Card>
            ))}
          </div>
        </section>
      </div>

      {showStoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-lg w-full p-6 bg-white relative">
            <button className="absolute top-4 right-4" onClick={() => setShowStoryModal(false)}>
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Share Your Story</h3>
            <Textarea
              placeholder="Write your experience..."
              value={newStory.content}
              onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
            />
            <Input
              type="file"
              accept="image/*"
              className="mt-4"
              onChange={(e) => setNewStory({ ...newStory, image: e.target.files?.[0] || null })}
            />
            <Button className="mt-4 bg-gradient-monastery" onClick={handlePostStory}>
              Post
            </Button>
          </Card>
        </div>
      )}

      {/* Footer remains unchanged */}
      <footer className="bg-card border-t"> ... </footer>
    </main>
  );
};

export default CommunityPage;
