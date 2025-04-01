import React, { useState } from 'react';
import './Navbar.css';
import ToggleButton from '../ToggleButton/ToggleButton';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { Link } from 'react-scroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';

interface NavbarProps {
  language: 'en' | 'es';
}

interface ContentType {
  home: string;
  about: string;
  skills: string;
  projects: string;
  contact: string;
}

interface DragTransition {
  bounceStiffness: number;
  bounceDamping: number;
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
  const content: Record<'en' | 'es', ContentType> = {
    en: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    es: {
      home: 'Inicio',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
  };

  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMobileMenu(!mobileMenu);
  };

  const closeMobileMenu = (): void => {
    setMobileMenu(false);
  };

  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ['rgba(41, 41, 41, 0)', 'rgba(41, 41, 41, 0.2)']
  );
  const height = useTransform(scrollY, [0, 100], [120, 80]);

  const dragTransition: DragTransition = {
    bounceStiffness: 600,
    bounceDamping: 20,
  };

  const hoverEffect = {
    scale: 1.2, 
    transition: { duration: 0.3 },
    color: 'var(--cream)'
  };

  return (
    <>
      <motion.nav
        className="navbar"
        style={{
          background,
          height,
        }}
      >
        <Link to="hero" smooth={true} offset={0} duration={900} spy={true}>
          <motion.img
            src={imageLinks.logo}
            alt="logo"
            className="logo"
            drag
            dragDirectionLock
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragTransition={dragTransition}
            dragElastic={0.5}
            whileTap={{ cursor: 'grabbing' }}
          />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <svg viewBox="0 0 100 80" width="30" height="30" fill="var(--cream)">
            <rect width="100" height="10" rx="5"></rect>
            <rect y="30" width="100" height="10" rx="5"></rect>
            <rect y="60" width="100" height="10" rx="5"></rect>
          </svg>
        </div>

        <ul className={mobileMenu ? 'mobile-menu-active' : 'mobile-menu-hidden'}>
          <motion.li whileHover={hoverEffect}>
            <Link
              to="hero"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {content[language].home}
            </Link>
          </motion.li>
          <motion.li whileHover={hoverEffect}>
            <Link
              to="about"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {content[language].about}
            </Link>
          </motion.li>
          <motion.li whileHover={hoverEffect}>
            <Link
              to="skills"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {content[language].skills}
            </Link>
          </motion.li>
          <motion.li whileHover={hoverEffect}>
            <Link
              to="projects"
              smooth={true}
              offset={-50}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {content[language].projects}
            </Link>
          </motion.li>
          <motion.li whileHover={hoverEffect}>
            <Link
              to="contact"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {content[language].contact}
            </Link>
          </motion.li>
          <div className="toggle-buttons">
            <ToggleButton />
            <LanguageToggleButton />
          </div>
        </ul>
      </motion.nav>
    </>
  );
};

export default Navbar;
