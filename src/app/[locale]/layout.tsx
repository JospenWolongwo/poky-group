import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/lib/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import "../globals.css";

export const metadata: Metadata = {
  title: "POKY GROUP - Innovative Solutions for Modern Business",
  description: "We build custom software, AI-driven solutions, and cloud integrations that drive growth and efficiency.",
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
      <body className="antialiased">
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
