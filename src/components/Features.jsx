import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Our Features</h2>
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Secure Transactions</h3>
          <p>State-of-the-art encryption and blockchain technology to keep your assets safe.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Trading</h3>
          <p>Lightning-fast transactions with minimal fees and maximum efficiency.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Market Analytics</h3>
          <p>Advanced tools to track market trends and make informed investment decisions.</p>
        </div>
      </div>
    </section>
  );
};

export default Features; 