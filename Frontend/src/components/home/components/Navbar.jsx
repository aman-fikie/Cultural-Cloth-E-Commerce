import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="navbar-logo">
          <span className="logo-icon">⚜</span>
          <span className="brand-name">Cultural cloth</span>
        </div>

        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
            🔍
          </button>
          <div className="cart-wrapper">
            <button className="icon-btn">🛒</button>
            <span className="cart-counter">2</span>
          </div>
          <button className="nav-auth-btn login-btn">Login</button>
          <button className="nav-auth-btn register-btn">Register</button>
          
          <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Search Overlay Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-content">
              <input type="text" placeholder="Search premium luxury collections..." autoFocus />
              <button className="close-search-btn" onClick={() => setIsSearchOpen(false)}>✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <ul className="mobile-links">
              <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</a></li>
              <li><a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Products</a></li>
              <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
              <li className="mobile-auth-actions">
                <button className="nav-auth-btn login-btn">Login</button>
                <button className="nav-auth-btn register-btn">Register</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;