import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechNews from './components/TechNews';
import Footer from './components/Footer';
import TouchHandler from './components/TouchHandler';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial page load
  useEffect(() => {
    // Simulate resources loading and hide loading state when complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle document loading status
  useEffect(() => {
    // Add passive event listeners to improve performance
    const passiveEventOptions = { passive: true };
    
    // Add initial class to prevent content shift
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Remove loading class from body when ready
    if (!isLoading) {
      document.body.classList.remove('loading');
    }
    
    // Add passive event listeners to common events to improve performance
    const addPassiveEvents = () => {
      window.addEventListener('scroll', () => {}, passiveEventOptions);
      window.addEventListener('touchstart', () => {}, passiveEventOptions);
      window.addEventListener('touchmove', () => {}, passiveEventOptions);
    };
    
    addPassiveEvents();
  }, [isLoading]);

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      {/* TouchHandler manages pinch-to-zoom behavior */}
      <TouchHandler />
      
      <Navbar />
      <main className="main-content">
        <Hero />
        <Features />
        <TechNews />
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}

export default App; 