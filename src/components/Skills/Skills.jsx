import React from "react";
import "./Skills.css";
import CourseCard from "../CourseCard/CourseCard.jsx";
import Tools from "../Tools/Tools.jsx";



const Skills = () => {
  return (
    <div className="container skills-container">
      <div className="left">
        <h2>Skills</h2>
        <h1>Languages and tools I use</h1>
        <Tools />
      </div>
      <div className="right">
        <h2>Where I learned?</h2>
        <h1>Courses & Certificates</h1>
        <CourseCard />
      </div>
    </div>
  );
};

export default Skills;
