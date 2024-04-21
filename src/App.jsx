import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <div className="app-container">
        <About />
        <Skills />
        <Projects />
      </div>
    </>
  )
}

export default App
