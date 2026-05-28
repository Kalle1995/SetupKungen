import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Här kan du senare koppla på en backend-funktion för att skicka mejl
    setStatus('Tack för ditt meddelande! Vi återkommer så snart vi kan.');
    e.target.reset();
  };

  return (
    
    <div className="contact-page">
      <div className="contact-container">
        <section className="contact-info-section">
          <h1>Kontakta oss</h1>
          <p>Vi finns här för att hjälpa dig med frågor om din order eller våra produkter.</p>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Kundtjänst</h3>
              <p>E-post: support@dinbutik.se</p>
              <p>Telefon: 08-123 45 67</p>
            </div>
            <div className="info-item">
              <h3>Öppettider</h3>
              <p>Vardagar: 09:00 - 17:00</p>
              <p>Helger: Stängt</p>
            </div>
            <div className="info-item">
              <h3>Huvudkontor</h3>
              <p>Gata 123</p>
              <p>111 22 Stockholm</p>
            </div>
          </div>
        </section>

        <section className="contact-form-section">
          <h2>Skicka ett meddelande</h2>
          {status && <div className="status-success">{status}</div>}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Namn</label>
              <input type="text" placeholder="Ditt fullständiga namn" required />
            </div>
            <div className="form-group">
              <label>E-post</label>
              <input type="email" placeholder="din.mejl@exempel.se" required />
            </div>
            <div className="form-group">
              <label>Ärende</label>
              <select required>
                <option value="">Välj ärende</option>
                <option value="order">Frågor om order</option>
                <option value="return">Retur & Reklamation</option>
                <option value="product">Produktfrågor</option>
                <option value="other">Övrigt</option>
              </select>
            </div>
            <div className="form-group">
              <label>Meddelande</label>
              <textarea placeholder="Hur kan vi hjälpa dig?" required></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">Skicka meddelande</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;