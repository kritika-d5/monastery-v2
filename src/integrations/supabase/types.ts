export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      archive_items: {
        Row: {
          audio_url: string | null
          created_at: string
          description: string | null
          downloadable_url: string | null
          era: string | null
          has_audio_narration: boolean | null
          id: string
          images: string[] | null
          language: string | null
          monastery_id: string | null
          source_file_url: string | null
          specs: string | null
          title: string
          translated_text: string | null
          type: Database["public"]["Enums"]["archive_item_type"]
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          downloadable_url?: string | null
          era?: string | null
          has_audio_narration?: boolean | null
          id?: string
          images?: string[] | null
          language?: string | null
          monastery_id?: string | null
          source_file_url?: string | null
          specs?: string | null
          title: string
          translated_text?: string | null
          type: Database["public"]["Enums"]["archive_item_type"]
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          downloadable_url?: string | null
          era?: string | null
          has_audio_narration?: boolean | null
          id?: string
          images?: string[] | null
          language?: string | null
          monastery_id?: string | null
          source_file_url?: string | null
          specs?: string | null
          title?: string
          translated_text?: string | null
          type?: Database["public"]["Enums"]["archive_item_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_items_monastery_id_fkey"
            columns: ["monastery_id"]
            isOneToOne: false
            referencedRelation: "monasteries"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          created_at: string
          days_json: Json | null
          id: string
          map_route_geojson: Json | null
          params_json: Json | null
          profile_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_json?: Json | null
          id?: string
          map_route_geojson?: Json | null
          params_json?: Json | null
          profile_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_json?: Json | null
          id?: string
          map_route_geojson?: Json | null
          params_json?: Json | null
          profile_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monasteries: {
        Row: {
          accessibility: boolean | null
          cover_image: string | null
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          gallery: string[] | null
          history: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          open_hours: string | null
          region: string
          rituals_text: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          accessibility?: boolean | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          gallery?: string[] | null
          history?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          open_hours?: string | null
          region: string
          rituals_text?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          accessibility?: boolean | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          gallery?: string[] | null
          history?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          open_hours?: string | null
          region?: string
          rituals_text?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number
          city: string
          country: string
          created_at: string
          full_name: string
          id: string
          language_pref: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age: number
          city: string
          country: string
          created_at?: string
          full_name: string
          id?: string
          language_pref?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number
          city?: string
          country?: string
          created_at?: string
          full_name?: string
          id?: string
          language_pref?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          images: string[] | null
          monastery_id: string
          profile_id: string
          rating: number
          text: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          images?: string[] | null
          monastery_id: string
          profile_id: string
          rating: number
          text?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          images?: string[] | null
          monastery_id?: string
          profile_id?: string
          rating?: number
          text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_monastery_id_fkey"
            columns: ["monastery_id"]
            isOneToOne: false
            referencedRelation: "monasteries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          audio_guides: Json | null
          created_at: string
          has_360: boolean | null
          hotspots: Json | null
          id: string
          monastery_id: string
          updated_at: string
        }
        Insert: {
          audio_guides?: Json | null
          created_at?: string
          has_360?: boolean | null
          hotspots?: Json | null
          id?: string
          monastery_id: string
          updated_at?: string
        }
        Update: {
          audio_guides?: Json | null
          created_at?: string
          has_360?: boolean | null
          hotspots?: Json | null
          id?: string
          monastery_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tours_monastery_id_fkey"
            columns: ["monastery_id"]
            isOneToOne: false
            referencedRelation: "monasteries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      archive_item_type: "manuscript" | "mural" | "artifact"
      difficulty_level: "easy" | "medium" | "trek"
      group_type: "young" | "family" | "elderly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      archive_item_type: ["manuscript", "mural", "artifact"],
      difficulty_level: ["easy", "medium", "trek"],
      group_type: ["young", "family", "elderly"],
    },
  },
} as const
