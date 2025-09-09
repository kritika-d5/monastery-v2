-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for difficulty levels
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'trek');

-- Create enum for group types
CREATE TYPE public.group_type AS ENUM ('young', 'family', 'elderly');

-- Create enum for archive item types
CREATE TYPE public.archive_item_type AS ENUM ('manuscript', 'mural', 'artifact');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    language_pref TEXT DEFAULT 'english' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(user_id, role)
);

-- Create monasteries table
CREATE TABLE public.monasteries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    difficulty difficulty_level NOT NULL DEFAULT 'easy',
    accessibility BOOLEAN DEFAULT false,
    open_hours TEXT,
    description TEXT,
    history TEXT,
    rituals_text TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    cover_image TEXT,
    gallery TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create tours table
CREATE TABLE public.tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monastery_id UUID REFERENCES public.monasteries(id) ON DELETE CASCADE NOT NULL,
    has_360 BOOLEAN DEFAULT false,
    hotspots JSONB DEFAULT '[]',
    audio_guides JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create archive_items table
CREATE TABLE public.archive_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monastery_id UUID REFERENCES public.monasteries(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    era TEXT,
    type archive_item_type NOT NULL,
    language TEXT DEFAULT 'english',
    description TEXT,
    specs TEXT,
    images TEXT[] DEFAULT '{}',
    source_file_url TEXT,
    translated_text TEXT,
    downloadable_url TEXT,
    has_audio_narration BOOLEAN DEFAULT false,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    monastery_id UUID REFERENCES public.monasteries(id) ON DELETE CASCADE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create itineraries table
CREATE TABLE public.itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT,
    params_json JSONB DEFAULT '{}',
    days_json JSONB DEFAULT '[]',
    map_route_geojson JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monasteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Monasteries policies (public read, admin write)
CREATE POLICY "Anyone can view monasteries" ON public.monasteries
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage monasteries" ON public.monasteries
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Tours policies (public read, admin write)
CREATE POLICY "Anyone can view tours" ON public.tours
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage tours" ON public.tours
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Archive items policies (public read, admin write)
CREATE POLICY "Anyone can view archive items" ON public.archive_items
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage archive items" ON public.archive_items
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own reviews" ON public.reviews
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = reviews.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own reviews" ON public.reviews
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = reviews.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

-- Itineraries policies
CREATE POLICY "Users can view own itineraries" ON public.itineraries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = itineraries.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own itineraries" ON public.itineraries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = itineraries.profile_id 
            AND profiles.user_id = auth.uid()
        )
    );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, age, city, country, language_pref)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
        COALESCE((NEW.raw_user_meta_data ->> 'age')::INTEGER, 25),
        COALESCE(NEW.raw_user_meta_data ->> 'city', 'Unknown'),
        COALESCE(NEW.raw_user_meta_data ->> 'country', 'Unknown'),
        COALESCE(NEW.raw_user_meta_data ->> 'language_pref', 'english')
    );
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_monasteries_updated_at
    BEFORE UPDATE ON public.monasteries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tours_updated_at
    BEFORE UPDATE ON public.tours
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_archive_items_updated_at
    BEFORE UPDATE ON public.archive_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at
    BEFORE UPDATE ON public.itineraries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.monasteries (slug, name, region, difficulty, accessibility, lat, lng, cover_image, description, history) VALUES
('rumtek-monastery', 'Rumtek Monastery', 'East Sikkim', 'easy', true, 27.3389, 88.5622, '/src/assets/rumtek-monastery.jpg', 'One of the most significant monasteries of the Karma Kagyu lineage of Tibetan Buddhism.', 'Built in the 1960s by the 16th Karmapa, Rangjung Rigpe Dorje.'),
('pemayangtse-monastery', 'Pemayangtse Monastery', 'West Sikkim', 'medium', false, 27.3167, 88.2167, '/src/assets/pemayangtse-monastery.jpg', 'One of the oldest and premier monasteries of Sikkim, meaning "Perfect Sublime Lotus".', 'Founded by Lama Lhatsun Chempo in 1705.'),
('tashiding-monastery', 'Tashiding Monastery', 'West Sikkim', 'trek', false, 27.3333, 88.2000, '/src/assets/tashiding-monastery.jpg', 'Sacred monastery situated on a heart-shaped hill between two rivers.', 'Founded in 1641 by Ngadak Sempa Chempo Phunshok Rigzing.');

INSERT INTO public.archive_items (monastery_id, title, era, type, description) VALUES
((SELECT id FROM public.monasteries WHERE slug = 'rumtek-monastery'), 'Ancient Buddhist Manuscript', '15th Century', 'manuscript', 'Rare manuscript containing teachings of the Karma Kagyu lineage.'),
((SELECT id FROM public.monasteries WHERE slug = 'pemayangtse-monastery'), 'Sacred Mural Paintings', '18th Century', 'mural', 'Beautiful wall paintings depicting Buddhist deities and teachings.'),
((SELECT id FROM public.monasteries WHERE slug = 'tashiding-monastery'), 'Ritual Artifacts', '17th Century', 'artifact', 'Collection of sacred ritual items used in monastery ceremonies.');