import type { MetadataRoute } from 'next';
import { site } from '@/lib/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Land Ventures',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: site.brand.primary,
    lang: 'es-AR',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
