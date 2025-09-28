import { ServicesSection } from '@/components/services-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Custom Software Development & AI Solutions',
  description: 'Comprehensive software development services including custom applications, AI-driven solutions, cloud integration, and business automation. Expert development team in Douala and Brussels.',
  keywords: [
    'custom software development',
    'AI solutions',
    'cloud integration',
    'business automation',
    'web development services',
    'mobile app development',
    'software consulting',
    'Douala software company',
    'Brussels tech solutions'
  ],
  openGraph: {
    title: 'Services - POKY GROUP',
    description: 'Comprehensive software development services including custom applications, AI-driven solutions, cloud integration, and business automation.',
    url: '/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <ServicesSection />
      <TestimonialsSection />
    </>
  )
}

