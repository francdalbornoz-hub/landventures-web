import Image from 'next/image';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import ContactForm from '@/components/ContactForm';
import BgRender from '@/components/BgRender';
import Reveal from '@/components/Reveal';

export const metadata = buildMetadata({
  title: 'Contacto',
  path: '/contacto',
  description:
    'Contactá a Land Ventures: info@landventures.com.ar, +54 9 11 5163-6153, WhatsApp e Instagram. Olazábal 1483 Of. 503, Belgrano, CABA.',
});

const channels = [
  {
    label: 'Email',
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    icon: 'mail' as const,
  },
  {
    label: 'WhatsApp',
    value: site.contact.phone,
    href: `https://wa.me/${site.contact.whatsapp}`,
    external: true,
    icon: 'whatsapp' as const,
  },
  {
    label: 'Instagram',
    value: site.social.instagramHandle,
    href: site.social.instagram,
    external: true,
    icon: 'instagram' as const,
  },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Inicio', href: '/' },
            { name: 'Contacto', href: '/contacto' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contacto Land Ventures',
            url: `${site.url}/contacto`,
          },
        ]}
      />

      {/* HERO */}
      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.55} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <Reveal>
            <p className="eyebrow mb-5 mx-auto justify-center w-fit">Hablemos</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-balance leading-tight">
              Organizamos una <span className="serif-accent">reunión</span> con vos.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-white/75 max-w-2xl mx-auto text-base md:text-lg">
              Email, WhatsApp o pasate por la oficina. Te respondemos en menos de 24hs hábiles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CANALES DE CONTACTO */}
      <section className="pb-12 md:pb-20">
        <div className="container-page max-w-5xl mx-auto">
          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((ch, i) => (
              <Reveal key={ch.label} delay={i * 100}>
                <a
                  href={ch.href}
                  {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group card-soft card-hover p-7 block relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full bg-brand/5 group-hover:bg-brand/15 transition-colors duration-500" />
                  <div className="relative">
                    <ChannelIcon kind={ch.icon} className="h-7 w-7 text-brand mb-5" />
                    <p className="eyebrow mb-2">{ch.label}</p>
                    <p className="text-base md:text-lg font-medium text-white group-hover:text-brand transition-colors break-all">
                      {ch.value}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-brand/80 group-hover:gap-3 transition-all duration-500">
                      Abrir <span>→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO + OFICINA SIDE-BY-SIDE */}
      <section className="py-16 md:py-24 border-t border-white/[0.06] bg-ink-dark/30 relative overflow-hidden">
        <BgRender opacity={0.25} />
        <div className="container-page max-w-6xl mx-auto relative">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-[1.4fr_1fr]">
            {/* FORMULARIO */}
            <Reveal>
              <div>
                <p className="eyebrow mb-3">Escribinos</p>
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-balance">
                  Contanos sobre tu <span className="serif-accent">proyecto</span>.
                </h2>
                <p className="text-white/65 mb-10 max-w-md">
                  Si querés saber más sobre desarrollos, terrenos u oportunidades de pozo, escribinos y nos ponemos en contacto.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            {/* OFICINA */}
            <Reveal delay={200}>
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-3">Oficina</p>
                  <h3 className="text-2xl md:text-3xl font-light mb-2 text-balance">
                    Pasate por <span className="serif-accent">la oficina</span>
                  </h3>
                </div>

                <a
                  href={site.contact.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-[4/3] rounded-md overflow-hidden border border-white/10 bg-ink-dark"
                >
                  <Image
                    src="/images/block-default.jpg"
                    alt="Oficina Land Ventures"
                    fill
                    sizes="(min-width:1024px) 35vw, 90vw"
                    className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-base font-medium text-white">{site.contact.address.building}</p>
                    <p className="text-sm text-white/70 mt-1">{site.contact.address.street}</p>
                    <p className="text-xs text-white/55 mt-0.5">
                      {site.contact.address.neighborhood}, CABA
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-brand group-hover:gap-3 transition-all duration-400">
                      Cómo llegar <span>→</span>
                    </span>
                  </div>
                </a>

                <div className="border border-white/10 rounded-md p-5 bg-white/[0.02]">
                  <p className="eyebrow mb-3">Horario</p>
                  <p className="text-sm text-white/80">Lunes a Viernes</p>
                  <p className="text-sm text-white/55">9:00 — 18:00 hs</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ChannelIcon({ kind, className = '' }: { kind: 'mail' | 'whatsapp' | 'instagram'; className?: string }) {
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }
  if (kind === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M3 21l1.65-3.8a9 9 0 113.4 3.4L3 21" />
        <path d="M9 10a5 5 0 005 5l1.5-1.5c.4-.4 1-.5 1.5-.2l.5.3a1 1 0 01.5.9V16a2 2 0 01-2 2 11 11 0 01-11-11 2 2 0 012-2h1.5a1 1 0 01.9.5l.3.5c.3.5.2 1.1-.2 1.5L9 9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
