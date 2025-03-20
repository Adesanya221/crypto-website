import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

// Currency data for the selector
const currencies = [
  { code: 'USD', symbol: '$', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', country: 'Japan', flag: '🇯🇵' },
  { code: 'NGN', symbol: '₦', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'AUD', symbol: 'A$', country: 'Australia', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', country: 'Canada', flag: '🇨🇦' },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const navbarRef = useRef(null);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled past threshold
      const isScrolled = currentScrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Hide navbar on scroll down, show on scroll up
      // More aggressive hiding on mobile
      const isMobile = window.innerWidth <= 768;
      const scrollThreshold = isMobile ? 40 : 80;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      if (currentScrollY > lastScrollY && !hidden && currentScrollY > scrollThreshold) {
        // Only hide if we've scrolled enough to trigger the effect
        if (scrollDelta > 10) {
          setHidden(true);
          setMobileMenuOpen(false); // Close mobile menu when hiding navbar
        }
      } else if (currentScrollY < lastScrollY && hidden) {
        setHidden(false);
      }
      
      // Never hide navbar at top of page
      if (currentScrollY < 20) {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, hidden, lastScrollY]);

  // Handle touch events for swipe to hide/show navbar
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -50;
    const isSwipeUp = distance > 50;
    
    if (isSwipeDown && hidden) {
      setHidden(false);
    } else if (isSwipeUp && !hidden) {
      setHidden(true);
      setMobileMenuOpen(false);
    }
  };

  // Change active link when clicking on a nav item
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveLink(id);
    // Close mobile menu when a link is clicked
    setMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    // Smooth scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    // Toggle body class to prevent scrolling when menu is open
    if (newMenuState) {
      document.body.classList.add('menu-open');
      setHidden(false); // Show navbar when opening menu
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Toggle currency dropdown
  const toggleCurrency = (e) => {
    e.stopPropagation();
    setCurrencyOpen(!currencyOpen);
  };

  // Select a currency
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setCurrencyOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyOpen && !event.target.closest('.currency-selector')) {
        setCurrencyOpen(false);
      }

      if (mobileMenuOpen && 
          !event.target.closest('.mobile-nav-dropdown') && 
          !event.target.closest('.menu-icon')) {
        setMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen, currencyOpen]);

  // Handle escape key to close the menu
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          document.body.classList.remove('menu-open');
        }
        if (currencyOpen) {
          setCurrencyOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileMenuOpen, currencyOpen]);

  useEffect(() => {
    // Set CSS variable for navbar height
    if (navbarRef.current) {
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${navbarRef.current.offsetHeight}px`
      );
    }
  }, []);

  return (
    <nav 
      ref={navbarRef}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <svg className="logo-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#b67cff" strokeWidth="2"/>
            <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#b67cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>IG.folio</span>
        </a>
        
        {/* Currency Selector */}
        <div className={`currency-selector ${currencyOpen ? 'open' : ''}`}>
          <button className="currency-selector-button" onClick={toggleCurrency}>
            <span className="flag">{selectedCurrency.flag}</span>
            <span>{selectedCurrency.symbol} {selectedCurrency.code}</span>
            <svg className="arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="currency-dropdown">
            {currencies.map((currency) => (
              <div 
                key={currency.code} 
                className={`currency-option ${selectedCurrency.code === currency.code ? 'selected' : ''}`}
                onClick={() => handleCurrencySelect(currency)}
              >
                <span className="flag">{currency.flag}</span>
                <span className="currency-code">{currency.symbol} {currency.code}</span>
                <span className="country-name">{currency.country}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>

        {/* Mobile Navigation Dropdown */}
        <div className={`mobile-nav-dropdown ${mobileMenuOpen ? 'active' : ''}`}>
          <div 
            className={`mobile-dropdown-item ${activeLink === 'home' ? 'active' : ''}`} 
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>HOME</span>
          </div>
          <div 
            className={`mobile-dropdown-item ${activeLink === 'about' ? 'active' : ''}`} 
            onClick={(e) => handleNavClick(e, 'about')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>ABOUT</span>
          </div>
          <div 
            className={`mobile-dropdown-item ${activeLink === 'pricing' ? 'active' : ''}`} 
            onClick={(e) => handleNavClick(e, 'pricing')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>PRICING</span>
          </div>
          <div 
            className={`mobile-dropdown-item ${activeLink === 'features' ? 'active' : ''}`} 
            onClick={(e) => handleNavClick(e, 'features')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>FEATURES</span>
          </div>
          <div 
            className={`mobile-dropdown-item ${activeLink === 'contact' ? 'active' : ''}`} 
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>CONTACT</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" 
               className={activeLink === 'home' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'home')}>
              <span>
                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                HOME
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" 
               className={activeLink === 'about' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'about')}>
              <span>
                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ABOUT
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#pricing" 
               className={activeLink === 'pricing' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'pricing')}>
              <span>
                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                PRICING
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#features" 
               className={activeLink === 'features' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'features')}>
              <span>
                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                FEATURES
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" 
               className={activeLink === 'contact' ? 'nav-link active' : 'nav-link'}
               onClick={(e) => handleNavClick(e, 'contact')}>
              <span>
                <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                CONTACT
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 