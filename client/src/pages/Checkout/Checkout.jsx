import React from "react";
import Header from "../../components/Header/Header"; // Gå upp två steg
import Footer from "../../components/Footer/Footer"; // Gå upp två steg
import "./Checkout.css";

const Checkout = ({ cartItems, cartCount, onCartClick, onUpdateQuantity, onRemove }) => {
  // Räkna ut det totala priset
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <Header cartCount={cartCount} onCartClick={onCartClick} />
      
      <main className="checkout-container">
        <h1>Din Kassa</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-msg">
            <p>Din kundvagn är tom.</p>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* Vänster sida: Listan med produkter */}
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img src={item.images[0]} alt={item.name} className="checkout-img" />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}:-</p>
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => onRemove(item.id)}>
                    Ta bort
                  </button>
                </div>
              ))}
            </div>

            {/* Höger sida: Sammanfattning */}
            <div className="checkout-summary">
              <h3>Sammanfattning</h3>
              <div className="summary-row">
                <span>Totalt:</span>
                <span className="total-amount">{total}:-</span>
              </div>
              <button className="complete-purchase-btn">SLUTFÖR KÖP</button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;