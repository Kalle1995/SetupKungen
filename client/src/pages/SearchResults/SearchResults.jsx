import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';


const SearchResults = ({ cartCount, onCartClick, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Hämtar "q" från URL (t.ex. ?q=bord)
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://localhost:5000/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Sökfel:", err);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="search-results-page">
      
      <main className="home-content">
        <div className="hero-section">
          <h1>Sökresultat för "{query}"</h1>
          <p>Hittade {products.length} produkter som matchar din sökning.</p>
        </div>

        {loading ? (
          <div className="loading">Söker...</div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                {/* ÄNDRING HÄR: Vi ändrade product.id till product.name i länken */}
                <Link to={`/product/${encodeURIComponent(product.name)}`} className="product-card-link">
                  <div className="product-image-container">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="no-image">Ingen bild</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                  </div>
                </Link>
                <div className="product-bottom">
                  <span className="price">{product.price}:-</span>
                  <button className="buy-btn" onClick={() => onAddToCart(product)}>Köp</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="no-results">
            <p>Tyvärr, vi hittade inget som matchade "{query}". Testa något annat!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;