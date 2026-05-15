import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate(); // Initiera navigate

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Funktion för att hantera navigering till kassan
  const handleCheckoutClick = () => {
    onClose(); // Stäng drawern först
    navigate('/checkout'); // Skicka användaren till checkout-sidan
  };

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Din Varukorg</h2>
          <button className="close-cart-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <p className="empty-cart-text">Korgen är tom...</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-container">
                    {item.images && item.images.length > 0 ? (
                        <img src={item.images[0]} alt={item.name} className="cart-item-img" />
                    ) : (
                        <div className="no-image-placeholder">📷</div>
                    )}
                </div>
                
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price}:-</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Totalt:</span>
              <span className="total-price">{totalAmount}:-</span>
            </div>
            {/* Uppdaterad knapp med onClick */}
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              Gå till kassan
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;