import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
  // Use the provided locale or default to 'en'
  const actualLocale = locale || 'en'

  const messages = (await import(`./messages/${actualLocale}.json`)).default

  return {
    locale: actualLocale,
    messages
  }
})
