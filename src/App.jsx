import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero';
import About from './components/About/About';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <div className="app-container">
        <About />
      </div>
    </>
  )
}

export default App
