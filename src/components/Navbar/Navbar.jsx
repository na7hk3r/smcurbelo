import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';
import ToggleButton from '../ToggleButton/ToggleButton.jsx';

const Navbar = () => {
  return (
    <div>
        <nav className='navbar'>
            <img src={logo} alt="logo" />
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Skills</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
            <ToggleButton />
        </nav>
    </div>
  )
}

export default Navbar