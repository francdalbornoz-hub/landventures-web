'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Project, ProjectStatus } from '@/lib/content/projects';

const STATUS_FILTERS: { value: 'todos' | ProjectStatus; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'en-curso', label: 'En curso' },
  { value: 'terminado', label: 'Terminados' },
  { value: 'proximamente', label: 'Próximamente' },
];

const STATUS_LABEL: Record<ProjectStatus, string> = {
  'en-curso': 'En curso',
  terminado: 'Terminado',
  proximamente: 'Próximamente',
};

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'todos' | ProjectStatus>('todos');

  const filtered = useMemo(
    () => (filter === 'todos' ? projects : projects.filter((p) => p.status === filter)),
    [filter, projects],
  );

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = { todos: projects.length };
    for (const p of projects) byStatus[p.status] = (byStatus[p.status] ?? 0) + 1;
    return byStatus;
  }, [projects]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10 max-w-5xl mx-auto justify-center">
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.value;
          const count = counts[f.value] ?? 0;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] border transition-colors ${
                active
                  ? 'bg-brand text-white border-brand'
                  : 'border-white/15 text-white/70 hover:border-brand hover:text-brand'
              }`}
            >
              {f.label} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-white/60 py-16">No hay proyectos en esta categoría todavía.</p>
      ) : (
        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {filtered.map((p) => (
            <Link key={p.slug} href={`#${p.slug}`} scroll className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.locationDetail}`}
                  fill
                  sizes="(min-width:768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] px-2 py-1 text-brand">
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <div className="mt-5 text-center">
                <h2 className="font-display text-3xl md:text-4xl font-normal italic">
                  {p.name} <span className="not-italic">{p.suffix}</span>
                </h2>
                <p className="eyebrow mt-2">{p.locationHeadline}</p>
                <p className="text-sm text-white/70 mt-1">{p.locationDetail}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
