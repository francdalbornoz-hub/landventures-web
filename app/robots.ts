import type { MetadataRoute } from 'next';
import { site } from '@/lib/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engine bots — allowed everywhere
      { userAgent: '*', allow: '/' },
      // AI crawlers — allowed (queremos que la marca aparezca en respuestas de IA)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
