const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Building the project...');

// Create build directory if it doesn't exist
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// Copy public directory to build
console.log('Copying public files...');
const publicFiles = fs.readdirSync('public');
publicFiles.forEach(file => {
  fs.copyFileSync(path.join('public', file), path.join('build', file));
});

// Create index.html in build directory
console.log('Creating index.html...');
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Crypto landing page" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>Crypto App</title>
  <link href="styles.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const app = document.createElement('div');
      app.className = 'App';
      
      // Navbar
      const navbar = document.createElement('nav');
      navbar.className = 'navbar';
      navbar.innerHTML = \`
        <div class="logo">CryptoApp</div>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#market">Market</a>
          <a href="#news">News</a>
        </div>
        <div class="auth-buttons">
          <button class="login-btn">Login</button>
          <button class="signup-btn">Sign Up</button>
        </div>
      \`;
      
      // Hero section
      const hero = document.createElement('section');
      hero.className = 'hero';
      hero.innerHTML = \`
        <div class="hero-content">
          <h1>Discover the World of Cryptocurrency</h1>
          <p>Track, trade, and manage your crypto portfolio all in one place</p>
          <button class="cta-button">Get Started</button>
        </div>
        <div class="hero-image">
          <img src="crypto-hero.png" alt="Cryptocurrency illustration" />
        </div>
      \`;
      
      // Features section
      const features = document.createElement('section');
      features.id = 'features';
      features.className = 'features';
      features.innerHTML = \`
        <h2>Key Features</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Real-time Tracking</h3>
            <p>Track cryptocurrency prices in real-time with accurate data</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Secure Wallet</h3>
            <p>Keep your assets safe with our state-of-the-art security</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3>Portfolio Management</h3>
            <p>Manage and analyze your portfolio performance</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>Easy Exchange</h3>
            <p>Seamlessly exchange cryptocurrencies with low fees</p>
          </div>
        </div>
      \`;
      
      // Market section
      const market = document.createElement('section');
      market.id = 'market';
      market.className = 'crypto-market';
      market.innerHTML = \`
        <h2>Cryptocurrency Market</h2>
        <div class="market-table">
          <div class="market-row header">
            <div class="market-cell">Name</div>
            <div class="market-cell">Price</div>
            <div class="market-cell">24h Change</div>
            <div class="market-cell">Market Cap</div>
          </div>
          <div class="market-row">
            <div class="market-cell">Bitcoin (BTC)</div>
            <div class="market-cell">$45,632.21</div>
            <div class="market-cell positive">+2.5%</div>
            <div class="market-cell">$865.7B</div>
          </div>
          <div class="market-row">
            <div class="market-cell">Ethereum (ETH)</div>
            <div class="market-cell">$3,256.89</div>
            <div class="market-cell positive">+1.8%</div>
            <div class="market-cell">$394.2B</div>
          </div>
          <div class="market-row">
            <div class="market-cell">Solana (SOL)</div>
            <div class="market-cell">$112.45</div>
            <div class="market-cell negative">-0.6%</div>
            <div class="market-cell">$45.1B</div>
          </div>
        </div>
      \`;
      
      // Footer
      const footer = document.createElement('footer');
      footer.className = 'footer';
      footer.innerHTML = \`
        <div class="footer-content">
          <div class="footer-logo">CryptoApp</div>
          <div class="footer-links">
            <a href="#features">Features</a>
            <a href="#market">Market</a>
            <a href="#news">News</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div class="footer-social">
            <a href="#" class="social-icon">Twitter</a>
            <a href="#" class="social-icon">Discord</a>
            <a href="#" class="social-icon">Telegram</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 CryptoApp. All rights reserved.</p>
        </div>
      \`;
      
      // Append all sections
      app.appendChild(navbar);
      const main = document.createElement('main');
      main.appendChild(hero);
      main.appendChild(features);
      main.appendChild(market);
      app.appendChild(main);
      app.appendChild(footer);
      
      document.getElementById('root').appendChild(app);
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join('build', 'index.html'), indexHtml);

// Create CSS file
console.log('Creating CSS styles...');
const cssContent = `
/* Global styles */
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
  --text-color: #2d3436;
  --light-text: #ffffff;
  --dark-bg: #1e272e;
  --light-bg: #f5f6fa;
  --gradient-bg: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  --box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
}

body {
  background-color: var(--light-bg);
  color: var(--text-color);
  line-height: 1.6;
}

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navbar styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: var(--dark-bg);
  color: var(--light-text);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-text);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--secondary-color);
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.login-btn, .signup-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background-color: transparent;
  color: var(--light-text);
  border: 1px solid var(--light-text);
}

.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.signup-btn {
  background-color: var(--primary-color);
  color: var(--light-text);
}

.signup-btn:hover {
  background-color: var(--secondary-color);
}

/* Hero section */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 5%;
  background: var(--gradient-bg);
  color: var(--light-text);
}

.hero-content {
  max-width: 550px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 0.8rem 2.5rem;
  background-color: var(--light-text);
  color: var(--primary-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.hero-image {
  max-width: 45%;
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Features section */
.features {
  padding: 5rem 5%;
  text-align: center;
  background-color: var(--light-bg);
}

.features h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-content: center;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.feature-card p {
  color: var(--text-color);
}

/* Crypto Market section */
.crypto-market {
  padding: 5rem 5%;
  background-color: var(--dark-bg);
  color: var(--light-text);
}

.crypto-market h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.market-table {
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.market-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem 2rem;
}

.market-row.header {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.market-row:not(.header):hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.market-cell {
  padding: 0.5rem 0;
}

.positive {
  color: #00b894;
}

.negative {
  color: #ff7675;
}

/* Footer styles */
.footer {
  background-color: var(--dark-bg);
  color: var(--light-text);
  padding: 3rem 5% 1.5rem;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 2rem;
}

.footer-links a {
  color: var(--light-text);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--secondary-color);
}

.footer-social {
  display: flex;
  gap: 1.5rem;
}

.social-icon {
  color: var(--light-text);
  text-decoration: none;
  transition: color 0.3s;
}

.social-icon:hover {
  color: var(--secondary-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Mobile responsive styles */
@media (max-width: 992px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    margin-bottom: 3rem;
  }
  
  .hero-image {
    max-width: 80%;
  }
  
  .feature-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .market-row {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-links, .auth-buttons {
    margin-top: 1rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .market-row {
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
  }
  
  .market-row.header .market-cell:nth-child(3),
  .market-row.header .market-cell:nth-child(4),
  .market-row:not(.header) .market-cell:nth-child(3),
  .market-row:not(.header) .market-cell:nth-child(4) {
    display: none;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .feature-cards {
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
}
`;

fs.writeFileSync(path.join('build', 'styles.css'), cssContent);

console.log('Build completed successfully!'); 