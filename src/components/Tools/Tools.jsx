import React from "react";
import "./Tools.css";

import javascript_logo from "../../assets/icons_skills/javascript.png";
import react_logo from "../../assets/icons_skills/react.png";
import css_logo from "../../assets/icons_skills/css3.png";
import tailwind_logo from "../../assets/icons_skills/tailwind.png";
import bootstrap_logo from "../../assets/icons_skills/bootstrap.png";
import sass_logo from "../../assets/icons_skills/sass.png";
import vite_logo from "../../assets/icons_skills/vite.png";
import astro_logo from "../../assets/icons_skills/astro.png";
import java_logo from "../../assets/icons_skills/java.png";
import spring_logo from "../../assets/icons_skills/springboot.png";
import node_logo from "../../assets/icons_skills/node.png";
import mongo_logo from "../../assets/icons_skills/mongo.png";
import sql_logo from "../../assets/icons_skills/mysql.png";
import firebase_logo from "../../assets/icons_skills/firebase.png";
import express_logo from "../../assets/icons_skills/express.png";
import aws_logo from "../../assets/icons_skills/aws.png";
import bash_logo from "../../assets/icons_skills/bash.png";
import docker_logo from "../../assets/icons_skills/docker.png";
import figma_logo from "../../assets/icons_skills/figma.png";
import git_logo from "../../assets/icons_skills/git.png";
import jest_logo from "../../assets/icons_skills/jest.png";
import selenium_logo from "../../assets/icons_skills/selenium.png";
import python_logo from "../../assets/icons_skills/python.png";
import virtualbox_logo from "../../assets/icons_skills/virtualbox.png";

const Tools = () => {
  return (
    <>
      <div className="tools">
        <h2>Skills</h2>
        <h1>Languages and tools I use</h1>
        <h3>Frontend</h3>
        <div className="language-section">
          <img src={javascript_logo} alt="JavaScript" />
          <img src={react_logo} alt="React" />
          <img src={css_logo} alt="CSS" />
          <img src={tailwind_logo} alt="Tailwind" />
          <img src={bootstrap_logo} alt="Bootstrap" />
          <img src={sass_logo} alt="SASS" />
          <img src={vite_logo} alt="Vite" />
          <img src={astro_logo} alt="Astro" />
        </div>
        <h3>Backend</h3>
        <div className="language-section">
          <img src={java_logo} alt="Java" />
          <img src={spring_logo} alt="Springboot" />
          <img src={node_logo} alt="Node" />
          <img src={express_logo} alt="Express" />
          <img src={mongo_logo} alt="MongoDB" />
          <img src={sql_logo} alt="MySQL" />
          <img src={firebase_logo} alt="Firebase" />
        </div>
        <h3>DevOps</h3>
        <h5>& Other</h5>
        <div className="language-section">
          <img src={python_logo} alt="Python" />
          <img src={jest_logo} alt="JEST" />
          <img src={selenium_logo} alt="Selenium" />
          <img src={docker_logo} alt="Docker" />
          <img src={aws_logo} alt="AWS" />
          <img src={git_logo} alt="Git" />
          <img src={bash_logo} alt="Bash" />
          <img src={virtualbox_logo} alt="VirtualBox" />
          <img src={figma_logo} alt="Figma" />
        </div>
      </div>
    </>
  );
};

export default Tools;
