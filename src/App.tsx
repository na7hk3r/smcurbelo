import { ReactElement, useEffect } from 'react';
import { MotionConfig, LazyMotion, domAnimation, m, useScroll, useSpring } from 'framer-motion';
import { dismissBootLoader } from './boot';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = (): ReactElement => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // The boot loader in index.html has done its job once this tree is on screen.
  useEffect(() => {
    dismissBootLoader();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className={`App ${theme}`}>
          <m.div
            className="scroll-progress"
            style={{ scaleX }}
          />
          <Navbar language={language} />
          <main id="main">
            <Hero language={language} />
            <About language={language} />
            <Experience language={language} />
            <Skills language={language} />
            <Projects language={language} />
            <Contact language={language} />
          </main>
          <Footer />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
};

export default App;