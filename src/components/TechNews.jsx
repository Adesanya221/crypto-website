import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/TechNews.css';

// Sample tech news data for fallback
const fallbackNewsData = [
  {
    id: 1,
    title: "Artificial Intelligence Breakthroughs Reshape Healthcare Industry",
    summary: "New AI algorithms are now capable of diagnosing diseases with higher accuracy than human doctors.",
    category: "AI",
    imageUrl: "https://source.unsplash.com/random/600x400?ai",
    sourceUrl: "https://techcrunch.com",
    source: "TechCrunch",
    date: "2023-06-15"
  },
  {
    id: 2,
    title: "Quantum Computing Hits Major Milestone with Error Correction",
    summary: "Scientists have achieved a breakthrough in quantum error correction, bringing stable quantum computers closer to reality.",
    category: "Quantum Computing",
    imageUrl: "https://source.unsplash.com/random/600x400?quantum",
    sourceUrl: "https://wired.com",
    source: "Wired",
    date: "2023-06-10"
  },
  {
    id: 3,
    title: "Blockchain Technology Revolutionizes Supply Chain Management",
    summary: "Major retailers have implemented blockchain solutions that bring unprecedented transparency to global supply chains.",
    category: "Blockchain",
    imageUrl: "https://source.unsplash.com/random/600x400?blockchain",
    sourceUrl: "https://cointelegraph.com",
    source: "CoinTelegraph",
    date: "2023-06-05"
  },
  {
    id: 4,
    title: "New Battery Technology Promises 1,000-Mile Electric Vehicle Range",
    summary: "Researchers have developed a solid-state battery that could dramatically increase the range of electric vehicles.",
    category: "Electric Vehicles",
    imageUrl: "https://source.unsplash.com/random/600x400?battery",
    sourceUrl: "https://electrek.co",
    source: "Electrek",
    date: "2023-05-28"
  },
  {
    id: 5,
    title: "Augmented Reality Smart Glasses Enter Mass Production",
    summary: "After years of development, consumer-grade AR glasses are finally entering mass production with promising applications.",
    category: "AR/VR",
    imageUrl: "https://source.unsplash.com/random/600x400?augmented+reality",
    sourceUrl: "https://theverge.com",
    source: "The Verge",
    date: "2023-05-20"
  },
  {
    id: 6,
    title: "Cybersecurity Firms Report Record Increase in Ransomware Attacks",
    summary: "Global organizations face unprecedented levels of ransomware threats as attack sophistication increases.",
    category: "Cybersecurity",
    imageUrl: "https://source.unsplash.com/random/600x400?cybersecurity",
    sourceUrl: "https://darkreading.com",
    source: "Dark Reading",
    date: "2023-05-15"
  }
];

// Mock API fetching function - in a real app, this would be an actual API call
const fetchTechNews = async () => {
  try {
    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be a fetch call to a news API
    // For example: const response = await fetch('https://api.example.com/tech-news');
    
    // Simulate successful response
    return fallbackNewsData;
  } catch (error) {
    console.error('Error fetching tech news:', error);
    return fallbackNewsData; // Return fallback data on error
  }
};

const TechNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);

  // Fetch news data on component mount
  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchTechNews();
      setNewsData(data);
      setLoading(false);
    };
    
    getNews();
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isTransitioning || newsData.length === 0) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, newsData.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || newsData.length === 0) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, newsData.length]);

  // Handle auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && newsData.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % newsData.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, newsData.length]);

  // Reset interval when active index changes
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying && newsData.length > 0) {
        autoPlayRef.current = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        }, 5000);
      }
    }
  }, [activeIndex, isAutoPlaying, newsData.length]);

  // Pause auto-play on hover or touch
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Touch handling for swipe gestures
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (!isTransitioning && newsData.length > 0) {
      if (isLeftSwipe) {
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400);
      } else if (isRightSwipe) {
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => 
          prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
        );
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400);
      }
    }

    setIsAutoPlaying(true);
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, isTransitioning, newsData.length]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || newsData.length === 0) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, newsData.length]);

  // External link handler with proper attribution
  const handleNewsClick = useCallback((url) => {
    // Open in new tab with security attributes
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Render loading skeleton while fetching data
  if (loading) {
    return (
      <section id="technews" className="tech-news-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Latest Tech News</h2>
            <p>Stay updated with the latest trends and breakthroughs in technology</p>
          </div>
          <div className="news-carousel">
            <div className="carousel-container">
              <div className="carousel-slide">
                <div className="news-card loading-skeleton">
                  <div className="news-image skeleton"></div>
                  <div className="news-content">
                    <h3 className="skeleton">Loading...</h3>
                    <p className="skeleton"></p>
                    <p className="skeleton"></p>
                    <div className="news-meta">
                      <span className="skeleton"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="technews" className="tech-news-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Latest Tech News</h2>
          <p>Stay updated with the latest trends and breakthroughs in technology</p>
        </div>

        <div 
          ref={carouselRef}
          className="news-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-container">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {newsData.map((news) => (
                <div 
                  key={news.id} 
                  className="carousel-slide"
                  onClick={() => handleNewsClick(news.sourceUrl)}
                >
                  <div className="news-card">
                    <div className="news-image">
                      <img src={news.imageUrl} alt={news.title} loading="lazy" />
                      <div className="news-category">{news.category}</div>
                    </div>
                    <div className="news-content">
                      <h3>{news.title}</h3>
                      <p>{news.summary}</p>
                      <div className="news-meta">
                        <span className="news-source">{news.source}</span>
                        <span className="news-date">{news.date}</span>
                      </div>
                      <button className="read-more-btn">
                        Read Full Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {newsData.length > 1 && (
            <>
              <button 
                className="carousel-control prev" 
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="carousel-control next" 
                onClick={handleNext}
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="carousel-indicators">
                {newsData.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="view-all-container">
          <a href="https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="view-all-btn">
            View All Tech News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechNews; 