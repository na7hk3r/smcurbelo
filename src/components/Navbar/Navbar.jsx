import React, { useEffect, useState} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';
import { Link } from 'react-scroll'
import menu_icon from '../../assets/menu.png'

const Navbar = () => {

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <div>
        <nav className='navbar'>
            <img src={logo} alt="logo" className="logo" />
            <ul className={mobileMenu?'':'hide-mobile-menu'}>
                <li><Link to='hero' smooth={true} offset={0} duration={700}>Home</Link></li>
                <li><Link to='about-container' smooth={true} offset={0} duration={700}>About</Link></li>
                <li><Link to='skills-container' smooth={true} offset={0} duration={700}>Skills</Link></li>
                <li><Link to='projects-container' smooth={true} offset={0} duration={700}>Projects</Link></li>
                <li><Link to='contact' smooth={true} offset={0} duration={700}>Contact</Link></li>
                <ToggleButton />
            </ul>
              <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu} />
        </nav>
    </div>
  )
}

export default Navbar