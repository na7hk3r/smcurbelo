import React, { Suspense, lazy } from 'react';

interface SkillsProps {
  language: 'en' | 'es';
}

const CourseCard = lazy(() => import('../CourseCard/CourseCard'));
const Tools = lazy(() => import('../Tools/Tools'));

const Skills: React.FC<SkillsProps> = ({ language }) => {
  return (
    <Suspense fallback={null}>
      <section className="skills" id="skills">
        <Tools language={language} />
        <CourseCard language={language} />
      </section>
    </Suspense>
  );
};

export default Skills;
