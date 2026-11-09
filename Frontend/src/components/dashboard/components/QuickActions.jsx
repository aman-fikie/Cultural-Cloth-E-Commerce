import React from 'react';
import { FiPlus, FiBox, FiTag, FiFileText, FiEye } from 'react-icons/fi';
import './QuickActions.css';

export default function QuickActions() {
  return (
    <div className="quick-actions-card">
      <div className="actions-header">
        <h3 className="actions-title">Quick Operations</h3>
      </div>
      <div className="actions-grid">
        <button className="action-button primary">
          <FiPlus /> Add Product
        </button>
        <button className="action-button secondary">
          <FiBox /> Manage Inventory
        </button>
        <button className="action-button secondary">
          <FiEye /> View Orders
        </button>
        <button className="action-button secondary">
          <FiTag /> Create Discount
        </button>
        <button className="action-button secondary">
          <FiFileText /> Download Reports
        </button>
      </div>
    </div>
  );
}