import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-container">
        {product.discount && <span className="discount-badge">{product.discount}</span>}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        <img src={product.image} alt={product.name} className="product-main-img" />
      </div>

      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          {Array.from({ length: product.rating }).map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
          {Array.from({ length: 5 - product.rating }).map((_, i) => (
            <span key={i} className="star empty">★</span>
          ))}
        </div>

        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;