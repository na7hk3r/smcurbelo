import React, { Suspense, lazy } from 'react';
import './Projects.css';

const ProjectCard = lazy(() => import('../ProjectCard/ProjectCard'));

const Projects = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container projects-container'>
        <ProjectCard />
      </div>
    </Suspense>
  );
};

export default Projects;