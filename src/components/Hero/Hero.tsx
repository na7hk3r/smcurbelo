import React from 'react';
import { motion } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';

interface HeroProps {
  language: 'en' | 'es';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content = {
    en: {
      greeting: 'Howdy!',
      name: "I'm Sergio.",
      role: 'I make things for the web.',
      cta: 'See my work',
    },
    es: {
      greeting: '¡Hola!',
      name: 'Soy Sergio.',
      role: "Hago 'cosas' para la web.",
      cta: 'Ver mi trabajo',
    },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-image" aria-hidden="true">
        <img src={imageLinks.home_img} alt="" />
      </div>

      <div className="hero__content">
        <motion.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {content[language].greeting}
        </motion.p>
        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {content[language].name}
        </motion.h1>
        <motion.p
          className="hero__role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          {content[language].role}
        </motion.p>
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
