// import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";

const About = () => {
  return (
    <div className="container about-container">
      <div className="right-container about-left">
        <img src={about_img} alt="AboutMe Image" />
      </div>
      <div className="left-container about-right ">
        <h2>About Me</h2>
        <h1>Sergio Mathias Curbelo | &lsquo;94</h1>
        <p>I&lsquo;m deeply passionate about technology, learning and arts.</p> 
        <p>I excel in creative and collaborative environments, always prioritizing teamwork, communication, and problem-solving. </p><br />
        <p>I strongly believe that adaptability and a willingness to evolve are invaluable qualities that I can contribute to any organization or project I engage with.</p>
      </div>
    </div>
  );
};

export default About;
