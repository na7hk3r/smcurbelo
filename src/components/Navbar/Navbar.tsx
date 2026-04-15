import React, { useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { Link } from 'react-scroll';
import { imageLinks } from '../../assets/imageLinks';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  language: 'en' | 'es';
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
  const { theme } = useTheme();
  const content = {
    en: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    es: { home: 'Inicio', about: 'Sobre', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto' },
  };

  const [mobileMenu, setMobileMenu] = useState(false);
  const closeMobileMenu = () => setMobileMenu(false);

  const links = [
    { to: 'hero', label: content[language].home },
    { to: 'about', label: content[language].about },
    { to: 'skills', label: content[language].skills },
    { to: 'projects', label: content[language].projects },
    { to: 'contact', label: content[language].contact },
  ];

  return (
    <nav className={`navbar ${mobileMenu ? 'navbar--open' : ''}`}>
      <Link to="hero" smooth={true} offset={0} duration={700}>
        <img src={theme === 'dark' ? imageLinks.logo_black : imageLinks.logo_white} alt="Logo" className="logo" />
      </Link>

      <button
        className={`menu-icon ${mobileMenu ? 'menu-icon--open' : ''}`}
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenu}
      >
        <span className="menu-icon__bar" />
        <span className="menu-icon__bar" />
        <span className="menu-icon__bar" />
      </button>

      <ul className={mobileMenu ? 'nav-list nav-list--open' : 'nav-list'}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              smooth={true}
              offset={-70}
              duration={700}
              onClick={closeMobileMenu}
              spy={true}
              activeClass="active-link"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="toggle-buttons">
          <ToggleButton />
          <LanguageToggleButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
