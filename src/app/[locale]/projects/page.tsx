import { ProjectsSection } from '@/components/projects-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Featured Software Development Portfolio',
  description: 'Explore our featured projects including Pikdrive, Hopimed, Hello Hardware, and more. See our expertise in custom software development, AI solutions, and cloud integration.',
  keywords: [
    'software development portfolio',
    'featured projects',
    'custom software examples',
    'AI solutions projects',
    'web development portfolio',
    'mobile app projects',
    'Pikdrive',
    'Hopimed',
    'Hello Hardware',
    'software case studies'
  ],
  openGraph: {
    title: 'Projects - POKY GROUP Portfolio',
    description: 'Explore our featured projects showcasing expertise in custom software development, AI solutions, and cloud integration.',
    url: '/projects',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsSection />
    </>
  )
}

