import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import ContactForm from '@/components/ContactForm';

export const metadata = buildMetadata({
  title: 'Contacto',
  path: '/contacto',
  description:
    'Contactá a Land Ventures: info@landventures.com.ar, +54 9 11 5163-6153, WhatsApp e Instagram. Buenos Aires, Argentina.',
});

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

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-page max-w-4xl mx-auto text-center">
          <h1 className="text-brand text-2xl md:text-4xl font-medium uppercase tracking-[0.2em]">
            Contacto
          </h1>
          <p className="mt-8 font-display text-2xl md:text-3xl font-normal text-balance">
            Ponete en <span className="text-brand">contacto</span> y organizamos una{' '}
            <span className="text-brand">reunión</span> con nuestro equipo.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <a
            href={`mailto:${site.contact.email}`}
            className="border border-white/15 p-8 hover:border-brand transition-colors group"
          >
            <p className="eyebrow mb-3">Email</p>
            <p className="font-display text-xl md:text-2xl group-hover:text-brand transition-colors">
              {site.contact.email}
            </p>
          </a>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 p-8 hover:border-brand transition-colors group"
          >
            <p className="eyebrow mb-3">WhatsApp / Teléfono</p>
            <p className="font-display text-xl md:text-2xl group-hover:text-brand transition-colors">
              {site.contact.phone}
            </p>
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 p-8 hover:border-brand transition-colors group"
          >
            <p className="eyebrow mb-3">Instagram</p>
            <p className="font-display text-xl md:text-2xl group-hover:text-brand transition-colors">
              {site.social.instagramHandle}
            </p>
          </a>
        </div>
      </section>

      <section className="pb-20 md:pb-28 border-t border-white/10 pt-16 md:pt-24">
        <div className="container-page max-w-3xl mx-auto">
          <h2 className="text-center font-display text-3xl md:text-4xl font-normal mb-10">
            Escribinos
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
