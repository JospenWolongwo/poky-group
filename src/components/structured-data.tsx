export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "POKY GROUP",
    "description": "We build custom software, AI-driven solutions, and cloud integrations that drive growth and efficiency.",
    "url": "https://pokygroup.com",
    "logo": "https://pokygroup.com/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+237-698-80-58-90",
        "contactType": "customer service",
        "areaServed": "CM",
        "availableLanguage": ["English", "French"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+32-465-75-33-38",
        "contactType": "customer service",
        "areaServed": "BE",
        "availableLanguage": ["English", "French"]
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Douala",
        "addressRegion": "Littoral",
        "addressCountry": "CM"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "rue Vital Francoisse",
        "addressLocality": "Bruxelles",
        "postalCode": "6001",
        "addressCountry": "BE"
      }
    ],
    "sameAs": [
      "https://github.com/pokygroup",
      "https://linkedin.com/company/pokygroup",
      "https://twitter.com/pokygroup"
    ],
    "foundingDate": "2024",
    "numberOfEmployees": "5-10",
    "industry": "Software Development",
    "services": [
      "Custom Software Development",
      "AI Solutions",
      "Cloud Integration",
      "Business Automation",
      "Web Development",
      "Mobile App Development"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "POKY GROUP",
    "url": "https://pokygroup.com",
    "description": "Innovative solutions for modern business. Custom software, AI solutions, and cloud integrations.",
    "publisher": {
      "@type": "Organization",
      "name": "POKY GROUP"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pokygroup.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Software Development Services",
    "description": "Custom software development, AI solutions, cloud integration, and business automation services.",
    "provider": {
      "@type": "Organization",
      "name": "POKY GROUP"
    },
    "serviceType": "Software Development",
    "areaServed": ["Cameroon", "Belgium", "Worldwide"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Automation"
          }
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  )
}
