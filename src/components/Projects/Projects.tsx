import React, { Suspense, lazy } from 'react';

interface ProjectsProps {
  language: 'en' | 'es';
}

const ProjectCard = lazy(() => import('../ProjectCard/ProjectCard'));

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  return (
    <section className="projects container" id="projects">
      <Suspense fallback={<div />}>
        <ProjectCard language={language} />
      </Suspense>
    </section>
  );
};

export default Projects;
