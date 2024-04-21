import React from "react";
import "./Skills.css";

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
import ubuntu_logo from "../../assets/icons_skills/ubuntu.png";

import utu_logo from "../../assets/utu-logo.png";
import ctd_logo from "../../assets/ctd-logo.png";
import jap_logo from "../../assets/jap-logo.png";
import one_logo from "../../assets/one-logo.png";
import voxy_logo from "../../assets/voxy-logo.png";
import fcc_logo from "../../assets/fcc-logo.png";
import ibm_logo from "../../assets/ibm-logo.png";

const Skills = () => {
  return (
    <div className="container skills-container">
      <div className="left">
        <h1>Languages and Tools I use</h1>
        <br />
        <h2>Front</h2>
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
        <h2>Back</h2>
        <div className="language-section">
          <img src={java_logo} alt="Java" />
          <img src={spring_logo} alt="Springboot" />
          <img src={node_logo} alt="Node" />
          <img src={express_logo} alt="Express" />
          <img src={mongo_logo} alt="MongoDB" />
          <img src={sql_logo} alt="MySQL" />
          <img src={firebase_logo} alt="Firebase" />
        </div>
        <h2>DevOps & Other tools</h2>
        <div className="language-section">
          <img src={docker_logo} alt="Docker" />
          <img src={aws_logo} alt="AWS" />
          <img src={python_logo} alt="Python" />
          <img src={jest_logo} alt="JEST" />
          <img src={selenium_logo} alt="Selenium" />
          <img src={git_logo} alt="Git" />
          <img src={bash_logo} alt="Bash" />
          <img src={figma_logo} alt="Figma" />
          <img src={ubuntu_logo} alt="Ubuntu" />
        </div>
      </div>
      <div className="right">
        <h2>Where I learned?</h2>
        <h1>Courses & Certificates</h1>
        <div className="course-card">
            <div className="course-img">
                <img src={utu_logo} alt="UTU" />
            </div>
            <div className="course-description">
                <h2>Bachelor's degree in IT</h2>
                <span>UTU, Uruguay. 2023 - Ongoing</span>
                <p>Technical Degree in Computer Science from the University of Work of Uruguay.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={ctd_logo} alt="Certified Tech Developer" />
            </div>
            <div className="course-description">
                <h2>Certified Tech Developer</h2>
                <span>DigitalHouse, Argentina. 2023 - Ongoing</span>
                <p>En desarrollo.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={jap_logo} alt="Jovenes A Programar" />
            </div>
            <div className="course-description">
                <h2>Fullstack Web Development</h2>
                <span>Jóvenes a Programar, Uruguay. 2022 - 2023</span>
                <p>En desarrollo.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={one_logo} alt="Jovenes A Programar" />
            </div>
            <div className="course-description">
                <h2>Backend Specialization</h2>
                <span>Oracle Next Education | Alura, LATAM. 2022 - 2023</span>
                <p>En desarrollo.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={voxy_logo} alt="Jovenes A Programar" />
            </div>
            <div className="course-description">
                <h2>English B2</h2>
                <span>VOXY. 2022 - 2023</span>
                <p>En desarrollo.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={fcc_logo} alt="Jovenes A Programar" />
            </div>
            <div className="course-description">
                <h2>Javascript Certification</h2>
                <span>FreeCodeCamp. 2022</span>
                <p>En desarrollo.</p>
            </div>
        </div>
        <div className="course-card">
            <div className="course-img">
                <img src={ibm_logo} alt="Jovenes A Programar" />
            </div>
            <div className="course-description">
                <h2>Fullstack Web Development</h2>
                <span>IBM Skills Network. 2022 - 2023</span>
                <p>En desarrollo.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
