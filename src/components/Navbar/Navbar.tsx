import React, { useState, useEffect } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton';
import LanguageToggleButton from '../LanguageToggleButton/LanguageToggleButton';
import { imageLinks } from '../../assets/imageLinks';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  language: 'en' | 'es';
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
  const { theme } = useTheme();
  const content = {
    en: { home: 'Home', about: 'About', experience: 'Experience', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    es: { home: 'Inicio', about: 'Sobre', experience: 'Experiencia', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto' },
  };

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const closeMobileMenu = () => setMobileMenu(false);

  // Lock body scroll + close on Escape + trap focus while the mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const menu = document.querySelector('.nav-list--open');
      const focusable = menu
        ? Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        : [];

      if (focusable.length > 0 && !(previouslyFocused && menu && menu.contains(previouslyFocused))) {
        focusable[0].focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setMobileMenu(false);
          return;
        }

        if (event.key === 'Tab' && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previouslyFocused?.focus();
      };
    }
  }, [mobileMenu]);

  // Highlight the active section link while scrolling
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const links = [
    { to: 'hero', label: content[language].home },
    { to: 'about', label: content[language].about },
    { to: 'experience', label: content[language].experience },
    { to: 'skills', label: content[language].skills },
    { to: 'projects', label: content[language].projects },
    { to: 'contact', label: content[language].contact },
  ];

  return (
    <nav className={`navbar ${mobileMenu ? 'navbar--open' : ''}`} aria-label={language === 'en' ? 'Main navigation' : 'Navegación principal'}>
      <a href="#hero" aria-label={language === 'en' ? 'Sergio M. Curbelo — Home' : 'Sergio M. Curbelo — Inicio'}>
        <img src={theme === 'dark' ? imageLinks.logo_black : imageLinks.logo_white} alt="" className="logo" />
      </a>

      <button
        className={`menu-icon ${mobileMenu ? 'menu-icon--open' : ''}`}
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label={language === 'en' ? 'Toggle menu' : 'Abrir menú'}
        aria-expanded={mobileMenu}
      >
        <span className="menu-icon__bar" />
        <span className="menu-icon__bar" />
        <span className="menu-icon__bar" />
      </button>

      <ul className={mobileMenu ? 'nav-list nav-list--open' : 'nav-list'}>
        {links.map((link) => (
          <li key={link.to}>
            <a
              href={'#' + link.to}
              onClick={closeMobileMenu}
              className={activeSection === link.to ? 'active-link' : undefined}
              aria-current={activeSection === link.to ? 'true' : undefined}
            >
              {link.label}
            </a>
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