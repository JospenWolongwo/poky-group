'use client'

import * as React from 'react'
import { Moon, Sun, Palette, Clock } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { getThemeByTime } from '@/lib/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('theme')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    // Toggle between blue and dark themes
    setTheme(theme === 'blue' ? 'dark' : 'blue')
  }

  const applyAutomaticTheme = () => {
    const automaticTheme = getThemeByTime()
    setTheme(automaticTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'blue':
        return <Sun className="h-4 w-4" />
      default:
        return <Palette className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return t('dark')
      case 'blue':
        return t('blueDay')
      default:
        return 'Unknown'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
        >
          {getIcon()}
          <span className="sr-only">Theme options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={toggleTheme}
          className="cursor-pointer"
        >
          <Palette className="mr-2 h-4 w-4" />
          <span className="mr-2">{t('toggleTheme')}</span>
          <span className="text-xs text-muted-foreground">
            ({getThemeLabel()})
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={applyAutomaticTheme}
          className="cursor-pointer"
        >
          <Clock className="mr-2 h-4 w-4" />
          <span className="mr-2">{t('automatic')}</span>
          <span className="text-xs text-muted-foreground">
            ({t('automaticDescription')})
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
