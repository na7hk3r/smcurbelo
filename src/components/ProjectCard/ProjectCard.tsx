import './ProjectCard.css';
import React from 'react';
import ProjectsData from './Projects.json';
import { imageLinks } from '../../assets/imageLinks';

interface ProjectCardProps {
  language: 'en' | 'es';
}

interface Project {
  id: number;
  img: string;
  title: {
    en: string;
    es: string;
  };
  tags: {
    span_1: string;
    span_2: string;
    span_3: string;
  };
  description: {
    en: string;
    es: string;
  };
  href_source: string;
  href_source_2: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ language }) => {
  return (
    <>
      {(ProjectsData as Project[]).map((project) => (
        <div className="card-project" key={project.id}>
          <div className="img-container">
            <img src={project.img} alt={project.title[language]} loading="lazy" />
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
                aria-label="View Source Code"
              >
                <img src={imageLinks.code_icon} alt="Source Code" />
              </a>
              <a
                href={project.href_source_2}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Live Preview"
              >
                <img src={imageLinks.web_icon} alt="Live Preview" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectCard;
