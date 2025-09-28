import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { FeaturedProjects } from '@/components/featured-projects'
import { TestimonialsSection } from '@/components/testimonials-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
    </>
  )
}
