import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Change active link when clicking on a nav item
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveLink(id);
    // Close mobile menu when a link is clicked
    setMobileMenuOpen(false);
    // Smooth scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <svg className="logo-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#b67cff" strokeWidth="2"/>
            <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#b67cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>IG.folio</span>
        </a>
        
        <div className={`menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" 
               className={activeLink === 'home' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'home')}>
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" 
               className={activeLink === 'about' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'about')}>
              ABOUT
            </a>
          </li>
          <li className="nav-item">
            <a href="#pricing" 
               className={activeLink === 'pricing' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'pricing')}>
              PRICING
            </a>
          </li>
          <li className="nav-item">
            <a href="#features" 
               className={activeLink === 'features' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'features')}>
              FEATURES
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" 
               className={activeLink === 'contact' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'contact')}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 