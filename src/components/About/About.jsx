// import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import { motion } from "framer-motion";

const About = () => {
  const initialAnimation = {
    variants: {
      initial: {
        opacity: 0,
        y: 50,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
    },
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true },
  };

  const floatAnimation = {
    animation: 'floatAnimation 3s ease infinite alternate',
    zIndex: -20,
    filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
  };

  return (
    <div className="container about-container">
      <motion.div 
        className="about-left"
        {...initialAnimation}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.img 
          src={about_img} 
          alt="AboutMe Image" 
          style={floatAnimation}
          />
      </motion.div>

      <motion.div 
        className="about-right"
        {...initialAnimation}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <h2>About Me</h2>
        <h1>Sergio Mathias Curbelo | &lsquo;94</h1>
        <p>I&lsquo;m deeply passionate about technology, learning and arts.</p> 
        <p>I excel in creative and collaborative environments, always prioritizing teamwork, communication, and problem-solving. </p><br />
        <p>I strongly believe that adaptability and a willingness to evolve are invaluable qualities that I can contribute to any organization or project I engage with.</p>
      </motion.div>
    </div>
  );
};

export default About;
