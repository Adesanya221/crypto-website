import React, { useState, useEffect, useRef } from 'react';
import '../styles/AuthButtons.css';
import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';

// Country data with flags and currencies
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN' },
];

const AuthButtons = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Refs for closing dropdowns when clicking outside
  const authDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const authFormRef = useRef(null);
  
  // Check for auth state on load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setShowAuthDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (authFormRef.current && !authFormRef.current.contains(event.target) && 
          (showLoginForm || showSignupForm)) {
        setShowLoginForm(false);
        setShowSignupForm(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLoginForm, showSignupForm]);
  
  // Reset error when forms open/close
  useEffect(() => {
    setError('');
  }, [showLoginForm, showSignupForm]);
  
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginForm(false);
      setShowAuthDropdown(false);
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('Failed to login. Please try again.');
          break;
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      setLoading(false);
      return;
    }
    
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      setShowSignupForm(false);
      setShowAuthDropdown(false);
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email is already in use. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        default:
          setError('Failed to sign up. Please try again.');
          break;
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowAuthDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Select country
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };
  
  return (
    <div className="auth-container">
      {/* Country Selector */}
      <div className="country-selector" ref={countryDropdownRef}>
        <button 
          className="country-btn"
          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
        >
          <span className="country-flag">{selectedCountry.flag}</span>
          <span className="country-currency">{selectedCountry.currency}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        {showCountryDropdown && (
          <div className="country-dropdown">
            <div className="dropdown-header">
              <h3>Select Your Region</h3>
              <p>Choose your country and preferred currency</p>
            </div>
            <div className="country-list">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className={`country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                  onClick={() => selectCountry(country)}
                >
                  <span className="country-flag">{country.flag}</span>
                  <span className="country-name">{country.name}</span>
                  <span className="country-currency">{country.currency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Buttons */}
      <div className="auth-dropdown-container" ref={authDropdownRef}>
        <button 
          className="auth-toggle-btn"
          onClick={() => setShowAuthDropdown(!showAuthDropdown)}
        >
          {isLoggedIn ? (
            <>
              <span className="user-avatar">👤</span>
              <span>{user?.displayName || 'My Account'}</span>
            </>
          ) : (
            <>
              <span className="login-icon">🔑</span>
              <span>Sign In</span>
            </>
          )}
          <span className="dropdown-arrow">▼</span>
        </button>
        
        {showAuthDropdown && (
          <div className="auth-dropdown">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar">👤</div>
                  <div className="user-details">
                    <div className="user-name">{user?.displayName || 'User'}</div>
                    <div className="user-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>
                <div className="menu-items">
                  <a href="#profile" className="menu-item">
                    <span className="menu-icon">👤</span>
                    <span>My Profile</span>
                  </a>
                  <a href="#portfolio" className="menu-item">
                    <span className="menu-icon">📊</span>
                    <span>My Portfolio</span>
                  </a>
                  <a href="#settings" className="menu-item">
                    <span className="menu-icon">⚙️</span>
                    <span>Settings</span>
                  </a>
                  <button className="logout-btn" onClick={handleLogout}>
                    <span className="menu-icon">🚪</span>
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-options">
                <button 
                  className="auth-option-btn login"
                  onClick={() => {
                    setShowLoginForm(true);
                    setShowSignupForm(false);
                  }}
                >
                  <span className="option-icon">🔑</span>
                  <span>Login</span>
                </button>
                <button 
                  className="auth-option-btn signup"
                  onClick={() => {
                    setShowSignupForm(true);
                    setShowLoginForm(false);
                  }}
                >
                  <span className="option-icon">✨</span>
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Login Form */}
        {showLoginForm && (
          <div className="auth-form-overlay">
            <div className="auth-form" ref={authFormRef}>
              <div className="form-header">
                <h2>Login to Your Account</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowLoginForm(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="forgot-link">Forgot password?</a>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="form-footer">
                <p>
                  Don't have an account?{' '}
                  <button 
                    className="switch-form-btn"
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowSignupForm(true);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Signup Form */}
        {showSignupForm && (
          <div className="auth-form-overlay">
            <div className="auth-form" ref={authFormRef}>
              <div className="form-header">
                <h2>Create an Account</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowSignupForm(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSignup}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email">Email</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a password"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                </div>
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>I agree to the Terms and Privacy Policy</span>
                  </label>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
              <div className="form-footer">
                <p>
                  Already have an account?{' '}
                  <button 
                    className="switch-form-btn"
                    onClick={() => {
                      setShowSignupForm(false);
                      setShowLoginForm(true);
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthButtons; 