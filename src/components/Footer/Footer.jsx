import './Footer.css';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import logo_sword from '../../assets/logo_sword.png';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-scroll';

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const content = {
    en: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      followMe: "Follow me",
      copyright: `Made with <span className="love-icon"><FaHeart /></span> a keyboard by S. M. Curbelo © ${year}`
    },
    es: {
      home: "Inicio",
      about: "Sobre",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
      followMe: "Sígueme",
      copyright: `Hecho con <span className="love-icon"><FaHeart /></span> un teclado por S. M. Curbelo © ${year}`
    }
  };

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-logo-section">
          <img src={logo_sword} alt="Sword Nathker Logo" className="footer-logo" />
        </div>
        <div className="footer-links">
          <Link to="hero" smooth={true} offset={0} duration={700} className="footer-link">
            {content[language].home}
          </Link>
          <Link to="about-container" smooth={true} offset={0} duration={700} className="footer-link">
            {content[language].about}
          </Link>
          <Link to="skills-container" smooth={true} offset={0} duration={700} className="footer-link">
            {content[language].skills}
          </Link>
          <Link to="projects-container" smooth={true} offset={0} duration={700} className="footer-link">
            {content[language].projects}
          </Link>
          <Link to="contact" smooth={true} offset={0} duration={700} className="footer-link">
            {content[language].contact}
          </Link>
        </div>
        <div className="footer-social">
          <a href="https://github.com/na7hk3r/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/smcurbelo" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright" dangerouslySetInnerHTML={{ __html: content[language].copyright }} />
      </div>
    </footer>
  );
};

export default Footer;
