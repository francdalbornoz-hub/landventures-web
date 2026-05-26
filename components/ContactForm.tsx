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

    // Fallback simple: abre el cliente de email del usuario con el contenido prellenado.
    // En el futuro, conectá un endpoint (Formspree, Resend, /api/contact) y reemplazá esto.
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
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="nombre" label="Nombre" placeholder="Nombre" />
        <Field name="apellido" label="Apellido" placeholder="Apellido" />
      </div>
      <Field name="email" label="Email" type="email" required placeholder="Dirección de Email" />
      <Field name="asunto" label="Asunto" placeholder="Asunto" />
      <Field name="telefono" label="Número de contacto" type="tel" placeholder="Número de teléfono" />
      <div>
        <label htmlFor="mensaje" className="block text-sm mb-2">
          Tu mensaje <span className="text-brand">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Mensaje"
          className="w-full rounded-md bg-white text-ink px-4 py-3 placeholder:text-ink-mute/70 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="btn-brand min-w-[140px]"
      >
        {state === 'submitting' ? 'Enviando…' : 'Enviar'}
      </button>

      {state === 'success' && (
        <p className="text-sm text-brand">¡Gracias! Abrimos tu cliente de email con la consulta lista para enviar.</p>
      )}
      {state === 'error' && (
        <p className="text-sm text-coral">No pudimos abrir tu cliente de email. Escribinos a {site.contact.email}.</p>
      )}
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
      <label htmlFor={name} className="block text-sm mb-2">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md bg-white text-ink px-4 py-3 placeholder:text-ink-mute/70 focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
