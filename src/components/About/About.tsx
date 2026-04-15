import React from 'react';
import { motion } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';

interface AboutProps {
  language: 'en' | 'es';
}

const About: React.FC<AboutProps> = ({ language }) => {
  const content = {
    en: {
      label: 'About Me',
      name: 'Sergio Mathias Curbelo',
      text1:
        'Fullstack developer focused on delivering practical, well-built web solutions — from landing pages and e-commerce sites to desktop applications and backend APIs.',
      text2:
        'I work directly with businesses and entrepreneurs, turning ideas into functional products with clean code, clear communication, and on-time delivery.',
      text3:
        'Web development · Desktop applications · REST APIs · E-commerce · UI implementation',
      cv: 'Download CV',
    },
    es: {
      label: 'Sobre Mí',
      name: 'Sergio Mathias Curbelo',
      text1:
        'Desarrollador fullstack enfocado en entregar soluciones web prácticas y bien construidas — desde landing pages y sitios e-commerce hasta aplicaciones de escritorio y APIs backend.',
      text2:
        'Trabajo directamente con empresas y emprendedores, transformando ideas en productos funcionales con código limpio, comunicación clara y entregas puntuales.',
      text3:
        'Desarrollo web · Aplicaciones de escritorio · APIs REST · E-commerce · Implementación UI',
      cv: 'Descargar CV',
    },
  };

  const paragraphs = [content[language].text1, content[language].text2];

  return (
    <section className="about" id="about">
          <img
            src={imageLinks.about_img}
            loading="lazy"
            alt="Sergio Curbelo"
          />

      <motion.div
        className="about__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        <span className="section-label">{content[language].label}</span>
        <h2 className="about__name">
          {content[language].name}
        </h2>
        <div className="about__prose">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
            >
              {text}
            </motion.p>
          ))}
          <motion.p
            className="about__services"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            {content[language].text3}
          </motion.p>
        </div>
        <a
          href="/curbelo_2025.pdf"
          download
          className="btn btn--primary about__cv"
          aria-label="Download CV"
        >
          {content[language].cv}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default About;
