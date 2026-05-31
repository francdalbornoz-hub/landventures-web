import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappFloat from '@/components/WhatsappFloat';
import JsonLd from '@/components/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { site } from '@/lib/content/site';

// Sola tipografía del sitio: Montserrat en todo el rango de pesos + italic.
// Sin serif — el acento elegante se logra con Montserrat 300 italic en color brand.
const sans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  themeColor: '#e09900',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Desarrollos e inversión inmobiliaria en Buenos Aires`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'desarrolladora inmobiliaria',
    'Buenos Aires',
    'Palermo Hollywood',
    'Colegiales',
    'San Telmo',
    'inversión inmobiliaria',
    'departamentos',
    'pozo',
    'Land Ventures',
  ],
  category: 'real estate',
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Desarrollos e inversión inmobiliaria en Buenos Aires`,
    description: site.description,
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Desarrollos e inversión inmobiliaria en Buenos Aires`,
    description: site.description,
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={sans.variable}>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
