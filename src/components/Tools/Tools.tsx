import React from 'react';
import { m } from 'framer-motion';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';

interface ToolsProps {
  language: 'en' | 'es';
}

const Tools: React.FC<ToolsProps> = ({ language }) => {
  const content = {
    en: {
      title: 'Languages & tools I use',
      ecosystem: 'JavaScript Ecosystem',
      primary: 'Primary Stack',
    },
    es: {
      title: 'Lenguajes y herramientas que uso',
      ecosystem: 'Ecosistema JavaScript',
      primary: 'Stack Principal',
    },
  };

  const sections = [
    {
      name: content[language].primary,
      highlight: true,
      icons: [
        { src: imageLinks.javascript_logo, alt: 'JavaScript', w: 128, h: 128 },
        { src: imageLinks.typescript_logo, alt: 'TypeScript', w: 128, h: 128 },
      ],
    },
    {
      name: 'Frontend',
      icons: [
        { src: imageLinks.react_logo, alt: 'React', w: 128, h: 128 },
        { src: imageLinks.nextjs_logo, alt: 'Next.js', w: 128, h: 128 },
        { src: imageLinks.tailwind_logo, alt: 'Tailwind CSS', w: 128, h: 128 },
        { src: imageLinks.css_logo, alt: 'CSS3', w: 128, h: 128 },
        { src: imageLinks.vite_logo, alt: 'Vite', w: 128, h: 128 },
        { src: imageLinks.astro_logo, alt: 'Astro', w: 128, h: 128 },
      ],
    },
    {
      name: 'Backend',
      icons: [
        { src: imageLinks.node_logo, alt: 'Node.js', w: 128, h: 128 },
        { src: imageLinks.express_logo, alt: 'Express', w: 128, h: 128 },
        { src: imageLinks.java_logo, alt: 'Java', w: 128, h: 128 },
        { src: imageLinks.spring_logo, alt: 'Spring Boot', w: 128, h: 128 },
        { src: imageLinks.postgresql_logo, alt: 'PostgreSQL', w: 128, h: 128 },
        { src: imageLinks.mongo_logo, alt: 'MongoDB', w: 128, h: 128 },
        { src: imageLinks.firebase_logo, alt: 'Firebase', w: 128, h: 128 },
      ],
    },
    {
      name: 'Desktop',
      icons: [
        { src: imageLinks.electron_logo, alt: 'Electron', w: 128, h: 128 },
      ],
    },
    {
      name: 'Testing',
      icons: [
        { src: imageLinks.jest_logo, alt: 'Jest', w: 128, h: 128 },
        { src: imageLinks.vitest_logo, alt: 'Vitest', w: 128, h: 128 },
        { src: imageLinks.playwright_logo, alt: 'Playwright', w: 128, h: 128 },
      ],
    },
    {
      name: 'DevOps & Cloud',
      icons: [
        { src: imageLinks.docker_logo, alt: 'Docker', w: 128, h: 128 },
        { src: imageLinks.aws_logo, alt: 'AWS', w: 128, h: 128 },
        { src: imageLinks.git_logo, alt: 'Git', w: 128, h: 128 },
        { src: imageLinks.github_actions_logo, alt: 'GitHub Actions', w: 128, h: 128 },
        { src: imageLinks.vercel_logo, alt: 'Vercel', w: 128, h: 128 },
        { src: imageLinks.bash_logo, alt: 'Bash', w: 128, h: 128 },
      ],
    },
    {
      name: 'Design',
      icons: [
        { src: imageLinks.figma_logo, alt: 'Figma', w: 128, h: 128 },
      ],
    },
  ];

  return (
    <div className="tools">
      <h2 className="tools__title">{content[language].title}</h2>
      <p className="tools__ecosystem">{content[language].ecosystem}</p>

      {sections.map((section) => (
        <div
          key={section.name}
          className={`tools__group${section.highlight ? ' tools__group--primary' : ''}`}
        >
          <h3 className="tools__group-name">
            {section.name}
            {section.highlight && <span className="tools__badge">core</span>}
          </h3>
          <div className="tools__icons">
            {section.icons.map((icon, i) => (
              <m.div
                key={icon.alt}
                className="tools__icon-wrapper"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  title={icon.alt}
                  width={icon.w}
                  height={icon.h}
                  loading="lazy"
                />
                <span className="tools__tooltip">{icon.alt}</span>
              </m.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tools;
