import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';
import './Home.css';

// HÄR: Ta emot props från App.jsx
const Home = ({ cartCount, onCartClick }) => {
  return (
    <div className="home-page">
      {/* HÄR: Skicka vidare props till Header */}
      <Header cartCount={cartCount} onCartClick={onCartClick} />
      
      <Main />

      <Footer />
    </div>
  );
};

export default Home;