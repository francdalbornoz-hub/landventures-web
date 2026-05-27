'use client';

import { useState } from 'react';
import { site } from '@/lib/content/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get('nombre') ?? '');
    const apellido = String(data.get('apellido') ?? '');
    const email = String(data.get('email') ?? '');
    const asunto = String(data.get('asunto') ?? '');
    const telefono = String(data.get('telefono') ?? '');
    const mensaje = String(data.get('mensaje') ?? '');

    // Fallback: abre el cliente de email del usuario con el contenido prellenado.
    // En el futuro, conectar un endpoint (Formspree, Resend, /api/contact) y reemplazar.
    const body = [
      `Nombre: ${nombre} ${apellido}`,
      `Email: ${email}`,
      `Teléfono: ${telefono}`,
      '',
      mensaje,
    ].join('\n');

    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      asunto || `Consulta de ${nombre} ${apellido}`.trim(),
    )}&body=${encodeURIComponent(body)}`;

    setState('submitting');
    try {
      window.location.href = mailto;
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="nombre" label="Nombre" placeholder="Tu nombre" />
        <Field name="apellido" label="Apellido" placeholder="Tu apellido" />
      </div>
      <Field name="email" label="Email" type="email" required placeholder="tu@email.com" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="telefono" label="Teléfono" type="tel" placeholder="+54 9 11 ..." />
        <Field name="asunto" label="Asunto" placeholder="¿Sobre qué querés hablar?" />
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-[10px] uppercase tracking-[0.22em] text-white/55 mb-2 font-medium">
          Tu mensaje <span className="text-coral">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Contanos en qué te podemos ayudar"
          className="w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:bg-white/[0.06] transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="btn-brand min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
          {state !== 'submitting' && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 h-4 w-4" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {state === 'success' && (
          <p className="text-sm text-brand">¡Listo! Abrimos tu cliente de email.</p>
        )}
        {state === 'error' && (
          <p className="text-sm text-coral">Escribinos directo a {site.contact.email}.</p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.22em] text-white/55 mb-2 font-medium">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:bg-white/[0.06] transition-colors"
      />
    </div>
  );
}
