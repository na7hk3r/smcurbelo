import './About.css';
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
      born: "'94",
      text1: "I'm deeply passionate about technology, learning and arts.",
      text2:
        'I excel in creative and collaborative environments, always prioritizing teamwork, communication, and problem-solving.',
      text3:
        'I strongly believe that adaptability and a willingness to evolve are invaluable qualities that I can contribute to any organization or project I engage with.',
      cv: 'Download CV',
    },
    es: {
      label: 'Sobre Mí',
      name: 'Sergio Mathias Curbelo',
      born: "'94",
      text1:
        'Me apasiona profundamente la tecnología, el aprendizaje y las artes.',
      text2:
        'Destaco en entornos creativos y colaborativos, siempre priorizando el trabajo en equipo, la comunicación y la resolución de problemas.',
      text3:
        'Creo firmemente que la adaptabilidad y la disposición a evolucionar son cualidades invaluables que puedo aportar a cualquier organización o proyecto en el que participe.',
      cv: 'Descargar CV',
    },
  };

  const paragraphs = [content[language].text1, content[language].text2, content[language].text3];

  return (
    <section className="about" id="about">
      <div className="about__image-col">
        <motion.figure
          className="about__image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <img
            src={imageLinks.about_img}
            loading="lazy"
            alt="Sergio Curbelo"
          />
          <div className="about__image-blur" aria-hidden="true" />
        </motion.figure>
      </div>

      <motion.div
        className="about__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        <span className="section-label">{content[language].label}</span>
        <h2 className="about__name">
          {content[language].name} <span className="about__born">{content[language].born}</span>
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
