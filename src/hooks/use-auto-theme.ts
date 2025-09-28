'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { getThemeByTime } from '@/lib/theme-provider'

export function useAutoTheme() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Set initial theme based on time
    const timeBasedTheme = getThemeByTime()
    setTheme(timeBasedTheme)

    // Update theme every hour
    const interval = setInterval(() => {
      const newTheme = getThemeByTime()
      setTheme(newTheme)
    }, 60 * 60 * 1000) // Check every hour

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [setTheme])
}
