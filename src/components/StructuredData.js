import { getSiteUrl } from '@/lib/siteUrl';

/**
 * LocalBusiness structured data (JSON-LD).
 *
 * This is what lets Google show a rich result for brand and local searches
 * like "jitesh engineering boisar" - name, address, geo, phone, hours, and the
 * service catalogue in a machine-readable form. It complements, and does not
 * replace, a Google Business Profile, which is the single biggest factor for
 * name searches and must be created separately at business.google.com.
 *
 * Rendered once in the root layout so it appears on every page.
 */
export default function StructuredData() {
  const siteUrl = getSiteUrl();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MachineShop',
    '@id': `${siteUrl}/#business`,
    name: 'Jitesh Engineering Works',
    description:
      'Precision CNC machining, VMC milling and drilling, lathe work, metal fabrication and textile loom spares in Boisar, M.I.D.C. Tarapur, Palghar, Maharashtra.',
    url: siteUrl,
    telephone: '+919323397961',
    email: 'jiteshengineeringworks20@gmail.com',
    founder: 'Rajesh Pujari',
    foundingDate: '2005',
    image: `${siteUrl}/images/hero-bg.jpg`,
    priceRange: '\u20B9\u20B9',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. W/12, Near Custom Capsule, Camlin Naka, M.I.D.C. Tarapur',
      addressLocality: 'Boisar',
      addressRegion: 'Maharashtra',
      postalCode: '401506',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.7995,
      longitude: 72.7489,
    },
    areaServed: [
      { '@type': 'City', name: 'Boisar' },
      { '@type': 'City', name: 'Palghar' },
      { '@type': 'City', name: 'Tarapur' },
      { '@type': 'State', name: 'Maharashtra' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Services',
      itemListElement: [
        'CNC Machining',
        'Lathe Machining',
        'VMC Milling & Drilling',
        'Metal Fabrication & Welding',
        'Custom Parts Manufacturing',
        'Drilling Loom Spares & Textile Parts',
      ].map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}



