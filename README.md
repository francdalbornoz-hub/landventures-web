# Land Ventures — Sitio oficial

Sitio web de [Land Ventures](https://landventures.com.ar) construido con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS**. Reemplaza la versión anterior hecha con WordPress + Divi.

## Por qué este stack

- **Carga rápida:** todas las páginas se prerenderizan estáticamente (SSG). First Load JS < 120 kB.
- **SEO completo:** metadata API de Next, sitemap dinámico, robots, JSON-LD (Organization, RealEstateAgent, Residence, BreadcrumbList, ItemList) y Open Graph.
- **AI-friendly:** `llms.txt` describe el negocio para ChatGPT, Claude, Perplexity y otros agentes que lo soporten. `robots.txt` habilita explícitamente los crawlers de IA.
- **Fácil de editar:** todo el contenido (proyectos, textos, contacto) vive en archivos TypeScript bajo `lib/content/`. Cambiás el archivo → push → deploy automático.
- **Deploy en un comando** a Vercel con dominio propio.

## Estructura

```
app/                          ← Rutas (App Router)
  layout.tsx                  ← Layout global (header, footer, fonts, JSON-LD organizacional)
  page.tsx                    ← Home con hero + secciones parallax por proyecto
  nosotros/page.tsx
  inverti-con-nosotros/page.tsx
  proyectos/page.tsx          ← Grilla de proyectos
  proyectos/[slug]/page.tsx   ← Detalle de cada proyecto (auto-generado por slug)
  contacto/page.tsx
  sitemap.ts                  ← sitemap.xml automático
  robots.ts                   ← robots.txt automático (incluye bots de IA)
  manifest.ts                 ← PWA manifest
  not-found.tsx               ← Página 404

components/
  Header.tsx                  ← Nav fijo con scroll-state
  Footer.tsx
  ProjectSection.tsx          ← Sección parallax full-screen por proyecto
  WhatsappFloat.tsx           ← Botón flotante de WhatsApp
  JsonLd.tsx                  ← Helper para schema.org

lib/
  content/site.ts             ← ⭐ Datos de la empresa, contacto, nav, paleta
  content/projects.ts         ← ⭐ Listado de proyectos
  seo.ts                      ← Helpers para metadata y JSON-LD

public/
  images/logo.png             ← Logo Land Ventures
  images/projects/*.png       ← Imágenes hero de cada proyecto
  llms.txt                    ← Resumen del negocio para LLMs (ChatGPT, Claude, etc.)
  humans.txt
```

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor local en http://localhost:3000
npm run build      # build de producción
npm run start      # server productivo local (después del build)
npm run deploy     # deploy a producción en Vercel
```

## Cómo editar contenido (sin tocar React)

### Cambiar contacto, dirección, redes, navegación
Editá [`lib/content/site.ts`](lib/content/site.ts). Todos los textos del header, footer, JSON-LD y meta tags se actualizan solos.

### Cambiar la frase del hero
También en `lib/content/site.ts`, dentro de `tagline`.

### Agregar / editar / eliminar un proyecto
Todo en [`lib/content/projects.ts`](lib/content/projects.ts):

```ts
{
  slug: 'mi-proyecto',                // se usa para la URL /proyectos/mi-proyecto
  name: 'Nombre',
  suffix: 'sufijo',                   // opcional
  locationHeadline: 'Esquina',
  locationDetail: 'Calle 1 y Calle 2',
  neighborhood: 'Palermo',
  image: '/images/projects/mi-proyecto.png',   // poné la imagen en public/images/projects/
  description: 'Descripción del proyecto.',
  units: ['1 ambiente', '2 ambientes'],
  commercial: true,
  status: 'en-desarrollo',
}
```

Una vez agregado, el proyecto aparece automáticamente en:
- Home (sección parallax)
- /proyectos (grilla)
- /proyectos/[slug] (página de detalle)
- sitemap.xml
- llms.txt (recordá actualizar manualmente este archivo si querés exponerlo a IAs)

### Agregar una página nueva en el futuro
Creá `app/mi-pagina/page.tsx`, sumá la entrada al array `nav` de `lib/content/site.ts` y al `sitemap.ts`. Eso es todo.

## Deploy a Vercel

### Primera vez

1. Instalá la CLI: `npm i -g vercel`
2. Logueate: `vercel login`
3. Desde la raíz del proyecto: `vercel`
   - Vercel detecta Next.js automáticamente.
   - Te crea el proyecto y te da una URL `*.vercel.app`.
4. Para producción: `vercel --prod` (o `npm run deploy`).
5. Conectá el dominio `landventures.com.ar` desde el dashboard de Vercel → Settings → Domains.

### Deploys siguientes

Si conectaste el repo a GitHub: cada `git push` a `main` dispara un deploy productivo automáticamente. También tenés preview por cada PR.

Si no, simplemente corré `npm run deploy` desde acá.

## Performance & SEO

| Aspecto | Implementación |
|---|---|
| Render | Static Site Generation (SSG) — HTML pregenerado para todas las rutas |
| Fuentes | `next/font` (Inter + Manrope) con auto-self-host y `display: swap` |
| Imágenes | `next/image` con AVIF/WebP automático y `priority` en hero |
| Caching | Headers automáticos por Vercel CDN + edge |
| Metadata | Title, description, OG, Twitter Card y canonical por página |
| Schema.org | Organization + RealEstateAgent + WebSite + ItemList + Residence + BreadcrumbList |
| Sitemap | Dinámico (incluye los 6 proyectos) |
| Idioma | `lang="es-AR"` |
| Accesibilidad | Semántica correcta, contraste AA, `prefers-reduced-motion` respetado |
| AI crawlers | `robots.txt` permite GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended |
| `llms.txt` | Resumen estructurado del negocio para LLMs |

## Variables de entorno

Por ahora ninguna requerida. Si en el futuro agregás formularios server-side o analytics:

```
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Stack

- Next.js 15 (App Router) — React 19
- TypeScript 5.7 strict
- Tailwind CSS 3.4
- Vercel (hosting + CDN + edge)
