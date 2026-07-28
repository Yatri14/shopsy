export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shopsy',
  url: 'https://shopsy.example.com',
  logo: 'https://shopsy.example.com/og-image.png',
  sameAs: ['https://www.instagram.com', 'https://www.twitter.com'],
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Aurora Headphones',
  description: 'Immersive sound, all-day comfort, and premium noise cancellation.',
  brand: {
    '@type': 'Brand',
    name: 'Auralis',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '149',
    availability: 'https://schema.org/InStock',
  },
};
