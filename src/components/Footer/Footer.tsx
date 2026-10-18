import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { email, github, linkedin } from '../../constants/contact';
import { cv } from '../../constants/documents';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__socials">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        {/* PRODUCT.md:28 — "contact and CV access must be recognizable
            immediately". Both carry a visible label, so neither depends on
            knowing what an icon means. */}
        <div className="footer__links">
          <a href={cv.href} download>
            {cv.label[language]}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <p className="footer__copy">&copy; {year} S. M. Curbelo</p>
      </div>
    </footer>
  );
};

export default Footer;
