import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import ToggleButton from "../ToggleButton/ToggleButton.jsx";
import { Link } from "react-scroll";
import menu_icon from "../../assets/menu.png";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  const { scrollY } = useViewportScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(41, 41, 41, 0)", "rgba(41, 41, 41, 0.2)"]
  );
  const height = useTransform(scrollY, [0, 100], [120, 80]);

  return (
    <>
      <motion.nav
        className="navbar"
        style={{
          background,
          height,
        }}
      >
        <motion.img
          src={logo}
          alt="logo"
          className="logo"
          drag
          dragDirectionLock
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragElastic={0.5}
          whileTap={{ cursor: "grabbing" }}
        />
        <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
          <motion.li whileHover={{ scale: 1.1, transition: 0.5 }}>
            <Link to="hero" smooth={true} offset={0} duration={900}>
              Home
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1, transition: 0.5 }}>
            <Link to="about-container" smooth={true} offset={0} duration={700}>
              About
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1, transition: 0.5 }}>
            <Link to="skills-container" smooth={true} offset={0} duration={700}>
              Skills
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1, transition: 0.5 }}>
            <Link
              to="projects-container"
              smooth={true}
              offset={0}
              duration={700}
            >
              Projects
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1, transition: 0.5 }}>
            <Link to="contact" smooth={true} offset={0} duration={700}>
              Contact
            </Link>
          </motion.li>
          <ToggleButton />
        </ul>
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={toggleMenu}
        />
      </motion.nav>
    </>
  );
};

export default Navbar;
