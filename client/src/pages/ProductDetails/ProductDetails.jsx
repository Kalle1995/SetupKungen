import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart, cartCount, onCartClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Produkten hittades inte");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fel vid hämtning:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Laddar...</div>;
  if (!product) return <div className="error">Produkten hittades inte.</div>;

  return (
    <div className="product-details-page">
      <Header cartCount={cartCount} onCartClick={onCartClick} />
      
      <main className="product-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Tillbaka</button>
        
        <div className="details-layout">
          {/* Bildgalleri - Vänster */}
          <div className="details-images">
            <div className="main-image-wrapper">
              <img src={product.images[activeImage]} alt={product.name} className="main-image" />
            </div>
            <div className="image-thumbnails">
              {product.images?.map((img, idx) => (
                <img 
                  key={idx} src={img} alt="thumb"
                  onClick={() => setActiveImage(idx)}
                  className={activeImage === idx ? 'thumb active' : 'thumb'}
                />
              ))}
            </div>
          </div>

          {/* Produktinfo - Höger */}
          <div className="details-info">
            <h1>{product.name}</h1>

            {/* 1. Specifikationer (Högst upp) */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="highlights-section">
                <ul className="details-highlights">
                  {product.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 2. Pris */}
            <div className="price-section">
              <span className="details-price">{product.price}:-</span>
            </div>

            {/* 3. Beskrivning (Ovanför knappen) */}
            <div className="details-description">
              <h3>Beskrivning</h3>
              <p>{product.description}</p>
            </div>
            
            {/* 4. Köp-knapp (Längst ner i info-delen) */}
            <div className="purchase-card">
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                Lägg i varukorgen
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;