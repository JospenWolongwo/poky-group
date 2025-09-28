'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'

// Mock blog data - in production, this would come from Supabase
// Using Unsplash images as recommended in PRD
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Web Applications with Next.js 14",
    excerpt: "Learn how to leverage the latest Next.js features to build performant and scalable web applications that can handle millions of users.",
    content: "Full article content here...",
    slug: "building-scalable-web-applications-nextjs-14",
    published_at: "2024-01-15",
    author: "POKY GROUP Team",
    tags: ["Next.js", "React", "Web Development"],
    category: "Web Development",
    read_time: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy software applications.",
    content: "Full article content here...",
    slug: "future-ai-software-development",
    published_at: "2024-01-10",
    author: "POKY GROUP Team",
    tags: ["AI", "Machine Learning", "Software Development"],
    category: "AI & ML",
    read_time: "12 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Cloud Architecture Best Practices for Startups",
    excerpt: "Essential cloud architecture patterns and practices that help startups scale efficiently while managing costs.",
    content: "Full article content here...",
    slug: "cloud-architecture-best-practices-startups",
    published_at: "2024-01-05",
    author: "POKY GROUP Team",
    tags: ["Cloud", "AWS", "Architecture", "Startups"],
    category: "Cloud & DevOps",
    read_time: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Modern Authentication Strategies for Web Apps",
    excerpt: "A comprehensive guide to implementing secure authentication in modern web applications using OAuth, JWT, and more.",
    content: "Full article content here...",
    slug: "modern-authentication-strategies-web-apps",
    published_at: "2024-01-01",
    author: "POKY GROUP Team",
    tags: ["Authentication", "Security", "OAuth", "JWT"],
    category: "Security",
    read_time: "15 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Building Real-time Applications with Supabase",
    excerpt: "Learn how to create real-time applications using Supabase's powerful features including real-time subscriptions and edge functions.",
    content: "Full article content here...",
    slug: "building-realtime-applications-supabase",
    published_at: "2023-12-28",
    author: "POKY GROUP Team",
    tags: ["Supabase", "Real-time", "Database", "Backend"],
    category: "Backend Development",
    read_time: "9 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "The Complete Guide to TypeScript Best Practices",
    excerpt: "Master TypeScript with these essential best practices that will make your code more maintainable and type-safe.",
    content: "Full article content here...",
    slug: "complete-guide-typescript-best-practices",
    published_at: "2023-12-25",
    author: "POKY GROUP Team",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Programming"],
    category: "Programming",
    read_time: "11 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop&crop=center"
  }
]

export function BlogSection() {
  const t = useTranslations('blog')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/30 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${25 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                    />
                  ))}
                </div>

                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative h-48 w-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {post.category}
                      </Badge>
                    </div>
                  </motion.div>
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.read_time}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </motion.span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full group/btn">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </CardContent>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                />
              </Card>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="group">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
