import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, FiTrendingUp, FiCalendar, FiShoppingBag, 
  FiClock, FiCheckCircle, FiBox, FiUsers, FiStar 
} from 'react-icons/fi';
import { formatCurrency, formatCompactNumber } from "../utils/formatCurrency";
import './StatsCards.css';

const iconMap = {
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiBox,
  FiUsers,
  FiStar,
};

export default function StatsCards({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => {
        const IconComponent = iconMap[stat.icon] || FiDollarSign;
        
        let displayValue = stat.value;
        if (stat.isCurrency) {
          displayValue = formatCurrency(stat.value);
        } else if (stat.isRating) {
          displayValue = `${stat.value} / 5.0`;
        } else {
          displayValue = formatCompactNumber(stat.value);
        }

        return (
          <motion.div
            key={stat.id}
            className="stat-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            whileHover={{ y: -4, boxShadow: '0 12px 25px rgba(122, 30, 44, 0.08)' }}
          >
            <div className="stat-header">
              <span className="stat-title">{stat.title}</span>
              <div className="stat-icon-wrapper">
                <IconComponent />
              </div>
            </div>

            <div className="stat-body">
              <h3 className="stat-value">{displayValue}</h3>
            </div>

            <div className="stat-footer">
              <span className={`stat-badge ${stat.isPositive ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
              <span className="stat-desc">{stat.desc}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}