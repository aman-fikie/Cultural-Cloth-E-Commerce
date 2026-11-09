import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Category from './components/Category';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main>
        <Hero />
        <Category />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Home;