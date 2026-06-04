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
    'Hablemos: info@landventures.com.ar · WhatsApp +54 9 11 5163-6153 · Oficina: Olazábal 1483 Of. 503, DOME Olazábal, Belgrano, CABA.',
  keywords: [
    'contacto Land Ventures',
    'oficina Belgrano',
    'DOME Olazábal',
    'WhatsApp inversión inmobiliaria',
  ],
});

type ChannelKind = 'mail' | 'whatsapp' | 'instagram';
type Channel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: ChannelKind;
  cta: string;
};

const channels: Channel[] = [
  {
    label: 'Email',
    value: site.contact.email,
    href: '#form',
    icon: 'mail',
    cta: 'Envianos un email',
  },
  {
    label: 'WhatsApp',
    value: site.contact.phone,
    href: `https://wa.me/${site.contact.whatsapp}`,
    external: true,
    icon: 'whatsapp',
    cta: 'Escribinos por WhatsApp',
  },
  {
    label: 'Instagram',
    value: site.social.instagramHandle,
    href: site.social.instagram,
    external: true,
    icon: 'instagram',
    cta: 'Seguinos en Instagram',
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
              Ponete en <span className="serif-accent">contacto</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-white/75 max-w-2xl mx-auto text-base md:text-lg">
              Email, WhatsApp o pasate por la oficina. Te respondemos en menos de 24 horas hábiles.
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
                  className="group card-soft card-hover p-7 block relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full bg-brand/5 group-hover:bg-brand/15 transition-colors duration-500" />
                  <div className="relative flex flex-col h-full">
                    <ChannelIcon kind={ch.icon} className="h-8 w-8 text-brand mb-5" />
                    <p className="eyebrow mb-2">{ch.label}</p>
                    <p className="text-base md:text-lg font-medium text-white group-hover:text-brand transition-colors break-all">
                      {ch.value}
                    </p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand/80 group-hover:text-brand group-hover:gap-3 transition-all duration-500">
                      {ch.cta} <span>→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO + OFICINA SIDE-BY-SIDE */}
      <section id="form" className="py-16 md:py-24 border-t border-white/[0.06] bg-ink-dark/30 relative overflow-hidden scroll-mt-24">
        <BgRender opacity={0.25} />
        <div className="container-page max-w-6xl mx-auto relative">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-[1.4fr_1fr]">
            {/* FORMULARIO */}
            <Reveal>
              <div>
                <p className="eyebrow mb-3">Escribinos</p>
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-balance">
                  Empezá a invertir con <span className="serif-accent">Land Ventures</span>
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
                    src="/images/contacto/Dome-olazabal.webp"
                    alt="DOME Olazábal — Oficina Land Ventures"
                    fill
                    sizes="(min-width:1024px) 35vw, 90vw"
                    className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-base font-medium text-white">{site.contact.address.building}</p>
                    <p className="text-sm text-white/80 mt-1">{site.contact.address.street}</p>
                    <p className="text-xs text-white/60 mt-0.5">
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

function ChannelIcon({ kind, className = '' }: { kind: ChannelKind; className?: string }) {
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
      <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
        <path d="M27.16 4.84A15.86 15.86 0 0 0 16.04 0C7.27 0 .14 7.13.14 15.9c0 2.8.73 5.54 2.13 7.95L0 32l8.34-2.19a15.93 15.93 0 0 0 7.7 1.96h.01c8.77 0 15.9-7.13 15.9-15.9 0-4.25-1.65-8.24-4.79-11.03zM16.05 29.07h-.01a13.2 13.2 0 0 1-6.73-1.84l-.48-.29-4.95 1.3 1.32-4.83-.31-.5a13.18 13.18 0 0 1-2.02-7.01c0-7.29 5.94-13.22 13.23-13.22 3.53 0 6.85 1.38 9.35 3.88a13.13 13.13 0 0 1 3.87 9.36c0 7.29-5.94 13.15-13.27 13.15zm7.27-9.93c-.4-.2-2.37-1.17-2.73-1.3-.37-.13-.63-.2-.9.2-.27.4-1.03 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.7-.62-3.23-1.99-1.19-1.06-2-2.38-2.23-2.78-.23-.4-.02-.62.18-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.69-.23-.01-.5-.01-.77-.01-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.34s1.43 3.87 1.63 4.14c.2.27 2.82 4.3 6.83 6.03.96.42 1.7.66 2.28.85.96.3 1.83.26 2.52.16.77-.11 2.37-.97 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.17-.37-.27-.77-.47z" />
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
