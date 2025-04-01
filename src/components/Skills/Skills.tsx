import React, { Suspense, lazy } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Skills.css';

interface SkillsProps {
  language: 'en' | 'es';
}

const CourseCard = lazy(() => import('../CourseCard/CourseCard'));
const Tools = lazy(() => import('../Tools/Tools'));

const Skills: React.FC<SkillsProps> = ({ language }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container skills-container" id="skills">
        <div className="left">
          <Tools language={language} />
        </div>
        <div className="right">
          <CourseCard language={language} />
        </div>
      </div>
    </Suspense>
  );
};

export default Skills;
