import React from "react";
import './ProjectCard.css'
import weather_img from '../../assets/weather.png';
import code_icon from '../../assets/code.png';
import web_icon from '../../assets/web.png';

const ProjectCard = () => {
  return (
    <>
      <div className="card-project">
        <div className="img-container">
          <img src={weather_img} alt="" />
        </div>
        <div className="card-info">
          <h2>WeatherApp</h2>
          <div className="tags">
            <span>#React</span>
            <span>#CSS3</span>
            <span>#Firebase</span>
          </div>
          <p>Simple web application with a search input to know weather information of any city in the world.</p>
          <div className="buttons">
            <a href="https://github.com/na7hk3r/" target="_blank">
                <img src={code_icon} alt="Source Code" />
            </a>
            <a href="https://github.com/na7hk3r/" target="_blank">
                <img src={web_icon} alt="Live Preview" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
