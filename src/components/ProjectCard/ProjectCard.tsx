import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectsData from './Projects.json';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  language: 'en' | 'es';
}

const labels = {
  en: { heading: 'Projects', source: 'Code', live: 'Live', more: 'Read more', less: 'Show less' },
  es: { heading: 'Proyectos', source: 'Código', live: 'Demo', more: 'Leer más', less: 'Mostrar menos' },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ language }) => {
  const l = labels[language];
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <>
      <h2 className="projects__heading">{l.heading}</h2>
      <div className="projects__grid">
        {(ProjectsData as Project[]).map((project, i) => {
          const isExpanded = expandedId === project.id;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="project">
                <div className="project__thumb">
                  <img src={project.img} alt={project.title[language]} loading="lazy" />
                </div>
                <div className="project__body">
                  <h3 className="project__title">{project.title[language]}</h3>
                  <div className="project__tags">
                    {[project.tags.span_1, project.tags.span_2, project.tags.span_3].map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p className={`project__desc${isExpanded ? ' project__desc--expanded' : ''}`}>
                    {project.description[language]}
                  </p>
                  <button
                    type="button"
                    className="project__expand-btn"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? l.less : l.more}
                  </button>
                  <div className="project__links">
                    <a href={project.href_source} target="_blank" rel="noopener noreferrer" className="btn btn--ghost project__link">
                      {l.source}
                    </a>
                    <a href={project.href_source_2} target="_blank" rel="noopener noreferrer" className="btn btn--primary project__link">
                      {l.live}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectCard;
