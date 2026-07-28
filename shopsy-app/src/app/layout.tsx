import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { organizationSchema } from './schema';
import PWAInstaller from '@/components/PWAInstaller';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shopsy.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shopsy | Premium e-commerce',
    template: '%s | Shopsy',
  },
  description: 'Modern shopping experience with premium fashion, electronics, and home essentials.',
  keywords: ['ecommerce', 'shopping', 'fashion', 'electronics', 'nextjs', 'online store'],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Shopsy',
    description: 'Premium modern e-commerce experience.',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shopsy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopsy',
    description: 'Premium modern e-commerce experience.',
    creator: '@shopsy',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <PWAInstaller />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
