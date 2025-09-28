'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('navigation')
  const tLang = useTranslations('languages')
  const pathname = usePathname()

  // Extract locale from pathname (e.g., '/fr/page' -> 'fr')
  // Use pathname instead of useLocale() to ensure it updates when URL changes
  const locale = pathname.startsWith('/fr') ? 'fr' : 'en'
  
  // Generate URLs for language switching
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  const enUrl = `/en${pathWithoutLocale}`;
  const frUrl = `/fr${pathWithoutLocale}`;


  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'projects', href: `/${locale}/projects` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <nav key={locale} className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary">
            POKY GROUP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {t(item.key as keyof typeof t)}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild key={`en-${locale}`}>
                  <Link href={enUrl} replace className="cursor-pointer">
                    <span className="mr-2">{tLang('english')}</span>
                    {locale === 'en' && <Check className="h-4 w-4 ml-auto" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild key={`fr-${locale}`}>
                  <Link href={frUrl} replace className="cursor-pointer">
                    <span className="mr-2">{tLang('french')}</span>
                    {locale === 'fr' && <Check className="h-4 w-4 ml-auto" />}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Select language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild key={`en-${locale}`}>
                  <Link href={enUrl} replace className="cursor-pointer">
                    <span className="mr-2">{tLang('english')}</span>
                    {locale === 'en' && <Check className="h-4 w-4 ml-auto" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild key={`fr-${locale}`}>
                  <Link href={frUrl} replace className="cursor-pointer">
                    <span className="mr-2">{tLang('french')}</span>
                    {locale === 'fr' && <Check className="h-4 w-4 ml-auto" />}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key as keyof typeof t)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
