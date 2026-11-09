import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './LowStock.css';

export default function LowStock({ products }) {
  const lowStockItems = products.filter(p => p.stock <= p.threshold);

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Low Stock Alerts</h3>
        <FiAlertTriangle className="warning-icon" />
      </div>

      <div className="stock-list">
        {lowStockItems.map((product) => {
          const percentage = Math.min((product.stock / product.threshold) * 100, 100);
          return (
            <div key={product.id} className="stock-item">
              <img src={product.image} alt={product.name} className="stock-img" />
              <div className="stock-details">
                <span className="product-title">{product.name}</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="stock-count">{product.stock} units remaining</span>
              </div>
              <button className="restock-btn">Restock</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}