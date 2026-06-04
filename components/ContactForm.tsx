'use client';

import { useState } from 'react';
import { site } from '@/lib/content/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Formulario de contacto conectado a Web3Forms.
 *
 * Setup:
 * 1. Crear cuenta gratis en https://web3forms.com (usar info@landventures.com.ar
 *    como email destino).
 * 2. Copiar el Access Key que te dan.
 * 3. En Vercel: Settings → Environment Variables → agregar
 *    NEXT_PUBLIC_WEB3FORMS_KEY con ese valor.
 * 4. Redeploy y listo — las consultas llegan directo al email.
 *
 * Fallback: si la env var no está configurada, abre el cliente de email
 * del usuario con mailto: pre-llenado (comportamiento anterior).
 */
export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

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
    const subject = asunto || `Consulta desde landventures.com.ar de ${nombre} ${apellido}`.trim();

    setState('submitting');

    // ✅ Camino 1: Web3Forms configurado → POST al endpoint
    if (accessKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            from_name: `${nombre} ${apellido}`.trim() || 'Web Land Ventures',
            subject,
            email,
            phone: telefono,
            message: mensaje,
            replyto: email,
            // Honeypot
            botcheck: data.get('botcheck') ?? '',
          }),
        });
        const json = await res.json();
        if (json.success) {
          setState('success');
          form.reset();
          return;
        }
        console.error('Web3Forms error:', json);
        setState('error');
        return;
      } catch (err) {
        console.error('Web3Forms fetch failed:', err);
        setState('error');
        return;
      }
    }

    // ⚠️ Camino 2: fallback mailto (sin Web3Forms configurado)
    const body = [
      `Nombre: ${nombre} ${apellido}`,
      `Email: ${email}`,
      `Teléfono: ${telefono}`,
      '',
      mensaje,
    ].join('\n');
    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      window.location.href = mailto;
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot anti-spam para Web3Forms */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

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
          <p className="text-sm text-brand">
            {accessKey ? '¡Gracias! Te respondemos a la brevedad.' : '¡Listo! Abrimos tu cliente de email.'}
          </p>
        )}
        {state === 'error' && (
          <p className="text-sm text-coral">No pudimos enviar el mensaje. Escribinos a {site.contact.email}.</p>
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
