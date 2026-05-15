import React, { useState, useEffect } from 'react';
import './DeleteProduct.css';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Stat för sökordet
  const [message, setMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Kunde inte hämta produkter:", err);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Är du helt säker på att du vill radera "${name}" permanent?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage({ text: `✅ "${name}" har raderats.`, isError: false });
          fetchProducts(); 
        } else {
          setMessage({ text: '❌ Kunde inte radera produkten.', isError: true });
        }
      } catch (err) {
        setMessage({ text: '❌ Serverfel vid radering.', isError: true });
      }
    }
  };

  // Filtrera produkterna baserat på vad man skriver i sökfältet
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.id.toString().includes(searchTerm)
  );

  return (
    <div className="delete-page">
      <div className="delete-container">
        <h1>Hantera Lager</h1>
        <p className="description">Hitta och radera produkter ur sortimentet.</p>

        {/* SÖKFÄLTET */}
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Sök på produktnamn eller ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>X</button>
          )}
        </div>

        {message.text && (
          <div className={`status-msg ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}

        <div className="product-list-admin">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="admin-product-item">
                <div className="info-section">
                  <span className="prod-id">#{product.id}</span>
                  <span className="prod-name">{product.name}</span>
                  <span className="prod-price">{product.price} kr</span>
                </div>
                <button 
                  className="delete-action-btn" 
                  onClick={() => handleDelete(product.id, product.name)}
                >
                  Radera
                </button>
              </div>
            ))
          ) : (
            <p className="no-products">Inga produkter matchar din sökning.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;