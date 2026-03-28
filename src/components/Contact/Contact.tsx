import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  language: 'en' | 'es';
}

const content = {
  en: {
    label: 'Contact',
    title: 'Get in touch',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Your message…',
    send: 'Send',
    sending: 'Sending…',
    success: 'Message sent!',
    socials: 'Or find me on',
  },
  es: {
    label: 'Contacto',
    title: 'Hablemos',
    namePlaceholder: 'Nombre',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Tu mensaje…',
    send: 'Enviar',
    sending: 'Enviando…',
    success: '¡Mensaje enviado!',
    socials: 'También estoy en',
  },
};

const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = content[language];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (data.success) {
      setStatus('sent');
      e.currentTarget.reset();
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('idle');
    }
  };

  return (
    <section className="contact container" id="contact">
      <motion.div
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
      </motion.div>

      <motion.form
        className="contact__form"
        onSubmit={onSubmit}
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <input type="text" name="name" placeholder={t.namePlaceholder} required />
        <input type="email" name="mail" placeholder={t.emailPlaceholder} required />
        <textarea name="message" rows={6} placeholder={t.messagePlaceholder} required />
        <button type="submit" disabled={status === 'sending'} className={`btn btn--primary contact__submit${status === 'sent' ? ' contact__submit--sent' : ''}`}>
          {status === 'sending' ? t.sending : status === 'sent' ? t.success : t.send}
          {status === 'idle' && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8l5.5 5.5L14 2" stroke="currentColor" strokeWidth="0" />
              <path d="M1.5 8h9M7 4.5L10.5 8 7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
