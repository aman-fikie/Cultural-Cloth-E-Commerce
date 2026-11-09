import React from 'react';
import { FiEye, FiMoreVertical } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatCurrency';
import './OrdersTable.css';

export default function OrdersTable({ orders }) {
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="table-card">
      <div className="table-card-header">
        <div>
          <h3 className="table-title">Recent Customer Orders</h3>
          <p className="table-subtitle">Live real-time transaction updates</p>
        </div>
        <button className="text-btn">View All Orders &rarr;</button>
      </div>

      <div className="table-responsive-wrapper">
        <table className="luxury-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Price</th>
              <th>Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-bold order-id">{order.id}</td>
                <td>
                  <div className="customer-cell">
                    <img src={order.customer.avatar} alt={order.customer.name} />
                    <div className="customer-info">
                      <span className="customer-name">{order.customer.name}</span>
                      <span className="customer-email">{order.customer.email}</span>
                    </div>
                  </div>
                </td>
                <td className="product-cell">{order.product}</td>
                <td>
                  <span className={`status-pill ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className="payment-status">{order.paymentStatus}</span>
                </td>
                <td className="font-bold">{formatCurrency(order.price)}</td>
                <td className="date-cell">{order.date}</td>
                <td className="text-right">
                  <div className="action-group">
                    <button className="action-btn" title="View Details">
                      <FiEye />
                    </button>
                    <button className="action-btn" title="More Options">
                      <FiMoreVertical />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}