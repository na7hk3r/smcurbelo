import React from 'react';
import { m } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';

interface HeroProps {
  language: 'en' | 'es';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = {
    en: {
      greeting: 'Fullstack Developer · Available',
      name: "I'm Sergio.",
      role: 'I build complete web and desktop products — from design to deployment. For teams or independently.',
      cta: 'See my work',
    },
    es: {
      greeting: 'Desarrollador Fullstack · Disponible',
      name: 'Soy Sergio.',
      role: 'Construyo productos web y de escritorio completos — desde el diseño hasta el deploy. Para equipos o de forma independiente.',
      cta: 'Ver mis proyectos',
    },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-image" aria-hidden="true">
        <img src={imageLinks.home_img} alt="" fetchPriority="high" decoding="async" />
      </div>

      <div className="hero__content">
        <m.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {content[language].greeting}
        </m.p>
        <m.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {content[language].name}
        </m.h1>
        <m.p
          className="hero__role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          {content[language].role}
        </m.p>
        <m.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
        >
          <a href="#projects" className="btn btn--primary hero__btn">
            {content[language].cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn--ghost hero__btn">
            {language === 'en' ? 'Contact' : 'Contacto'}
          </a>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;