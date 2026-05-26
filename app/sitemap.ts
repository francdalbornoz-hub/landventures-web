import type { MetadataRoute } from 'next';
import { site } from '@/lib/content/site';
import { projects } from '@/lib/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/inverti-con-nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/proyectos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
  for (const p of projects) {
    routes.push({
      url: `${site.url}/proyectos/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }
  return routes;
}
