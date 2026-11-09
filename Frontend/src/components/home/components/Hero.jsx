import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />
      
      {/* Premium background layout image */}
      <img 
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1800&auto=format&fit=crop" 
        alt="Premium Luxury Cultural Fashion Model" 
        className="hero-bg-img"
      />

      <div className="hero-content">
        <motion.div 
          className="decorative-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ⚜ Luxury Traditional Atelier
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Celebrate Heritage <br />Through Timeless Fashion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover authentic cultural clothing crafted with tradition, passion, and modern elegance.
        </motion.p>

        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="hero-btn primary-hero">Shop Collection</button>
          <button className="hero-btn secondary-hero">Explore Categories</button>
        </motion.div>
      </div>

      {/* Floating Design Elements for Luxury Aesthetic */}
      <motion.div 
        className="floating-pattern pattern-left"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="floating-pattern pattern-right"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
    </section>
  );
};

export default Hero;