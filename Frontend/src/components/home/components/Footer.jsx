import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span>⚜</span> HERITAGE
          </div>
          <p className="footer-desc">
            Preserving history, artistry, and ancestral luxury garments for modern international living. Handmade authentic masterpieces.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Collections</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#products">Products</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#contact">Contact Support</a></li>
            <li><a href="#shipping">Premium Shipping</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
          </ul>
        </div>

        <div className="footer-social-col">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#instagram" className="social-icon-link">📷</a>
            <a href="#facebook" className="social-icon-link">📘</a>
            <a href="#pinterest" className="social-icon-link">📌</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HERITAGE Premium Cultural Fashion. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;