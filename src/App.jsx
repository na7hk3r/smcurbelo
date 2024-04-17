import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero';

function App() {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Hero />
      </div>
    </>
  )
}

export default App
