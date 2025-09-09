-- Fix the function search path security issue by updating the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
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

-- Update the update_updated_at_column function as well
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;