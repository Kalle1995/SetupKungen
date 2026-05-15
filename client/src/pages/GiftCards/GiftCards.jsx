import React from 'react';
import './GiftCards.css';

const GiftCards = () => {
  return (
    <div className="giftcard-page">
      <div className="giftcard-container">
        <header className="giftcard-header">
          <h1>Presentkort hos SetupKungen</h1>
          <p>Den perfekta gåvan till gamern som redan har allt (eller behöver allt).</p>
        </header>

        <div className="giftcard-hero">
          <div className="giftcard-visual">
            <div className="card-mockup">
              <span className="card-logo">SetupKungen</span>
              <span className="card-value">VALFRITT BELOPP</span>
            </div>
          </div>
          <div className="giftcard-order-info">
            <h2>Ge bort en bättre setup</h2>
            <p>
              Våra digitala presentkort skickas direkt via e-post och kan användas på hela vårt sortiment. 
              Giltigt i 2 år från inköpsdatum.
            </p>
            <ul className="giftcard-features">
              <li>✅ Leverans inom 5 minuter</li>
              <li>✅ Gäller på alla kampanjer</li>
              <li>✅ Enkelt att skriva ut</li>
            </ul>
            <button className="buy-giftcard-btn">Kommer snart - Håll utkik!</button>
          </div>
        </div>

        <section className="giftcard-faq">
          <h2>Vanliga frågor om presentkort</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Hur levereras det?</h3>
              <p>Presentkortet skickas som en PDF till den e-postadress du anger vid köpet. Perfekt för sista minuten-presenter!</p>
            </div>
            <div className="faq-item">
              <h3>Kan jag dela upp köpet?</h3>
              <p>Ja, du behöver inte använda hela beloppet på en gång. Restvärdet sparas automatiskt på din kod.</p>
            </div>
            <div className="faq-item">
              <h3>Hur använder jag koden?</h3>
              <p>Du anger din unika kod i kassan under fältet "Presentkort/Rabattkod" innan du slutför din beställning.</p>
            </div>
            <div className="faq-item">
              <h3>Kan jag köpa fysiska kort?</h3>
              <p>Just nu erbjuder vi endast digitala presentkort för att spara på miljön och garantera snabbast möjliga leverans.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GiftCards;