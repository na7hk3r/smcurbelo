import React, { Suspense, lazy } from "react";
import "./Skills.css";

const CourseCard = lazy(() => import("../CourseCard/CourseCard.jsx"));
const Tools = lazy(() => import("../Tools/Tools.jsx"));



const Skills = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container skills-container">
        <div className="left">
          <Tools />
        </div>
        <div className="right">
          <CourseCard />
        </div>
      </div>
    </Suspense>
  );
};

export default Skills;
