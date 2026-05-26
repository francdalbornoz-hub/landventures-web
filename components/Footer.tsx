import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-deep border-t border-white/[0.06]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1.2fr] items-start">
          <div>
            <Link href="/" aria-label={`${site.name} — Inicio`} className="inline-block">
              <Image
                src="/images/logo.png"
                alt={`${site.name} logo`}
                width={2522}
                height={1240}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-xs">
              {site.shortDescription}
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Navegación</h3>
            <ul className="space-y-3 text-sm">
              {site.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-brand transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-brand transition-colors flex items-center gap-2">
                  <EmailIcon className="h-3.5 w-3.5 text-brand shrink-0" />
                  <span>{site.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors flex items-center gap-2"
                >
                  <PhoneIcon className="h-3.5 w-3.5 text-brand shrink-0" />
                  <span>{site.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="h-3.5 w-3.5 text-brand shrink-0" />
                  <span>{site.social.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Oficina</h3>
            <a
              href={site.contact.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-base font-medium text-white group-hover:text-brand transition-colors">
                {site.contact.address.building}
              </p>
              <p className="text-sm text-white/70 mt-1 group-hover:text-white/90 transition-colors">
                {site.contact.address.street}
              </p>
              <p className="text-sm text-white/55 mt-0.5">
                {site.contact.address.neighborhood}, CABA
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                Cómo llegar →
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <p>© {year} {site.legalName}. Todos los derechos reservados.</p>
          <p className="tracking-[0.15em] uppercase">Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}

function EmailIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.05 17.31l-1.92-1.92a1.5 1.5 0 00-1.69-.31l-1.61.81a11.6 11.6 0 01-4.72-4.72l.81-1.61a1.5 1.5 0 00-.31-1.69L7.69 5a1.5 1.5 0 00-2.12 0L4.4 6.17a3 3 0 00-.77 2.92c1.27 5.6 5.69 10 11.28 11.28a3 3 0 002.92-.77l1.17-1.17a1.5 1.5 0 00.05-2.12z" />
    </svg>
  );
}
function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
