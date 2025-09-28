import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/lib/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/structured-data';
import { Analytics } from '@/components/analytics';
import { PerformanceOptimizer } from '@/components/performance-optimizer';
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "POKY GROUP - Innovative Solutions for Modern Business",
    template: "%s | POKY GROUP"
  },
  description: "We build custom software, AI-driven solutions, and cloud integrations that drive growth and efficiency. Serving clients in Douala, Makepe and Brussels.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    "custom software development",
    "AI solutions",
    "cloud integration",
    "web development",
    "mobile app development",
    "business automation",
    "software consulting",
    "tech solutions",
    "Douala",
    "Brussels",
    "Cameroon",
    "Belgium"
  ],
  authors: [{ name: "POKY GROUP" }],
  creator: "POKY GROUP",
  publisher: "POKY GROUP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pokygroup.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fr': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pokygroup.com',
    siteName: 'POKY GROUP',
    title: 'POKY GROUP - Innovative Solutions for Modern Business',
    description: 'We build custom software, AI-driven solutions, and cloud integrations that drive growth and efficiency.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'POKY GROUP - Innovative Solutions for Modern Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'POKY GROUP - Innovative Solutions for Modern Business',
    description: 'We build custom software, AI-driven solutions, and cloud integrations that drive growth and efficiency.',
    images: ['/og-image.jpg'],
    creator: '@pokygroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <Analytics />
        <PerformanceOptimizer />
        <ThemeProvider
          attribute="class"
          defaultTheme="blue"
          themes={['dark', 'blue']}
          enableSystem={false}
        >
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
