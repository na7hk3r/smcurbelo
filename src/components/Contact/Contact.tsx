import React, { useState, FormEvent } from 'react';
import { m } from 'framer-motion';

interface ContactProps {
  language: 'en' | 'es';
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const content = {
  en: {
    label: 'Contact',
    title: 'Get in touch',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Your message…',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Message sent!',
    success: "Message sent! I'll get back to you within 24 hours.",
    error: 'Something went wrong. Try again, or write me directly at sergiomcurbelo5@gmail.com.',
    socials: 'Or find me on',
  },
  es: {
    label: 'Contacto',
    title: 'Hablemos',
    namePlaceholder: 'Nombre',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Tu mensaje…',
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    messageLabel: 'Mensaje',
    send: 'Enviar',
    sending: 'Enviando…',
    sent: '¡Mensaje enviado!',
    success: '¡Mensaje enviado! Te respondo dentro de las 24 horas.',
    error: 'Algo salió mal. Intentá de nuevo o escribime directo a sergiomcurbelo5@gmail.com.',
    socials: 'También estoy en',
  },
};

const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = content[language];
  const [status, setStatus] = useState<FormStatus>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('sent');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
      setTimeout(() => setStatus('idle'), 3500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  return (
    <section className="contact container" id="contact">
      <m.div
        className="contact__intro"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">{t.label}</span>
        <h2 className="contact__title">{t.title}</h2>

        <p className="contact__socials-label">{t.socials}</p>
        <div className="contact__socials">
          <a href="mailto:sergiomcurbelo5@gmail.com" target="_blank" rel="noopener noreferrer" className="contact__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Email
          </a>
          <a href="https://linkedin.com/in/smcurbelo/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/na7hk3r/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            GitHub
          </a>
        </div>
      </m.div>

      <m.form
        className="contact__form"
        onSubmit={onSubmit}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <label htmlFor="name">{t.nameLabel}</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={t.namePlaceholder}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'contact-form-error' : undefined}
          required
        />
        <label htmlFor="email">{t.emailLabel}</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={t.emailPlaceholder}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'contact-form-error' : undefined}
          required
        />
        <label htmlFor="message">{t.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t.messagePlaceholder}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'contact-form-error' : undefined}
          required
        />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
        <div className="contact__form-error" id="contact-form-error" role="alert">
          {status === 'error' && t.error}
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          className={`btn btn--primary contact__submit${status === 'sent' ? ' contact__submit--sent' : ''}`}
        >
          {status === 'sending' ? t.sending : status === 'sent' ? t.sent : t.send}
          {status === 'idle' && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8l5.5 5.5L14 2" stroke="currentColor" strokeWidth="0" />
              <path d="M1.5 8h9M7 4.5L10.5 8 7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        {status === 'sent' && (
          <div className="contact__success" role="status">
            {t.success}
          </div>
        )}
        </m.form>
    </section>
  );
};

export default Contact;
