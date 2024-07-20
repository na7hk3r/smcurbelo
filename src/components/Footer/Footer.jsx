import React from "react";
import "./Footer.css";
import logo_sword from "../../assets/logo_sword.png"

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer">
      <ul>
        <li>
            <span>
          {year} Made with <s>love</s> a keyboard by
          <a
            href="http://github.com/na7hk3r/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "} S. M. Curbelo
          </a>
          .
          </span>
        </li>
        <li>
          <a
            href="http://github.com/na7hk3r/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="http://linkedin.com/in/smcurbelo"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      <img src={logo_sword} alt="Sword Nathker Logo" />
    </div>
  );
};

export default Footer;
