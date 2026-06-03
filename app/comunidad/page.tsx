import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import { events } from '@/lib/content/community';
import BgRender from '@/components/BgRender';
import Carousel from '@/components/Carousel';

export const metadata = buildMetadata({
  title: 'Comunidad',
  path: '/comunidad',
  description:
    'Eventos, charlas y encuentros de Land Ventures. Conocé a la comunidad de inversores y referentes que se suman a nuestros encuentros.',
});

export default function ComunidadPage() {
  // Eventos unificados: próximos primero, después pasados ordenados desc.
  const upcoming = events.filter((e) => e.status === 'proximo');
  const past = events.filter((e) => e.status === 'pasado').sort((a, b) => b.date.localeCompare(a.date));
  const allEvents = [...upcoming, ...past];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Comunidad', href: '/comunidad' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.06} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <p className="eyebrow mb-5 mx-auto justify-center w-fit">Encuentros y charlas</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
            La <span className="serif-accent">comunidad</span> de Land Ventures
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Inversores, desarrolladores e invitados que se suman a nuestras conversaciones sobre mercado inmobiliario, coyuntura económica y nuevas oportunidades.
          </p>
        </div>
      </section>

      {/* EVENTOS — unificado próximos + pasados, con bg de comunidad */}
      <section className="py-20 md:py-28 border-t border-white/10 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/Eventos/Background-comunidad.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/85" />
          <div className="absolute inset-0 grain" />
        </div>
        {/* Container más ancho y con menos padding para que los 3 eventos
            entren en una sola hilera manteniendo el tamaño actual de las cards. */}
        <div className="relative mx-auto w-full max-w-[1500px] px-4 md:px-6">
          <p className="eyebrow mb-8 mx-auto justify-center w-fit">Eventos</p>
          <div className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-3">
            {allEvents.map((e) => (
              <EventCard key={e.slug} event={e} highlight={e.status === 'proximo'} />
            ))}
          </div>
          {allEvents.length === 0 && (
            <p className="text-white/60 text-center">Pronto vamos a sumar el archivo de eventos.</p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light text-balance">
            ¿Querés sumarte a la <span className="serif-accent">comunidad</span>?
          </h2>
          <p className="mt-4 text-white/70">
            Te avisamos del próximo encuentro y te mandamos las novedades del mercado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola, quiero sumarme a la comunidad de Land Ventures.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand"
            >
              Sumarme por WhatsApp
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({
  event,
  highlight = false,
}: {
  event: (typeof events)[number];
  highlight?: boolean;
}) {
  const isUpcoming = event.status === 'proximo';
  return (
    <article
      className={`relative border ${
        highlight ? 'border-brand/60' : 'border-white/10'
      } bg-ink-dark/40 overflow-hidden`}
    >
      {/* Badge de estado: PRÓXIMO o PASADO */}
      <span
        className={`absolute top-4 left-4 z-20 text-[10px] uppercase tracking-[0.25em] font-medium px-2.5 py-1 rounded ${
          isUpcoming
            ? 'bg-brand text-white'
            : 'bg-ink-deep/80 backdrop-blur-sm text-white/80 border border-white/15'
        }`}
      >
        {isUpcoming ? 'Próximo' : 'Pasado'}
      </span>

      {event.gallery && event.gallery.length > 0 ? (
        <Carousel
          images={event.gallery.map((src, i) => ({ src, alt: `${event.title} — foto ${i + 1}` }))}
          aspectClass="aspect-[4/3]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      ) : event.cover ? (
        <div className="relative aspect-[4/3]">
          <Image src={event.cover} alt={event.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <div className="relative aspect-[4/3] bg-gradient-to-br from-brand/20 via-ink-dark to-ink-deep grid place-items-center">
          <span className="font-light italic text-brand/60 text-2xl">{event.title}</span>
        </div>
      )}
      <div className="p-7 md:p-8">
        {event.guest && (
          <p className="text-sm mb-3">
            <span className="text-brand">{event.guest}</span>
            {event.guestRole && <span className="text-white/55"> · {event.guestRole}</span>}
          </p>
        )}
        <h3 className="text-2xl md:text-3xl font-light mb-3 leading-tight">{event.title}</h3>
        <p className="text-sm md:text-base text-white/70 leading-relaxed">{event.description}</p>
        {event.externalUrl && (
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-xs uppercase tracking-[0.15em] text-brand hover:underline"
          >
            Ver más →
          </a>
        )}
      </div>
    </article>
  );
}
