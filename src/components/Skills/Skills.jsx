import React, { Suspense, lazy } from 'react';
import {
  LanguageProvider,
  useLanguage,
} from '../../context/LanguageContext.jsx';
import './Skills.css';

const CourseCard = lazy(() => import('../CourseCard/CourseCard.jsx'));
const Tools = lazy(() => import('../Tools/Tools.jsx'));

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
