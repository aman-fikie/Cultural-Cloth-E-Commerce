import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Cultural Cloth Marketplace Inc. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Merchant Support</a>
        </div>
      </div>
    </footer>
  );
}