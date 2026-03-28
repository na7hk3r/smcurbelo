import React from 'react';
import { motion } from 'framer-motion';
import './Tools.css';
import { imageLinks } from '../../assets/imageLinks';
import { ease } from '../../constants/animation';

interface ToolsProps {
  language: 'en' | 'es';
}

const Tools: React.FC<ToolsProps> = ({ language }) => {
  const content = {
    en: {
      label: 'Skills',
      title: 'Languages & tools I use',
      ecosystem: 'JavaScript Ecosystem',
      primary: 'Primary Stack',
    },
    es: {
      label: 'Habilidades',
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
        { src: imageLinks.javascript_logo, alt: 'JavaScript' },
        { src: imageLinks.typescript_logo, alt: 'TypeScript' },
      ],
    },
    {
      name: 'Frontend',
      icons: [
        { src: imageLinks.react_logo, alt: 'React' },
        { src: imageLinks.nextjs_logo, alt: 'Next.js' },
        { src: imageLinks.tailwind_logo, alt: 'Tailwind CSS' },
        { src: imageLinks.css_logo, alt: 'CSS3' },
        { src: imageLinks.vite_logo, alt: 'Vite' },
        { src: imageLinks.astro_logo, alt: 'Astro' },
      ],
    },
    {
      name: 'Backend',
      icons: [
        { src: imageLinks.node_logo, alt: 'Node.js' },
        { src: imageLinks.express_logo, alt: 'Express' },
        { src: imageLinks.java_logo, alt: 'Java' },
        { src: imageLinks.spring_logo, alt: 'Spring Boot' },
        { src: imageLinks.postgresql_logo, alt: 'PostgreSQL' },
        { src: imageLinks.mongo_logo, alt: 'MongoDB' },
        { src: imageLinks.firebase_logo, alt: 'Firebase' },
      ],
    },
    {
      name: 'Desktop',
      icons: [
        { src: imageLinks.electron_logo, alt: 'Electron' },
      ],
    },
    {
      name: 'Testing',
      icons: [
        { src: imageLinks.jest_logo, alt: 'Jest' },
        { src: imageLinks.vitest_logo, alt: 'Vitest' },
        { src: imageLinks.playwright_logo, alt: 'Playwright' },
      ],
    },
    {
      name: 'DevOps & Cloud',
      icons: [
        { src: imageLinks.docker_logo, alt: 'Docker' },
        { src: imageLinks.aws_logo, alt: 'AWS' },
        { src: imageLinks.git_logo, alt: 'Git' },
        { src: imageLinks.github_actions_logo, alt: 'GitHub Actions' },
        { src: imageLinks.vercel_logo, alt: 'Vercel' },
        { src: imageLinks.bash_logo, alt: 'Bash' },
      ],
    },
    {
      name: 'Design',
      icons: [
        { src: imageLinks.figma_logo, alt: 'Figma' },
      ],
    },
  ];

  return (
    <div className="tools">
      <span className="section-label">{content[language].label}</span>
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
              <motion.div
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
                  loading="lazy"
                />
                <span className="tools__tooltip">{icon.alt}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tools;
