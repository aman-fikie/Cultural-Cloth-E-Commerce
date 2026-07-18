import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Send a request to profile.php
        // withCredentials tells axios to attach session cookies
        const response = await api.get('/profile.php');
        
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          throw new Error("Failed to read user configuration.");
        }
      } catch (err) {
        console.error("Dashboard mount authentication failed:", err);
        setErrorMsg("Your session expired. Redirecting back to login secure portal...");
        
        // Clean up local states and redirect to login page
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.get('/logout.php');
    } catch (err) {
      console.error("Session cleanup request failed:", err);
    } finally {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className={styles.centerState}>
        <div className={styles.spinner}></div>
        <p style={{ marginTop: '16px', color: '#7A1E2C', fontWeight: '500' }}>
          Initializing Secure Session...
        </p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className={styles.centerState}>
        <p className={styles.errorMessage}>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardWrapper}>
      {/* TOP NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.brandLogo}>Cultural Cloth</div>
        <div className={styles.navActions}>
          <span className={styles.welcomeMsg}>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* DASHBOARD CORE CONTENT */}
      <main className={styles.mainContainer}>
        
        {/* PROFILE SIDEBAR CARD */}
        <aside className={`${styles.card} styles.profileCard`}>
          <div className={styles.avatarFrame}>
            {user?.profile_image ? (
              <img 
                src={`http://localhost/Ecommerce/backend/${user.profile_image}`} 
                alt="Profile Avatar" 
                className={styles.avatarImage}
              />
            ) : (
              <span className={styles.avatarPlaceholder}>👤</span>
            )}
          </div>
          <h2 className={styles.profileName}>{user?.full_name}</h2>
          <p className={styles.profileEmail}>{user?.email}</p>

          <div className={styles.profileDetailsList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone Number</span>
              <span className={styles.detailValue}>{user?.phone || 'Not Specified'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Gender</span>
              <span className={styles.detailValue}>{user?.gender || 'Not Specified'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{user?.location || 'Not Specified'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Member Since</span>
              <span className={styles.detailValue}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </aside>

        {/* WORKSPACE & ACTIONS LIST */}
        <section className={styles.workspace}>
          
          {/* Quick Actions Panel */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Quick Account Operations</h3>
            <div className={styles.quickActionsGrid}>
              <div className={styles.actionTile}>
                <span className={styles.actionIcon}>🛍️</span>
                <span className={styles.actionText}>My Orders</span>
              </div>
              <div className={styles.actionTile}>
                <span className={styles.actionIcon}>❤️</span>
                <span className={styles.actionText}>Wishlist</span>
              </div>
              <div className={styles.actionTile}>
                <span className={styles.actionIcon}>🛒</span>
                <span className={styles.actionText}>Active Cart</span>
              </div>
              <div className={styles.actionTile}>
                <span className={styles.actionIcon}>⚙️</span>
                <span className={styles.actionText}>Settings</span>
              </div>
            </div>
          </div>

          {/* Conditional Shop Details Card */}
          {user?.shop_name && (
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Merchant Shop Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>Shop Name:</strong> {user.shop_name}
                  </p>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>Active Hours:</strong> {user.start_time} - {user.end_time}
                  </p>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>Shop Description:</strong> {user.shop_description || 'No description added yet.'}
                  </p>
                </div>
                <div>
                  {user.business_license && (
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>Business License:</strong>{' '}
                      <a 
                        href={`http://localhost/Ecommerce/backend/${user.business_license}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: '#7A1E2C', fontWeight: 'bold', textDecoration: 'underline' }}
                      >
                        Verify PDF Document
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Placeholder */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Recent Activities</h3>
            <div style={{ padding: '30px', textAlign: 'center', color: '#666', border: '1px dashed #C8A44D', borderRadius: '8px' }}>
              Your order timeline is currently empty. Start searching the collections!
            </div>
          </div>

        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Cultural Cloth. All Rights Reserved.
      </footer>
    </div>
  );
}