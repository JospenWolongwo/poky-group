'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'

export function Footer() {
  const tNav = useTranslations('navigation')
  const tFooter = useTranslations('footer')
  const pathname = usePathname()
  
  // Extract locale from pathname (e.g., '/fr/page' -> 'fr')
  const locale = pathname.startsWith('/fr') ? 'fr' : 'en'

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'projects', href: `/${locale}/projects` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <footer key={`footer-${locale}`} className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo width={140} height={47} />
            <p className="text-muted-foreground">
              {tFooter('company.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{tFooter('quickLinks')}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tNav(item.key as keyof typeof tNav)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{tFooter('services.title')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{tFooter('services.customSoftware')}</li>
              <li>{tFooter('services.aiSolutions')}</li>
              <li>{tFooter('services.cloudIntegration')}</li>
              <li>{tFooter('services.automation')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{tFooter('contact.title')}</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>{tFooter('contact.email')}</p>
              <p>{tFooter('contact.phone')}</p>
              <p>{tFooter('contact.location')}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>{tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
