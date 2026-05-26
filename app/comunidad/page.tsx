import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import { events } from '@/lib/content/community';

export const metadata = buildMetadata({
  title: 'Comunidad',
  path: '/comunidad',
  description:
    'Eventos, charlas y encuentros de Land Ventures. Conocé a la comunidad de inversores y referentes que se suman a nuestros encuentros.',
});

export default function ComunidadPage() {
  const upcoming = events.filter((e) => e.status === 'proximo');
  const past = events.filter((e) => e.status === 'pasado').sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Comunidad', href: '/comunidad' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-page max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-4">Encuentros y charlas</p>
          <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight text-balance">
            La <em className="text-brand not-italic">comunidad</em> de Land Ventures
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Inversores, desarrolladores e invitados que se suman a nuestras conversaciones sobre mercado inmobiliario, coyuntura económica y nuevas oportunidades.
          </p>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="py-12 md:py-16 border-t border-white/10">
          <div className="container-page max-w-5xl mx-auto">
            <p className="eyebrow mb-6">Próximos eventos</p>
            <div className="grid gap-6 md:grid-cols-2">
              {upcoming.map((e) => (
                <EventCard key={e.slug} event={e} highlight />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-6">Encuentros pasados</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
          {past.length === 0 && (
            <p className="text-white/60">Pronto vamos a sumar el archivo de encuentros pasados.</p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-normal text-balance">
            ¿Querés sumarte a la comunidad?
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
  event: ReturnType<typeof Object> extends never ? never : (typeof events)[number];
  highlight?: boolean;
}) {
  return (
    <article className={`border ${highlight ? 'border-brand/50' : 'border-white/10'} bg-ink-dark/40 overflow-hidden`}>
      {event.cover ? (
        <div className="relative aspect-[16/9]">
          <Image src={event.cover} alt={event.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : (
        <div className="relative aspect-[16/9] bg-gradient-to-br from-brand/20 via-ink-dark to-ink-deep grid place-items-center">
          <span className="font-display text-brand/60 text-3xl">{event.dateLabel ?? event.date}</span>
        </div>
      )}
      <div className="p-6">
        <p className="eyebrow mb-2">{event.dateLabel ?? event.date}</p>
        <h3 className="font-display text-2xl mb-2">{event.title}</h3>
        {event.guest && <p className="text-sm text-brand mb-2">con {event.guest}</p>}
        <p className="text-sm text-white/70 leading-relaxed">{event.description}</p>
        {event.externalUrl && (
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-xs uppercase tracking-[0.15em] text-brand hover:underline"
          >
            Ver más →
          </a>
        )}
      </div>
    </article>
  );
}
