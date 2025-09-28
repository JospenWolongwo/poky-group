import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (we'll define these later)
export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          slug: string
          published_at: string
          created_at: string
          updated_at: string
          author: string
          tags: string[]
          category: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          slug: string
          published_at?: string
          created_at?: string
          updated_at?: string
          author: string
          tags?: string[]
          category: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          published_at?: string
          created_at?: string
          updated_at?: string
          author?: string
          tags?: string[]
          category?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
          status: 'new' | 'read' | 'replied'
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
          status?: 'new' | 'read' | 'replied'
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
          status?: 'new' | 'read' | 'replied'
        }
      }
    }
  }
}


