export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chapters: {
        Row: {
          chapter_number: number
          content: string
          created_at: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          story_id: string
          title: string
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          chapter_number: number
          content: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          story_id: string
          title: string
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          chapter_number?: number
          content?: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          story_id?: string
          title?: string
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          chapter_id: string | null
          content: string
          created_at: string | null
          id: string
          story_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          chapter_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          story_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          chapter_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          story_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          admin_id: string | null
          category: string
          company: string
          created_at: string | null
          deadline: string
          description: string
          featured: boolean | null
          id: string
          image: string | null
          location: string
          logo: string
          posted: string
          requirements: string[]
          responsibilities: string[]
          salary: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          category: string
          company: string
          created_at?: string | null
          deadline: string
          description: string
          featured?: boolean | null
          id?: string
          image?: string | null
          location: string
          logo: string
          posted?: string
          requirements?: string[]
          responsibilities?: string[]
          salary?: string | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          category?: string
          company?: string
          created_at?: string | null
          deadline?: string
          description?: string
          featured?: boolean | null
          id?: string
          image?: string | null
          location?: string
          logo?: string
          posted?: string
          requirements?: string[]
          responsibilities?: string[]
          salary?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_id: string | null
          content: string
          created_at: string
          id: string
          read: boolean
          related_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          content: string
          created_at?: string
          id?: string
          read?: boolean
          related_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          related_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string | null
          id: string
          rating: number
          story_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating: number
          story_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number
          story_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_list_items: {
        Row: {
          created_at: string | null
          id: string
          reading_list_id: string
          story_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reading_list_id: string
          story_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reading_list_id?: string
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_list_items_reading_list_id_fkey"
            columns: ["reading_list_id"]
            isOneToOne: false
            referencedRelation: "reading_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_list_items_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_lists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          author_id: string
          cover_image: string | null
          created_at: string | null
          id: string
          is_complete: boolean | null
          is_published: boolean | null
          published_at: string | null
          summary: string | null
          title: string
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          author_id: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          is_complete?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          author_id?: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          is_complete?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_tags: {
        Row: {
          created_at: string | null
          id: string
          story_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          story_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          story_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_tags_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
