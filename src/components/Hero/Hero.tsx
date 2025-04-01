import './Hero.css';
import React from 'react';
import { motion } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { Link } from 'react-scroll';

interface HeroProps {
  language: 'en' | 'es';
}

interface ContentType {
  title: string;
  subtitle1: string;
  subtitle2: string;
  text2: string;
  joke: string;
  scrollDown: string;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const content: Record<'en' | 'es', ContentType> = {
    en: {
      title: 'Howdy! 👋',
      subtitle1: "I'm Sergio.",
      subtitle2: 'I make things for the web.',
      text2: 'Let me show you my work!',
      joke: '*yea, dog is oversized.',
      scrollDown: 'Scroll down'
    },
    es: {
      title: 'Hola! 👋',
      subtitle1: 'Soy Sergio.',
      subtitle2: "Hago 'cosas' para la web.",
      text2: '¡Déjame mostrarte mi trabajo!',
      joke: '*si, el perro está gigante.',
      scrollDown: 'Desplazate'
    },
  };

  const initialAnimation = {
    variants: {
      initial: {
        opacity: 0,
        y: 50,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
    },
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true },
  };

  const leftAnimation = {
    variants: {
      initial: {
        opacity: 0,
        x: 0,
      },
      animate: {
        opacity: 1,
        x: 50,
      },
    },
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true },
  };

  return (
    <div className="container hero" id="hero">
      <motion.div
        {...initialAnimation}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        className="left-container"
      >
        <h2>{content[language].title}</h2>
        <h1>
          <span>{content[language].subtitle1}</span>
        </h1>
        <h1>{content[language].subtitle2}</h1>
        <p>{content[language].text2}</p>
      </motion.div>

      <div className="right-container">
        <motion.img
          {...initialAnimation}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          src={imageLinks.home_img}
          alt="Home Image"
          loading="eager" 
        />
        <motion.p
          {...leftAnimation}
          transition={{ delay: 3, type: 'spring', stiffness: 100 }}
        >
          {content[language].joke}
        </motion.p>
      </div>

      <motion.div
        {...initialAnimation}
        transition={{
          delay: 0.7,
          type: 'spring',
          stiffness: 100,
          ease: 'easeInOut',
        }}
        className="scroll-indicator"
      >
        <Link to="about" smooth={true} duration={800} className="scroll-link">
          <div className="scroll-text">{content[language].scrollDown}</div>
          <motion.div 
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
