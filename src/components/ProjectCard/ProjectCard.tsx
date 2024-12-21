import Tilt from 'react-parallax-tilt';
import './ProjectCard.css';
import ProjectsData from './Projects.json';
import { useLanguage } from '../../context/LanguageContext';
import { imageLinks } from '../../assets/imageLinks';

const ProjectCard = () => {
  const { language } = useLanguage();

  return (
    <>
      {ProjectsData.map((project) => (
        <Tilt
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        perspective={1000}
        transitionSpeed={4000}
        scale={1}
        className="tilt" key={project.id}>
          <div className="card-project">
            <div className="img-container">
              <img src={project.img} alt="" />
            </div>
            <div className="card-info">
              <h2>{project.title[language]}</h2>
              <div className="tags">
                <span>{project.tags.span_1}</span>
                <span>{project.tags.span_2}</span>
                <span>{project.tags.span_3}</span>
              </div>
              <p>{project.description[language]}</p>
              <div className="buttons">
                <a
                  href={project.href_source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={imageLinks.code_icon} alt="Source Code" />
                </a>
                <a
                  href={project.href_source_2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={imageLinks.web_icon} alt="Live Preview" />
                </a>
              </div>
            </div>
          </div>
        </Tilt>
      ))}
    </>
  );
};

export default ProjectCard;
