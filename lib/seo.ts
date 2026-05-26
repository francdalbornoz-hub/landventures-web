import type { Metadata } from 'next';
import { site } from './content/site';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
};

export function buildMetadata({
  title,
  description = site.description,
  path = '/',
  image = '/images/projects/dorrego.jpg',
  type = 'website',
}: BuildMetadataInput = {}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Desarrollos inmobiliarios en Buenos Aires`;
  const absoluteImage = image.startsWith('http') ? image : `${site.url}${image}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}/images/logo.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: { '@type': 'City', name: 'Buenos Aires' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.countryCode,
    },
    sameAs: [site.social.instagram],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@type': 'Organization', name: site.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}
