import React from 'react'
import './Hero.css';
import home_img from '../../assets/home_img.png'

const Hero = () => {
  return (
    <div className="container">
        <div className="left-container">
            <h2>Howdy! 👋</h2>
            <h1><span>I'm Sergio.</span><br/> I make things for the web.</h1>
            <p>Uruguay-based web developer. Let me show you my work!</p>
        </div>
        <div className="right-container">
            <img src={home_img} alt="Home Image" />
            <p>*yea, dog is oversized.</p>
        </div>
    </div>
  )
}

export default Hero