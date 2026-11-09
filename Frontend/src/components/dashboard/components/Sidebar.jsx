import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiBox, FiGrid, FiShoppingBag, FiUsers, FiLayers, 
  FiBarChart2, FiDollarSign, FiStar, FiMail, FiBell, 
  FiTag, FiUser, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiX
} from 'react-icons/fi';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'products', label: 'Products', icon: FiBox },
  { id: 'categories', label: 'Categories', icon: FiGrid },
  { id: 'orders', label: 'Orders', icon: FiShoppingBag },
  { id: 'customers', label: 'Customers', icon: FiUsers },
  { id: 'inventory', label: 'Inventory', icon: FiLayers },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
  { id: 'reviews', label: 'Reviews', icon: FiStar },
  { id: 'messages', label: 'Messages', icon: FiMail },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'discounts', label: 'Discounts', icon: FiTag },
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ 
  isCollapsed, 
  toggleSidebar, 
  isMobileOpen, 
  toggleMobile, 
  activeTab, 
  setActiveTab 
}) {
  const sidebarContent = (
    <div className="sidebar-inner">
      <div className="sidebar-header">
        <div className="brand-wrapper">
          <span className="brand-icon">❖</span>
          {(!isCollapsed || isMobileOpen) && (
            <motion.span 
              className="brand-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Cultural Cloth
            </motion.span>
          )}
        </div>
        
        {isMobileOpen ? (
          <button className="icon-btn mobile-close-btn" onClick={toggleMobile}>
            <FiX />
          </button>
        ) : (
          <button className="icon-btn collapse-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobileOpen) toggleMobile();
                  }}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="nav-icon" />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="nav-label">{item.label}</span>
                  )}
                  {isActive && <motion.div className="active-indicator" layoutId="sidebarActive" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-btn logout-btn">
          <FiLogOut className="nav-icon" />
          {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`desktop-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobile}
            />
            <motion.aside 
              className="mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}