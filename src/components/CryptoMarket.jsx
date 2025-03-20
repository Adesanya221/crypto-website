import React, { useState, useEffect } from 'react';
import '../styles/CryptoMarket.css';
// Import the bitcoin image to use as a fallback for news items
import bitcoinImage from '../assets/images/bitcoin.jpeg';

const CryptoMarket = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample crypto data (in a real app, you would fetch this from an API)
  const cryptoData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 48732.51,
      change: 2.45,
      chartColor: '#F7931A',
      chartData: [29, 40, 35, 50, 49, 60, 70, 91, 80, 85, 95, 110]
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3214.75,
      change: 4.12,
      chartColor: '#627EEA',
      chartData: [30, 40, 45, 60, 75, 65, 70, 85, 80, 95, 90, 100]
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      price: 425.88,
      change: -1.23,
      chartColor: '#F3BA2F',
      chartData: [40, 45, 42, 50, 40, 60, 55, 70, 65, 80, 75, 85]
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 1.21,
      change: 3.75,
      chartColor: '#0033AD',
      chartData: [20, 25, 30, 25, 35, 40, 50, 45, 60, 55, 65, 70]
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 125.62,
      change: 5.43,
      chartColor: '#00FFA3',
      chartData: [15, 25, 40, 30, 50, 35, 60, 45, 70, 65, 80, 95]
    },
  ];

  // Sample news data with reliable image source
  const sampleNews = [
    {
      id: 1,
      title: 'Bitcoin Surges Above $48,000 as Institutional Adoption Continues',
      source: 'CryptoNews',
      url: '#',
      date: '3 hours ago',
      image: bitcoinImage
    },
    {
      id: 2,
      title: 'Ethereum Layer 2 Solutions See Record Growth in Transaction Volume',
      source: 'BlockchainDaily',
      url: '#',
      date: '5 hours ago',
      image: bitcoinImage
    },
    {
      id: 3,
      title: 'Regulatory Clarity on the Horizon for Crypto Markets',
      source: 'CoinDesk',
      url: '#',
      date: '7 hours ago',
      image: bitcoinImage
    },
    {
      id: 4,
      title: 'New DeFi Protocol Launches with $50M in Total Value Locked',
      source: 'DeFi Pulse',
      url: '#',
      date: '10 hours ago',
      image: bitcoinImage
    },
    {
      id: 5,
      title: 'NFT Market Shows Signs of Recovery After Months of Declining Sales',
      source: 'NFT Insider',
      url: '#',
      date: '11 hours ago',
      image: bitcoinImage
    }
  ];

  // Simulate fetching news data from an API
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would fetch from a crypto news API
        // For example: const response = await fetch('https://api.cryptonews.com/news');
        // const data = await response.json();
        
        // Using sample data for demonstration
        setTimeout(() => {
          setNews(sampleNews);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle carousel navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === cryptoData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? cryptoData.length - 1 : prev - 1));
  };

  // Function to render the simple line chart
  const renderChart = (data, color) => {
    const max = Math.max(...data);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value / max) * 100);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="crypto-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <section id="crypto-market" className="crypto-market">
      <div className="container">
        <h2>Live Crypto Market</h2>
        
        {/* Crypto Charts Carousel */}
        <div className="crypto-carousel">
          <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
          
          <div className="carousel-container">
            {cryptoData.map((crypto, index) => (
              <div 
                key={crypto.id} 
                className={`crypto-card ${index === activeSlide ? 'active' : ''}`}
                style={{transform: `translateX(${(index - activeSlide) * 100}%)`}}
              >
                <div className="crypto-header">
                  <div className="crypto-title">
                    <h3>{crypto.name}</h3>
                    <span className="crypto-symbol">{crypto.symbol}</span>
                  </div>
                  <div className="crypto-price">
                    <div className="price-value">${crypto.price.toLocaleString()}</div>
                    <div className={`price-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                      {crypto.change >= 0 ? '▲' : '▼'} {Math.abs(crypto.change)}%
                    </div>
                  </div>
                </div>
                <div className="chart-container">
                  {renderChart(crypto.chartData, crypto.chartColor)}
                </div>
                <div className="time-frames">
                  <button className="time-btn active">24H</button>
                  <button className="time-btn">1W</button>
                  <button className="time-btn">1M</button>
                  <button className="time-btn">1Y</button>
                  <button className="time-btn">ALL</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next" onClick={nextSlide}>❯</button>
          
          <div className="carousel-indicators">
            {cryptoData.map((_, index) => (
              <button 
                key={index} 
                className={`indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Crypto News Section */}
        <div className="crypto-news">
          <h2>Latest Crypto News</h2>
          
          {isLoading ? (
            <div className="loading-spinner">Loading news...</div>
          ) : (
            <div className="news-container">
              {news.map(item => (
                <div key={item.id} className="news-card">
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-content">
                    <h3 className="news-title">{item.title}</h3>
                    <div className="news-meta">
                      <span className="news-source">{item.source}</span>
                      <span className="news-date">{item.date}</span>
                    </div>
                    <a href={item.url} className="news-link" target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="news-subscribe">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for daily crypto updates</p>
            <form className="subscribe-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoMarket; 