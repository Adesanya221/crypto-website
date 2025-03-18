import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      {/* The entire app background should be dark purple gradient */}
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
}

export default App; 