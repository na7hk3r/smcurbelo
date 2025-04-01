import React from 'react';
import './Tools.css';
import { imageLinks } from '../../assets/imageLinks';

interface ToolsProps {
  language: 'en' | 'es';
}

interface ContentType {
  title: string;
  subtitle: string;
  andOthers: string;
}

interface SkillIconProps {
  src: string;
  alt: string;
}

const Tools: React.FC<ToolsProps> = ({ language }) => {
  const content: Record<'en' | 'es', ContentType> = {
    en: {
      title: 'Skills',
      subtitle: 'Languages and tools I use',
      andOthers: '& Other',
    },
    es: {
      title: 'Habilidades',
      subtitle: 'Lenguajes y herramientas que uso',
      andOthers: '& Otros',
    },
  };

  // Componente reutilizable para los iconos
  const SkillIcon: React.FC<SkillIconProps> = ({ src, alt }) => (
    <div className="tooltip">
      <img src={src} alt={alt} loading="lazy" />
      <span className="tooltiptext">{alt}</span>
    </div>
  );

  return (
    <>
      <div className="tools">
        <h2>{content[language].title}</h2>
        <h1>{content[language].subtitle}</h1>
        <h3>Frontend</h3>
        <div className="language-section">
          <SkillIcon src={imageLinks.javascript_logo} alt="JavaScript" />
          <SkillIcon src={imageLinks.react_logo} alt="React" />
          <SkillIcon src={imageLinks.css_logo} alt="CSS" />
          <SkillIcon src={imageLinks.tailwind_logo} alt="Tailwind" />
          <SkillIcon src={imageLinks.bootstrap_logo} alt="Bootstrap" />
          <SkillIcon src={imageLinks.sass_logo} alt="SASS" />
          <SkillIcon src={imageLinks.vite_logo} alt="Vite" />
          <SkillIcon src={imageLinks.astro_logo} alt="Astro" />
        </div>
        <h3>Backend</h3>
        <div className="language-section">
          <SkillIcon src={imageLinks.java_logo} alt="Java" />
          <SkillIcon src={imageLinks.spring_logo} alt="Springboot" />
          <SkillIcon src={imageLinks.node_logo} alt="Node" />
          <SkillIcon src={imageLinks.express_logo} alt="Express" />
          <SkillIcon src={imageLinks.mongo_logo} alt="MongoDB" />
          <SkillIcon src={imageLinks.sql_logo} alt="MySQL" />
          <SkillIcon src={imageLinks.firebase_logo} alt="Firebase" />
        </div>
        <h3>DevOps</h3>
        <h5>{content[language].andOthers}</h5>
        <div className="language-section">
          <SkillIcon src={imageLinks.python_logo} alt="Python" />
          <SkillIcon src={imageLinks.jest_logo} alt="JEST" />
          <SkillIcon src={imageLinks.selenium_logo} alt="Selenium" />
          <SkillIcon src={imageLinks.docker_logo} alt="Docker" />
          <SkillIcon src={imageLinks.aws_logo} alt="AWS" />
          <SkillIcon src={imageLinks.git_logo} alt="Git" />
          <SkillIcon src={imageLinks.bash_logo} alt="Bash" />
          <SkillIcon src={imageLinks.virtualbox_logo} alt="VirtualBox" />
          <SkillIcon src={imageLinks.figma_logo} alt="Figma" />
        </div>
      </div>
    </>
  );
};

export default Tools;
