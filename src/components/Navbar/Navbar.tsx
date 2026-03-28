import React, { useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { Link } from 'react-scroll';
import { imageLinks } from '../../assets/imageLinks';

interface NavbarProps {
  language: 'en' | 'es';
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
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
    <nav className="navbar">
      <Link to="hero" smooth={true} offset={0} duration={700}>
        <img src={imageLinks.logo} alt="Logo" className="logo" />
      </Link>

      <button
        className="menu-icon"
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenu}
      >
        <svg viewBox="0 0 100 80" width="26" height="26" fill="currentColor">
          <rect width="100" height="10" rx="5" />
          <rect y="30" width="100" height="10" rx="5" />
          <rect y="60" width="100" height="10" rx="5" />
        </svg>
      </button>

      <ul className={mobileMenu ? 'nav-list nav-list--open' : 'nav-list'}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              smooth={true}
              offset={link.to === 'projects' ? -50 : 0}
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
