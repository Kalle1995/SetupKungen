import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20); // Börja med att visa 20 st

  useEffect(() => {
    // Vi hämtar alla, men vi kommer styra visningen med visibleCount
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Här blandar vi listan direkt i React så det inte alltid är samma ID först
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProducts(shuffled);
      })
      .catch(err => console.error("Kunde inte hämta produkter:", err));
  }, []);

  // Funktion för att visa 20 till när man klickar på knappen
  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };

  return (
    <main className="home-content">
      <div className="hero-section">
        <h1>Välkommen till SetupKungen</h1>
        <p>Här börjar ditt nästa bygge.</p>
      </div>

      <div className="product-grid">
        {/* Vi använder slice(0, visibleCount) för att bara visa ett visst antal */}
        {products.slice(0, visibleCount).map(product => (
          <div key={product.id} className="product-card">
            {/* ÄNDRING HÄR: Vi ändrade från product.id till product.name i länken */}
            <Link to={`/product/${encodeURIComponent(product.name)}`} className="product-card-link">
              <div className="product-image-container">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="no-image">Ingen bild</div>
                )}
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <ul className="product-highlights">
                  {product.highlights && product.highlights.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </Link>

            <div className="product-bottom">
              <span className="price">{product.price}:-</span>
              <button className="buy-btn">Köp</button>
            </div>
          </div>
        ))}
      </div>

      {/* Visa knappen endast om det finns fler produkter att ladda in */}
      {visibleCount < products.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={showMore}>
            Visa fler produkter
          </button>
        </div>
      )}
    </main>
  );
};

export default Main;