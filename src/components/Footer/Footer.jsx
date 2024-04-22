import React from 'react'
import './Footer.css';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <div className="footer">
        <p><span>&copy; {year} </span> 
        Made with <s>love</s> a keyboard by 
        <a href="http://github.com/na7hk3r/" target="_blank" rel="noopener noreferrer"> S. M. Curbelo</a>.
        </p>
        <ul>
            <li>
                <a href="http://github.com/na7hk3r/" 
                target="_blank" rel="noopener noreferrer">
                    Github
                </a>
            </li>
            <li>
                <a href="http://linkedin.com/in/smcurbelo" 
                target="_blank" rel="noopener noreferrer">
                        LinkedIn
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Footer