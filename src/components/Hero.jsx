import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Crypto Revolution</h1>
          <h2>SECURE YOUR DIGITAL FUTURE</h2>
          <p>
            Discover the next generation of cryptocurrency trading platform. 
            Advanced security, real-time analytics, and lightning-fast 
            transactions all in one sleek interface.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image floating">
            {/* Bitcoin image is added via CSS */}
            <div className="price-tag">
              <span className="currency">BTC</span>
              <span className="value">$48,375</span>
              <span className="trend up">+5.8%</span>
            </div>
          </div>
          <div className="glow-effect"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 