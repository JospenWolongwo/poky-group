import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          status: string;
          published_at: string | null;
          created_at: string | null;
          updated_at: string | null;
          category_id: string | null;
          author: string;
          cover_image_url: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          status?: string;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          category_id?: string | null;
          author: string;
          cover_image_url?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          status?: string;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          category_id?: string | null;
          author?: string;
          cover_image_url?: string | null;
        };
      };
      post_translations: {
        Row: {
          id: string;
          post_id: string;
          locale: string;
          title: string;
          excerpt: string;
          content: string;
          seo_title: string | null;
          seo_description: string | null;
        };
        Insert: {
          id?: string;
          post_id: string;
          locale: string;
          title: string;
          excerpt: string;
          content: string;
          seo_title?: string | null;
          seo_description?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string;
          locale?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          seo_title?: string | null;
          seo_description?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          label: string;
        };
        Insert: {
          id?: string;
          slug: string;
          label: string;
        };
        Update: {
          id?: string;
          slug?: string;
          label?: string;
        };
      };
      category_translations: {
        Row: {
          id: string;
          category_id: string;
          locale: string;
          name: string;
          description: string | null;
        };
        Insert: {
          id?: string;
          category_id: string;
          locale: string;
          name: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string;
          locale?: string;
          name?: string;
          description?: string | null;
        };
      };
      authors: {
        Row: {
          id: string;
          slug: string;
          name: string;
          bio: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          bio?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          bio?: string | null;
          avatar_url?: string | null;
        };
      };
      tags: {
        Row: {
          id: string;
          slug: string;
          label: string;
        };
        Insert: {
          id?: string;
          slug: string;
          label: string;
        };
        Update: {
          id?: string;
          slug?: string;
          label?: string;
        };
      };
      tag_translations: {
        Row: {
          id: string;
          tag_id: string;
          locale: string;
          name: string;
        };
        Insert: {
          id?: string;
          tag_id: string;
          locale: string;
          name: string;
        };
        Update: {
          id?: string;
          tag_id?: string;
          locale?: string;
          name?: string;
        };
      };
      affiliate_links: {
        Row: {
          id: string;
          post_id: string;
          vendor: string | null;
          product: string | null;
          target_url: string | null;
          cta: string | null;
          tracking_code: string | null;
          title: string | null;
          description: string | null;
          image_url: string | null;
          rating: number | null;
          price: string | null;
          badge: string | null;
          position: number | null;
          featured: boolean | null;
        };
        Insert: {
          id?: string;
          post_id: string;
          vendor?: string | null;
          product?: string | null;
          target_url?: string | null;
          cta?: string | null;
          tracking_code?: string | null;
          title?: string | null;
          description?: string | null;
          image_url?: string | null;
          rating?: number | null;
          price?: string | null;
          badge?: string | null;
          position?: number | null;
          featured?: boolean | null;
        };
        Update: {
          id?: string;
          post_id?: string;
          vendor?: string | null;
          product?: string | null;
          target_url?: string | null;
          cta?: string | null;
          tracking_code?: string | null;
          title?: string | null;
          description?: string | null;
          image_url?: string | null;
          rating?: number | null;
          price?: string | null;
          badge?: string | null;
          position?: number | null;
          featured?: boolean | null;
        };
      };
      media_assets: {
        Row: {
          id: string;
          post_id: string;
          type: string;
          url: string;
          alt_text: string | null;
          position: number;
        };
        Insert: {
          id?: string;
          post_id: string;
          type: string;
          url: string;
          alt_text?: string | null;
          position?: number;
        };
        Update: {
          id?: string;
          post_id?: string;
          type?: string;
          url?: string;
          alt_text?: string | null;
          position?: number;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          status: "new" | "read" | "replied";
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
          status?: "new" | "read" | "replied";
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
          status?: "new" | "read" | "replied";
        };
      };
    };
  };
};
