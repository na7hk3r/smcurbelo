import React, { Suspense, lazy } from 'react';
import './Projects.css';

interface ProjectsProps {
  language: 'en' | 'es';
}

const ProjectCard = lazy(() => import('../ProjectCard/ProjectCard'));

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container projects-container" id="projects">
        <ProjectCard language={language} />
      </div>
    </Suspense>
  );
};

export default Projects;
