import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { github, linkedin } from '../../constants/contact';

const Footer: React.FC = () => {
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
        <p className="footer__copy">&copy; {year} S. M. Curbelo</p>
      </div>
    </footer>
  );
};

export default Footer;
