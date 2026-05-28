import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

// RENSAT: Vi tar inte längre emot cartCount eller onCartClick, det sköter ShopLayout!
const ProductDetails = ({ onAddToCart }) => {
  const { name } = useParams(); // Tar emot namnet från URL:en (t.ex. "NVIDIA GeForce RTX 4070")
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    setLoading(true);

    // Vi skickar ENBART till namn-endpointen på backend
    fetch(`http://localhost:5000/api/products/name/${encodeURIComponent(name)}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Produkten hittades inte");
            }
            return res.json();
        })
        .then((data) => {
            setProduct(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Fel vid hämtning:", err);
            setProduct(null);
            setLoading(false);
        });
  }, [name]);

  if (loading) return <div className="loading">Laddar...</div>;
  if (!product) return <div className="error">Produkten hittades inte.</div>;

  return (
    <div className="product-details-page">
      {/* RENSAT: <Header /> är borttagen härifrån eftersom den ligger i ShopLayout */}
      
      <main className="product-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Tillbaka</button>
        
        <div className="details-layout">
          <div className="details-images">
            <div className="main-image-wrapper">
              <img src={product.images?.[activeImage]} alt={product.name} className="main-image" />
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

          <div className="details-info">
            <h1>{product.name}</h1>

            {product.highlights && product.highlights.length > 0 && (
              <div className="highlights-section">
                <ul className="details-highlights">
                  {product.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="price-section">
              <span className="details-price">{product.price}:-</span>
            </div>

            <div className="details-description">
              <h3>Beskrivning</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="purchase-card">
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                Lägg i varukorgen
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* RENSAT: <Footer /> är borttagen härifrån eftersom den ligger i ShopLayout */}
    </div>
  );
};

export default ProductDetails;