import { useState } from 'react';
import './Navbar.css';
import ToggleButton from '../ToggleButton/ToggleButton.tsx';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton.tsx';
import { Link } from 'react-scroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';

const Navbar = ({ language }) => {
  const content = {
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

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    // setMobileMenu(!mobileMenu);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ['rgba(41, 41, 41, 0)', 'rgba(41, 41, 41, 0.2)']
  );
  const height = useTransform(scrollY, [0, 100], [120, 80]);

  return (
    <>
      <motion.nav
        className="navbar"
        style={{
          background,
          height,
        }}
      >
        <Link to="hero" smooth={true} offset={0} duration={900}>
          <motion.img
            src={imageLinks.logo}
            alt="logo"
            className="logo"
            drag
            dragDirectionLock
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}
            whileTap={{ cursor: 'grabbing' }}
          />
        </Link>

        <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
          <motion.li
            whileHover={{ scale: 1.2, transition: 0.5, fontWeight: 900 }}
          >
            <Link
              to="hero"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
            >
              {content[language].home}
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2, transition: 0.5, fontWeight: 900 }}
          >
            <Link
              to="about-container"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
            >
              {content[language].about}
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2, transition: 0.5, fontWeight: 900 }}
          >
            <Link
              to="skills-container"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
            >
              {content[language].skills}
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2, transition: 0.5, fontWeight: 900 }}
          >
            <Link
              to="projects-container"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
            >
              {content[language].projects}
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2, transition: 0.5, fontWeight: 900 }}
          >
            <Link
              to="contact"
              smooth={true}
              offset={0}
              duration={700}
              onClick={closeMobileMenu}
            >
              {content[language].contact}
            </Link>
          </motion.li>
          <div className="toggle-buttons">
            <ToggleButton />
            <LanguageToggleButton />
          </div>
        </ul>

        <img
          src={imageLinks.menu_icon}
          alt="Menu Icon"
          className="menu-icon"
          onClick={toggleMenu}
        />
      </motion.nav>
    </>
  );
};

export default Navbar;
