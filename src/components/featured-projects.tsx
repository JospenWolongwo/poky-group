'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function FeaturedProjects() {
  const t = useTranslations('landing.projects')

  // Top 3 featured projects
  const featuredProjects = [
    {
      name: "Pikdrive",
      description: "Modern ride-sharing platform connecting drivers and passengers with real-time tracking, secure payments, and a responsive UI. Supports PWA capabilities for mobile installation.",
      image: "/images/projects/pikdrive.jpg",
      tags: [
        { name: "Next.js", color: "blue-text-gradient" },
        { name: "Supabase", color: "green-text-gradient" },
        { name: "shadcn/ui", color: "pink-text-gradient" }
      ],
      source_code_link: "https://github.com/JospenWolongwo/pickdrive",
      demo_link: "https://pikdrive.com"
    },
    {
      name: "The Luxar",
      description: "A modern luxury lifestyle and fashion platform showcasing premium collections, trends, and brand stories. Built with performance and elegance in mind.",
      image: "/images/projects/luxar_preview.jpg",
      tags: [
        { name: "Next.js 14", color: "blue-text-gradient" },
        { name: "TailwindCSS", color: "green-text-gradient" },
        { name: "Supabase", color: "pink-text-gradient" }
      ],
      source_code_link: "https://github.com/JospenWolongwo/theluxar",
      demo_link: "https://theluxar.com"
    },
    {
      name: "Hello Hardware",
      description: "Full-stack hardware management system with customer-facing interface and admin dashboard. Built using NX monorepo architecture with Angular frontends and NestJS backend.",
      image: "/images/projects/hello_harware.jpg",
      tags: [
        { name: "Angular 17+", color: "blue-text-gradient" },
        { name: "NestJS", color: "green-text-gradient" },
        { name: "NX Monorepo", color: "pink-text-gradient" }
      ],
      source_code_link: "https://github.com/JospenWolongwo/hello-hardware"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"
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
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
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
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative h-48 w-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.source_code_link} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                      {project.demo_link && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <Button size="sm" asChild>
                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag.name}
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          tag.color === 'blue-text-gradient' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : tag.color === 'green-text-gradient'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag.name}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                />
              </Card>
            </motion.div>
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
            <Button size="lg" variant="outline" className="group" asChild>
              <Link href="/projects">
                {t('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
