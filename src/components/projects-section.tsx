'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function ProjectsSection() {
  const t = useTranslations('landing.projects')
  const tItems = useTranslations('landing.projects.items')

  // Helper function to safely get demo link
  const getDemoLink = (index: string) => {
    try {
      const link = tItems(`${index}.demo_link`)
      return link && link.trim() !== '' ? link : undefined
    } catch {
      return undefined
    }
  }

  // Get localized projects from translations
  const projects = [
    {
      name: tItems('0.name'),
      description: tItems('0.description'),
      tags: [
        { name: tItems('0.tags.0.name'), color: tItems('0.tags.0.color') },
        { name: tItems('0.tags.1.name'), color: tItems('0.tags.1.color') },
        { name: tItems('0.tags.2.name'), color: tItems('0.tags.2.color') }
      ],
      source_code_link: tItems('0.source_code_link'),
      demo_link: getDemoLink('0')
    },
    {
      name: tItems('1.name'),
      description: tItems('1.description'),
      tags: [
        { name: tItems('1.tags.0.name'), color: tItems('1.tags.0.color') },
        { name: tItems('1.tags.1.name'), color: tItems('1.tags.1.color') },
        { name: tItems('1.tags.2.name'), color: tItems('1.tags.2.color') }
      ],
      source_code_link: tItems('1.source_code_link'),
      demo_link: getDemoLink('1')
    },
    {
      name: tItems('2.name'),
      description: tItems('2.description'),
      tags: [
        { name: tItems('2.tags.0.name'), color: tItems('2.tags.0.color') },
        { name: tItems('2.tags.1.name'), color: tItems('2.tags.1.color') },
        { name: tItems('2.tags.2.name'), color: tItems('2.tags.2.color') }
      ],
      source_code_link: tItems('2.source_code_link'),
      demo_link: getDemoLink('2')
    },
    {
      name: tItems('3.name'),
      description: tItems('3.description'),
      tags: [
        { name: tItems('3.tags.0.name'), color: tItems('3.tags.0.color') },
        { name: tItems('3.tags.1.name'), color: tItems('3.tags.1.color') },
        { name: tItems('3.tags.2.name'), color: tItems('3.tags.2.color') }
      ],
      source_code_link: tItems('3.source_code_link'),
      demo_link: getDemoLink('3')
    },
    {
      name: tItems('4.name'),
      description: tItems('4.description'),
      tags: [
        { name: tItems('4.tags.0.name'), color: tItems('4.tags.0.color') },
        { name: tItems('4.tags.1.name'), color: tItems('4.tags.1.color') },
        { name: tItems('4.tags.2.name'), color: tItems('4.tags.2.color') }
      ],
      source_code_link: tItems('4.source_code_link'),
      demo_link: getDemoLink('4')
    },
    {
      name: tItems('5.name'),
      description: tItems('5.description'),
      tags: [
        { name: tItems('5.tags.0.name'), color: tItems('5.tags.0.color') },
        { name: tItems('5.tags.1.name'), color: tItems('5.tags.1.color') },
        { name: tItems('5.tags.2.name'), color: tItems('5.tags.2.color') }
      ],
      source_code_link: tItems('5.source_code_link'),
      demo_link: getDemoLink('5')
    }
  ]

  // Map project names to image paths
  const getProjectImage = (projectName: string) => {
    const imageMap: Record<string, string> = {
      "Pikdrive": "/images/projects/pikdrive.jpg",
      "Hopimed": "/images/projects/hopimed.jpg",
      "Hello Hardware": "/images/projects/hello_harware.jpg",
      "Hello Identity": "/images/projects/hello_identity.jpg",
      "SecureVault Military": "/images/projects/secure_vault.jpg",
      "The Luxar": "/images/projects/luxar_preview.jpg"
    }
    return imageMap[projectName] || "/images/projects/default.jpg"
  }

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
          {projects.map((project, index) => (
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
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/30 rounded-full"
                      style={{
                        left: `${15 + i * 25}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
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
                    className="relative h-48 w-full overflow-hidden group/image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={getProjectImage(project.name)}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Stable overlay that covers the entire image area */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          asChild
                          className="hover:scale-105 transition-transform"
                        >
                          <a href={project.source_code_link} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            {t('code')}
                          </a>
                        </Button>
                      </div>
                      {project.demo_link && (
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 delay-100">
                          <Button 
                            size="sm" 
                            asChild
                            className="hover:scale-105 transition-transform"
                          >
                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {t('liveDemo')}
                            </a>
                          </Button>
                        </div>
                      )}
                  </div>
                  </motion.div>
                </div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
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