import Link from 'next/link';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="container-page text-center py-32">
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="text-4xl md:text-6xl font-light mb-4">Página <span className="serif-accent">no encontrada</span></h1>
        <p className="text-white/70 mb-8">La página que buscás no existe o fue movida.</p>
        <Link href="/" className="btn-outline">Volver al inicio</Link>
      </div>
    </section>
  );
}
