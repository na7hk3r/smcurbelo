import React from "react";
import "./Skills.css";
import CourseCard from "../CourseCard/CourseCard.jsx";
import Tools from "../Tools/Tools.jsx";



const Skills = () => {
  return (
    <div className="container skills-container">
      <div className="left">
        <Tools />
      </div>
      <div className="right">
        <CourseCard />
      </div>
    </div>
  );
};

export default Skills;
