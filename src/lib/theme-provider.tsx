'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem={false}
      defaultTheme="blue"
      themes={['blue', 'dark']}
      attribute="class"
      storageKey="poky-group-theme"
    >
      {children}
    </NextThemesProvider>
  )
}

// Utility function to determine theme based on African time zone (GMT +1)
export function getThemeByTime(): 'blue' | 'dark' {
  // GMT +1 is West Africa Time (WAT) - UTC +1
  const now = new Date()

  // Get current time in GMT +1
  const gmtPlus1Time = new Date(now.getTime() + (1 * 60 * 60 * 1000))
  const hour = gmtPlus1Time.getUTCHours()

  // Day theme (blue) from 6 AM to 6 PM GMT+1
  // Night theme (dark) from 6 PM to 6 AM GMT+1
  return hour >= 6 && hour < 18 ? 'blue' : 'dark'
}
