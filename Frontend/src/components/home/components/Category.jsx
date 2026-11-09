import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import '../styles/Category.css';

const Category = () => {
  return (
    <section className="category-section" id="categories">
      <div className="section-title-block">
        <h2>Shop By Category</h2>
        <div className="gold-divider">⚜</div>
      </div>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <motion.div 
            className="category-card" 
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay-effect" />
            </div>
            
            <div className="category-info">
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="gold-animated-border" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;