import { site } from '@/lib/content/site';

export default function WhatsappFloat() {
  const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola Land Ventures, me gustaría más información.')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactanos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden fill="currentColor">
        <path d="M19.11 17.27c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.37-.81-.72-1.36-1.61-1.52-1.89-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.12 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32z" />
        <path d="M27.16 4.84A15.86 15.86 0 0 0 16.04 0C7.27 0 .14 7.13.14 15.9c0 2.8.73 5.54 2.13 7.95L0 32l8.34-2.19a15.93 15.93 0 0 0 7.7 1.96h.01c8.77 0 15.9-7.13 15.9-15.9 0-4.25-1.65-8.24-4.79-11.03zM16.05 29.07h-.01a13.2 13.2 0 0 1-6.73-1.84l-.48-.29-4.95 1.3 1.32-4.83-.31-.5a13.18 13.18 0 0 1-2.02-7.01c0-7.29 5.94-13.22 13.23-13.22 3.53 0 6.85 1.38 9.35 3.88a13.13 13.13 0 0 1 3.87 9.36c0 7.29-5.94 13.15-13.27 13.15z" />
      </svg>
    </a>
  );
}
