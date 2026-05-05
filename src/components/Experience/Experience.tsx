import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../constants/animation';

interface ExperienceProps {
  language: 'en' | 'es';
}

const content = {
  en: {
    label: 'Experience',
    title: 'Professional experience',
    items: [
      {
        company: 'my360',
        logo: '/images/my360-logo.webp',
        role: 'Subcontracted Fullstack Developer (Part-time)',
        period: 'Jan 2024 – Apr 2025 · 1 yr 4 mos',
        description:
          'Collaborated as a subcontracted frontend developer on the V2 of a 360 Tour editor and player — a SaaS platform for real estate agents. Worked with Preact, React, TypeScript and JSX in a professional team environment, integrating krpano for immersive 360° scene rendering and interaction.',
        tags: ['Preact', 'React', 'TypeScript', 'krpano', '360° Tours', 'SaaS'],
      },
    ],
  },
  es: {
    label: 'Experiencia',
    title: 'Experiencia profesional',
    items: [
      {
        company: 'my360',
        logo: '/images/my360-logo.webp',
        role: 'Desarrollador Fullstack subcontratado (Part-time)',
        period: 'Ene 2024 – Abr 2025 · 1 año 4 meses',
        description:
          'Colaboré como desarrollador frontend subcontratado en la V2 del editor y player de Tours 360 — una plataforma SaaS para agentes inmobiliarios. Trabajé con Preact, React, TypeScript y JSX en equipo, integrando krpano para la renderización e interacción de escenas 360° inmersivas.',
        tags: ['Preact', 'React', 'TypeScript', 'krpano', 'Tours 360', 'SaaS'],
      },
    ],
  },
};

const Experience: React.FC<ExperienceProps> = ({ language }) => {
  const t = content[language];

  return (
    <section className="experience" id="experience">
      <motion.header
        className="experience__header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="section-label">{t.label}</span>
        <h2 className="experience__title">{t.title}</h2>
      </motion.header>

      <div className="experience__list">
        {t.items.map((item, i) => (
          <motion.article
            key={`${item.company}-${i}`}
            className="experience-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
          >
            <span className="experience-card__icon" aria-hidden="true">
              <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
            </span>
            <div className="experience-card__body">
              <h3 className="experience-card__company">{item.company}</h3>
              <div className="experience-card__meta">
                <span className="experience-card__role">{item.role}</span>
                <span className="experience-card__period">{item.period}</span>
              </div>
              <p className="experience-card__desc">{item.description}</p>
              <div className="experience-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
