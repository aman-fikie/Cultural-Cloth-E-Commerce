import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../styles/FeaturedProducts.css';

const FeaturedProducts = () => {
  return (
    <section className="products-section" id="products">
      <div className="section-title-block">
        <h2>Featured Masterpieces</h2>
        <div className="gold-divider">⚜</div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;