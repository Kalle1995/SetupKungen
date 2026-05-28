import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = ({ onAddToCart }) => {
  const { name } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/category/${name}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Kunde inte hämta kategori-produkter:", err);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="category-page">
      <main className="home-content">
        <div className="hero-section">
          <h1>{name}</h1>
          <p>Hitta de bästa produkterna inom {name ? name.toLowerCase() : ''}.</p>
        </div>

        {loading ? (
          <div className="loading">Laddar produkter...</div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
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
                      {product.highlights && Array.isArray(product.highlights) && 
                        product.highlights.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))
                      }
                    </ul>
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
          <div className="no-products">
            <p>Just nu finns inga produkter i denna kategori.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;