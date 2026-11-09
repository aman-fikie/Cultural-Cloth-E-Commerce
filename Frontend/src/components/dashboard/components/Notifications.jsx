import React from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import './Notifications.css';

export default function Notifications({ notifications, onMarkAsRead }) {
  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Store Activity</h3>
        <FiBell className="widget-icon" />
      </div>

      <div className="notifications-list">
        {notifications.map((item) => (
          <div key={item.id} className={`notification-item ${item.unread ? 'unread' : ''}`}>
            <div className="notification-content">
              <span className="notification-item-title">{item.title}</span>
              <p className="notification-msg">{item.message}</p>
              <span className="notification-time">{item.timestamp}</span>
            </div>
            {item.unread && (
              <button 
                className="mark-read-btn" 
                onClick={() => onMarkAsRead(item.id)}
                title="Mark as read"
              >
                <FiCheck />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}