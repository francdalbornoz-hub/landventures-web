'use client';

import dynamic from 'next/dynamic';

// Mapa cliente — Leaflet usa window, no funciona en SSR.
const LandsMap = dynamic(() => import('./LandsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] md:h-[70vh] rounded-lg border border-white/10 bg-black/40 grid place-items-center">
      <p className="text-white/60">Cargando mapa…</p>
    </div>
  ),
});

export default function LandsMapClient() {
  return <LandsMap />;
}
