# Supabase Setup Guide

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Choose a name: "poky-group"
4. Set a strong database password
5. Choose a region close to your users

## 2. Get Your Credentials
1. Go to Settings > API
2. Copy the following values:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)

## 3. Create .env.local file
Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 4. Database Schema
Run these SQL commands in the Supabase SQL Editor:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts (public read access)
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (true);

-- Create policies for contact_messages (insert only for public)
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

## 5. Storage Setup
1. Go to Storage in Supabase dashboard
2. Create a bucket called "images"
3. Set it to public
4. This will be used for blog post images and project screenshots


