import "./Hero.css";
import home_img from "../../assets/home_img.webp";
import { motion } from "framer-motion";

const Hero = ({ language }) => {
  const content = {
    en: {
      title: "Howdy! 👋",
      subtitle1: "I'm Mathias.",
      subtitle2: "I make things for the web.",
      text1: "Uruguay based web developer.",
      text2: "Let me show you my work!",
      joke: "*yea, dog is oversized.",
    },
    es: {
      title: "Hola! 👋",
      subtitle1: "Soy Mathias.",
      subtitle2: "Hago 'cosas' para la web.",
      text1: "Me encuentro viviendo en Uruguay,",
      text2: "¡Déjame mostrarte mi trabajo!",
      joke: "*si, el perro está gigante."
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

  const leftAnimation = {
    variants: {
      initial: {
        opacity: 0,
        x: 0,
      },
      animate: {
        opacity: 1,
        x: 50,
      },
    },
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true },
  };

  return (
    <div className="container hero">

      <motion.div
        {...initialAnimation}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="left-container"
      >
        <h2>{content[language].title}</h2>
        <h1>
          <span>{content[language].subtitle1}</span>
        </h1>
        <h1>{content[language].subtitle2}</h1>
        <p>{content[language].text1}</p>
        <p>{content[language].text2}</p>
      </motion.div>

      <div className="right-container">
        <motion.img
          {...initialAnimation}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          src={home_img}
          alt="Home Image"
        />
        <motion.p
          {...leftAnimation}
          transition={{ delay: 3, type: "spring", stiffness: 100 }}
        >
          {content[language].joke}
        </motion.p>
      </div>

      <motion.div 
      {...initialAnimation}
      transition={{ delay: 0.7, type: "spring", stiffness: 100, ease: "easeInOut"}}
      className="mouse-wrap"
      >
        <div className="mouse">
          <div className="frame">
            <svg
              version="1.1"
              id="mouse"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 54.9 91"
              style={{ enableBackground: "new 0 0 54.9 91" }}
              xmlSpace="preserve"
            >
              <path
                id="XMLID_173_"
                className="st0"
                strokeLinecap="round"
                strokeMiterlimit={10}
                d="M27.4,3.6L27.4,3.6C14.2,3.6,3.5,14.3,3.5,27.5v36c0,13.2,10.7,23.9,23.9,23.9h0
	c13.2,0,23.9-10.7,23.9-23.9v-36C51.4,14.3,40.7,3.6,27.4,3.6z"
              />
            </svg>
          </div>
          <div className="mouse-left">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 27.4 91"
              style={{ enableBackground: "new 0 0 27.4 91" }}
              xmlSpace="preserve"
            >
              <path
                strokeLinecap="round"
                strokeMiterlimit={10}
                className="Draw-Frame Animate-Draw"
                d="M27.4,87.5L27.4,87.5c-13.2,0-23.9-10.7-23.9-23.9v-36c0-13.2,10.7-23.9,23.9-23.9h0"
              />
            </svg>
          </div>
          <div className="mouse-right">
            <svg
              version="1.1"
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 27.4 91"
              style={{ enableBackground: "new 0 0 27.4 91" }}
              xmlSpace="preserve"
            >
              <path
                strokeLinecap="round"
                strokeMiterlimit={10}
                className="Draw-Frame Animate-Draw"
                d="M0,3.6L0,3.6c13.2,0,23.9,10.7,23.9,23.9v36c0,13.2-10.7,23.9-23.9,23.9h0"
              />
            </svg>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Hero;
