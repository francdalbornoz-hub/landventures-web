'use client';

import { useMemo, useState } from 'react';
import { opportunities, type Opportunity } from '@/lib/content/opportunities';
import { site } from '@/lib/content/site';

const AMBIENTES_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: '1', label: '1 ambiente' },
  { value: '2', label: '2 ambientes' },
  { value: '3', label: '3 ambientes' },
  { value: '4', label: '4+ ambientes' },
] as const;

const PRECIO_OPTIONS = [
  { value: 0, label: 'Sin límite' },
  { value: 100000, label: 'USD 100K' },
  { value: 150000, label: 'USD 150K' },
  { value: 200000, label: 'USD 200K' },
  { value: 300000, label: 'USD 300K' },
] as const;

const PRECIO_M2_OPTIONS = [
  { value: 0, label: 'Sin límite' },
  { value: 2500, label: 'USD 2.500/m²' },
  { value: 2700, label: 'USD 2.700/m²' },
  { value: 3000, label: 'USD 3.000/m²' },
  { value: 3500, label: 'USD 3.500/m²' },
] as const;

const FINANCIACION_OPTIONS = [
  { value: 'todas', label: 'Todas' },
  { value: 'si', label: 'Con financiación' },
  { value: 'no', label: 'Solo contado' },
] as const;

function fmtUSD(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

export default function OpportunitiesGrid() {
  const [ambientes, setAmbientes] = useState<string>('todos');
  const [barrio, setBarrio] = useState<string>('todos');
  const [precioMax, setPrecioMax] = useState<number>(0);
  const [precioM2Max, setPrecioM2Max] = useState<number>(0);
  const [financiacion, setFinanciacion] = useState<string>('todas');

  const barrios = useMemo(() => {
    const set = new Set(opportunities.map((o) => o.barrio));
    return ['todos', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return opportunities
      .filter((o) => o.activo)
      .filter((o) => (ambientes === 'todos' ? true : ambientes === '4' ? o.ambientes >= 4 : o.ambientes === Number(ambientes)))
      .filter((o) => (barrio === 'todos' ? true : o.barrio === barrio))
      .filter((o) => (precioMax === 0 ? true : o.precio <= precioMax))
      .filter((o) => (precioM2Max === 0 ? true : o.precioM2 <= precioM2Max))
      .filter((o) => {
        if (financiacion === 'todas') return true;
        if (financiacion === 'si') return o.financiacion;
        return !o.financiacion;
      });
  }, [ambientes, barrio, precioMax, precioM2Max, financiacion]);

  function reset() {
    setAmbientes('todos');
    setBarrio('todos');
    setPrecioMax(0);
    setPrecioM2Max(0);
    setFinanciacion('todas');
  }

  return (
    <div>
      <div className="border border-white/10 bg-ink-dark/40 p-5 md:p-6 rounded-lg mb-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Select label="Ambientes" value={ambientes} onChange={setAmbientes} options={AMBIENTES_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
          <Select label="Barrio" value={barrio} onChange={setBarrio} options={barrios.map((b) => ({ value: b, label: b === 'todos' ? 'Todos' : b }))} />
          <Select label="Precio máx" value={String(precioMax)} onChange={(v) => setPrecioMax(Number(v))} options={PRECIO_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))} />
          <Select label="Precio/m² máx" value={String(precioM2Max)} onChange={(v) => setPrecioM2Max(Number(v))} options={PRECIO_M2_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))} />
          <Select label="Financiación" value={financiacion} onChange={setFinanciacion} options={FINANCIACION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            {filtered.length} {filtered.length === 1 ? 'oportunidad' : 'oportunidades'} con estos filtros
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-xs uppercase tracking-[0.15em] text-white/70 hover:text-brand transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-white/15 p-12 text-center">
          <p className="text-white/60">No hay unidades con estos filtros.</p>
          <p className="text-sm text-white/40 mt-2">Probá cambiar los criterios o limpiar filtros.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-white/60 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink-deep border border-white/15 rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function OpportunityCard({ opportunity: o }: { opportunity: Opportunity }) {
  const message = `Hola, me interesa la oportunidad ${o.tipologia} en ${o.barrio} (${o.id}).`;
  return (
    <article className={`relative border ${o.destacado ? 'border-brand/50' : 'border-white/10'} bg-ink-dark/40 p-6 hover:border-brand/80 transition-colors`}>
      {o.destacado && (
        <span className="absolute -top-2 left-4 bg-brand text-white text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded">
          Destacada
        </span>
      )}
      <p className="eyebrow mb-2">{o.barrio}</p>
      <h3 className="font-display text-2xl mb-3">{o.tipologia}</h3>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-white/50 text-xs uppercase tracking-[0.15em]">Precio</dt>
          <dd className="font-display text-xl text-white">USD {fmtUSD(o.precio)}</dd>
        </div>
        <div>
          <dt className="text-white/50 text-xs uppercase tracking-[0.15em]">USD/m²</dt>
          <dd className="font-display text-xl text-brand">{fmtUSD(o.precioM2)}</dd>
        </div>
        <div>
          <dt className="text-white/50 text-xs uppercase tracking-[0.15em]">Superficie</dt>
          <dd>{o.m2} m²</dd>
        </div>
        <div>
          <dt className="text-white/50 text-xs uppercase tracking-[0.15em]">Entrega</dt>
          <dd>{o.entrega}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-white/50 text-xs uppercase tracking-[0.15em]">Forma de pago</dt>
          <dd>{o.formaPago}{o.financiacion ? ' · Con financiación' : ''}</dd>
        </div>
      </dl>

      <a
        href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block text-center btn-outline w-full"
      >
        Pedí la ficha completa
      </a>
    </article>
  );
}
