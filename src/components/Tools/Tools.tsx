import React from 'react';
import './Tools.css';
import { imageLinks } from '../../assets/imageLinks';

const Tools = ({ language }) => {
  const content = {
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

  return (
    <>
      <div className="tools">
        <h2>{content[language].title}</h2>
        <h1>{content[language].subtitle}</h1>
        <h3>Frontend</h3>
        <div className="language-section">
          <div className="tooltip">
            <img src={imageLinks.javascript_logo} alt="JavaScript" />
            <span className="tooltiptext">JavaScript</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.react_logo} alt="React" />
            <span className="tooltiptext">React</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.css_logo} alt="CSS" />
            <span className="tooltiptext">CSS</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.tailwind_logo} alt="Tailwind" />
            <span className="tooltiptext">Tailwind</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.bootstrap_logo} alt="Bootstrap" />
            <span className="tooltiptext">Bootstrap</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.sass_logo} alt="SASS" />
            <span className="tooltiptext">SASS</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.vite_logo} alt="Vite" />
            <span className="tooltiptext">Vite</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.astro_logo} alt="Astro" />
            <span className="tooltiptext">Astro</span>
          </div>
        </div>
        <h3>Backend</h3>
        <div className="language-section">
          <div className="tooltip">
            <img src={imageLinks.java_logo} alt="Java" />
            <span className="tooltiptext">Java</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.spring_logo} alt="Springboot" />
            <span className="tooltiptext">Springboot</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.node_logo} alt="Node" />
            <span className="tooltiptext">Node</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.express_logo} alt="Express" />
            <span className="tooltiptext">Express</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.mongo_logo} alt="MongoDB" />
            <span className="tooltiptext">MongoDB</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.sql_logo} alt="MySQL" />
            <span className="tooltiptext">MySQL</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.firebase_logo} alt="Firebase" />
            <span className="tooltiptext">Firebase</span>
          </div>
        </div>
        <h3>DevOps</h3>
        <h5>{content[language].andOthers}</h5>
        <div className="language-section">
          <div className="tooltip">
            <img src={imageLinks.python_logo} alt="Python" />
            <span className="tooltiptext">Python</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.jest_logo} alt="JEST" />
            <span className="tooltiptext">JEST</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.selenium_logo} alt="Selenium" />
            <span className="tooltiptext">Selenium</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.docker_logo} alt="Docker" />
            <span className="tooltiptext">Docker</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.aws_logo} alt="AWS" />
            <span className="tooltiptext">AWS</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.git_logo} alt="Git" />
            <span className="tooltiptext">Git</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.bash_logo} alt="Bash" />
            <span className="tooltiptext">Bash</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.virtualbox_logo} alt="VirtualBox" />
            <span className="tooltiptext">VirtualBox</span>
          </div>
          <div className="tooltip">
            <img src={imageLinks.figma_logo} alt="Figma" />
            <span className="tooltiptext">Figma</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
