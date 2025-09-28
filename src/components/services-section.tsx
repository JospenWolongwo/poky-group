'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Brain, Cloud, Zap } from 'lucide-react'

export function ServicesSection() {
  const t = useTranslations('landing.services')

  const services = [
    {
      key: 'customSoftware',
      icon: Code,
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-blue-600/20',
      hoverGradient: 'from-blue-500/30 to-blue-600/30'
    },
    {
      key: 'aiSolutions',
      icon: Brain,
      color: 'text-purple-500',
      gradient: 'from-purple-500/20 to-purple-600/20',
      hoverGradient: 'from-purple-500/30 to-purple-600/30'
    },
    {
      key: 'cloudIntegration',
      icon: Cloud,
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-green-600/20',
      hoverGradient: 'from-green-500/30 to-green-600/30'
    },
    {
      key: 'automation',
      icon: Zap,
      color: 'text-orange-500',
      gradient: 'from-orange-500/20 to-orange-600/20',
      hoverGradient: 'from-orange-500/30 to-orange-600/30'
    }
  ]

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${service.color} rounded-full`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  <CardHeader className="text-center relative z-10">
                    <motion.div 
                      className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br ${service.gradient} group-hover:${service.hoverGradient} transition-all duration-300`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                      <Icon className={`h-8 w-8 ${service.color}`} />
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {t(`${service.key}.title` as keyof typeof t)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center group-hover:text-foreground/80 transition-colors duration-300">
                      {t(`${service.key}.description` as keyof typeof t)}
                    </CardDescription>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
