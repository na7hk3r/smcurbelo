// import React from "react";
import "./About.css";
import about_img from "../../assets/about.webp";
import { motion } from "framer-motion";

const About = ({ language }) => {
  const content = {
    en: {
      title: "About Me",
      text1:"I'm deeply passionate about technology, learning and arts.",
      text2:"I excel in creative and collaborative environments, always prioritizing teamwork, communication, and problem-solving. ",
      text3:"I strongly believe that adaptability and a willingness to evolve are invaluable qualities that I can contribute to any organization or project I engage with.",
    },
    es: {
      title: "Sobre Mí",
      text1: "Me apasiona profundamente la tecnología, el aprendizaje y las artes.",
      text2: "Destaco en entornos creativos y colaborativos, siempre priorizando el trabajo en equipo, la comunicación y la resolución de problemas.",
      text3: "Creo firmemente que la adaptabilidad y la disposición a evolucionar son cualidades invaluables que puedo aportar a cualquier organización o proyecto en el que participe.",
    },
  };
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
          loading="lazy"
          alt="AboutMe Image" 
          style={floatAnimation}
          />
      </motion.div>

      <motion.div 
        className="about-right"
        {...initialAnimation}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <h2>{content[language].title}</h2>
        <h1>Sergio Mathias Curbelo | &lsquo;94</h1>
        <p>{content[language].text1}</p> 
        <p>{content[language].text2}</p><br />
        <p>{content[language].text3}</p>
      </motion.div>
    </div>
  );
};

export default About;
