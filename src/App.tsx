import React, { ReactElement } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = (): ReactElement => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className={`App ${theme}`}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
      <Navbar language={language} />
      <Hero language={language} />
      <About language={language} />
      <Skills language={language} />
      <Projects language={language} />
      <Contact language={language} />
      <Footer />
    </div>
  );
};

export default App;
