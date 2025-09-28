'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 120, height = 40, className = '' }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during hydration
    return (
      <div 
        className={`bg-muted animate-pulse rounded ${className}`}
        style={{ width, height }}
      />
    )
  }

  const logoSrc = theme === 'dark' ? '/logo-dark.svg' : '/logo-day.svg'

  // Debug logging
  console.log('Logo theme:', theme, 'src:', logoSrc)

  return (
    <Image
      src={logoSrc}
      alt="POKY GROUP"
      width={width}
      height={height}
      priority
      className={className}
      onError={(e) => {
        console.error('Logo failed to load:', logoSrc)
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}
