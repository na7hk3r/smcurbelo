import React from 'react';
import { m } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';
import { projectLabels } from '../../constants/projectLabels';
import { useTheme } from '../../context/ThemeContext';
import ProjectsData from '../ProjectCard/Projects.json';
import type { Project } from '../../types/project';

interface HeroProps {
  language: 'en' | 'es';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const { theme } = useTheme();

  // The featured project, read from the same file the Projects section reads.
  // A second copy of these strings could drift and start telling a lie, which
  // PRODUCT.md's first principle ("Show, never claim.") does not allow. The
  // cost is that the data moves into the entry chunk — it already ships inside
  // the lazy ProjectCard chunk, around 2 kB gzip — which is the price of one
  // source of truth. Every value shown below is already in that file: no new
  // copy is authored here.
  const project = (ProjectsData as Project[]).find((item) => item.badge);
  const work =
    project && project.live && (project.img_alt || project.img)
      ? {
          title: project.title[language],
          meta: project.tags.join(' · '),
          image: theme === 'light' && project.img_alt ? project.img_alt : project.img,
          href: project.live,
        }
      : null;

  const content = {
    en: {
      greeting: 'Fullstack Developer · Available',
      name: "I'm Sergio.",
      role: 'I build complete web and desktop products — from design to deployment. For teams or independently.',
      cta: 'See my work',
    },
    es: {
      greeting: 'Desarrollador Fullstack · Disponible',
      name: 'Soy Sergio.',
      role: 'Construyo productos web y de escritorio completos — desde el diseño hasta el deploy. Para equipos o de forma independiente.',
      cta: 'Ver mis proyectos',
    },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-image" aria-hidden="true">
        <img src={imageLinks.home_img} alt="" fetchPriority="high" decoding="async" />
      </div>

      <div className="hero__content">
        <m.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {content[language].greeting}
        </m.p>
        <m.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {content[language].name}
        </m.h1>
        <m.p
          className="hero__role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          {content[language].role}
        </m.p>
        <m.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
        >
          <a href="#projects" className="btn btn--primary hero__btn">
            {content[language].cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn--ghost hero__btn">
            {language === 'en' ? 'Contact' : 'Contacto'}
          </a>
        </m.div>
        {/* The work, in the first viewport, with the person still accompanying
            it. One link rather than a link-wrapped card: the text stays
            selectable and the target stays explicit. */}
        {work && (
          <m.figure
            className="hero__work"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            {/* Intrinsic size declared so the box is reserved before the file
                arrives; CSS renders it at the size below. The image is
                decorative here — the caption already names the project. */}
            <img className="hero__work-thumb" src={work.image} alt="" width={1400} height={1112} decoding="async" />
            <figcaption className="hero__work-body">
              <h2 className="hero__work-name">{work.title}</h2>
              <p className="hero__work-meta">{work.meta}</p>
              <a className="hero__work-link" href={work.href} target="_blank" rel="noopener noreferrer">
                {projectLabels[language].live}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </figcaption>
          </m.figure>
        )}
      </div>
    </section>
  );
};

export default Hero;
