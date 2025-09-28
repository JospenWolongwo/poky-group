import { BlogSection } from '@/components/blog-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Latest Tech Insights & Software Development Articles',
  description: 'Stay updated with the latest trends in web development, AI, cloud computing, and software engineering. Expert insights from POKY GROUP development team.',
  keywords: [
    'tech blog',
    'software development articles',
    'web development insights',
    'AI technology blog',
    'cloud computing articles',
    'programming tutorials',
    'tech trends',
    'software engineering blog',
    'development best practices'
  ],
  openGraph: {
    title: 'Blog - POKY GROUP Tech Insights',
    description: 'Latest insights on web development, AI, cloud computing, and software engineering from our expert development team.',
    url: '/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <BlogSection />
    </>
  )
}

