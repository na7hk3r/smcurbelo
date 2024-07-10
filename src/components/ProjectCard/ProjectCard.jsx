import React from "react"
import Tilt from 'react-parallax-tilt'
import './ProjectCard.css'
import ProjectsData from './Projects.json';
import code_icon from '../../assets/code.png';
import web_icon from '../../assets/web.png';

const ProjectCard = () => {
  return (
    <>
      {ProjectsData.map(project => (
        <Tilt key={project.id}>
          <div className="card-project">
            <div className="img-container">
              <img src={project.img} alt="" />
            </div>
            <div className="card-info">
              <h2>{project.title}</h2>
              <div className="tags">
                <span>{project.tags.span_1}</span>
                <span>{project.tags.span_2}</span>
                <span>{project.tags.span_3}</span>
              </div>
              <p>{project.description}</p>
              <div className="buttons">
                <a href={project.href_source} target="_blank" rel="noopener noreferrer">
                  <img src={code_icon} alt="Source Code" />
                </a>
                <a href={project.href_source_2} target="_blank" rel="noopener noreferrer">
                  <img src={web_icon} alt="Live Preview" />
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
