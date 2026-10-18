import React from 'react';
import { m } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';
import { cv } from '../../constants/documents';

interface AboutProps {
  language: 'en' | 'es';
}

const About: React.FC<AboutProps> = ({ language }) => {
  const content = {
    en: {
      name: 'Sergio Mathias Curbelo',
      text1:
        'Fullstack developer with experience in professional environments and personal products — from landing pages and e-commerce to complex desktop applications with modular architecture, authentication, local AI and automated deployment.',
      text2:
        'I work well both within a team and independently with clients. I care about understanding the problem before writing code, delivering with clarity, and building things that actually get used.',
      text3:
        'Web development · Desktop apps · REST APIs · E-commerce · CI/CD',
    },
    es: {
      name: 'Sergio Mathias Curbelo',
      text1:
        'Desarrollador fullstack con experiencia en entornos profesionales y productos personales — desde landing pages y e-commerce hasta aplicaciones de escritorio complejas con arquitectura modular, autenticación, IA local y deploy automatizado.',
      text2:
        'Trabajo bien tanto dentro de un equipo como de forma independiente con clientes. Me interesa entender el problema antes de escribir código, entregar con claridad y construir cosas que realmente se usen.',
      text3:
        'Desarrollo web · Aplicaciones de escritorio · APIs REST · E-commerce · CI/CD',
    },
  };

  const paragraphs = [content[language].text1, content[language].text2];

  return (
    <section className="about" id="about">
          <img
            src={imageLinks.about_img}
            loading="lazy"
            alt="Sergio Curbelo"
            width={1400}
            height={869}
          />

      <m.div
        className="about__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        <h2 className="about__name">
          {content[language].name}
        </h2>
        <div className="about__prose">
          {paragraphs.map((text, i) => (
            <m.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
            >
              {text}
            </m.p>
          ))}
          <m.p
            className="about__services"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            {content[language].text3}
          </m.p>
        </div>
        <a
          href={cv.href}
          download
          className="btn btn--primary about__cv"
          aria-label={cv.label[language]}
        >
          {cv.label[language]}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </m.div>
    </section>
  );
};

export default About;
