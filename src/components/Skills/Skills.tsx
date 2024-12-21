import React, { Suspense, lazy } from 'react';
import {
  LanguageProvider,
  useLanguage,
} from '../../context/LanguageContext.js';
import './Skills.css';

const CourseCard = lazy(() => import('../CourseCard/CourseCard.js'));
const Tools = lazy(() => import('../Tools/Tools.js'));

const Skills = () => {
  const { language } = useLanguage();
  return (
    <LanguageProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container skills-container">
          <div className="left">
            <Tools language={language} />
          </div>
          <div className="right">
            <CourseCard language={language} />
          </div>
        </div>
      </Suspense>
    </LanguageProvider>
  );
};

export default Skills;
