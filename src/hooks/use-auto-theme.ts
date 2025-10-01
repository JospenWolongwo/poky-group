'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { getThemeByTime } from '@/lib/theme-provider'

export function useAutoTheme() {
  const { setTheme, theme } = useTheme()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoThemeRef = useRef(false)

  useEffect(() => {
    // Only set auto theme if no theme is currently set or if it's the first load
    if (!theme || theme === 'blue') {
      const timeBasedTheme = getThemeByTime()
      setTheme(timeBasedTheme)
      isAutoThemeRef.current = true
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Update theme every hour
    intervalRef.current = setInterval(() => {
      const newTheme = getThemeByTime()
      setTheme(newTheme)
    }, 60 * 60 * 1000) // Check every hour

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, []) // Remove setTheme from dependencies to prevent re-running

  // Listen for theme changes to detect manual theme changes
  useEffect(() => {
    // If theme is manually changed to something other than auto themes, stop auto theme
    if (theme && !['blue', 'dark'].includes(theme)) {
      isAutoThemeRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [theme])
}
