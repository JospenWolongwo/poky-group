'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const t = useTranslations('landing.testimonials')
  const tItems = useTranslations('landing.testimonials.items')

  // Get localized testimonials from translations
  const testimonials = [
    {
      id: 1,
      name: tItems('0.name'),
      role: tItems('0.role'),
      content: tItems('0.content'),
      rating: 5
    },
    {
      id: 2,
      name: tItems('1.name'),
      role: tItems('1.role'),
      content: tItems('1.content'),
      rating: 5
    },
    {
      id: 3,
      name: tItems('2.name'),
      role: tItems('2.role'),
      content: tItems('2.content'),
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary/20 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

