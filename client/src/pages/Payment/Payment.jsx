import React from 'react';
import './Payment.css';

const Payment = () => {
  return (
    <div className="payment-page">
      <div className="payment-container">
        <header className="payment-header">
          <h1>Betalning</h1>
          <p>Säkra och flexibla betalningsalternativ för din nya setup.</p>
        </header>

        <section className="payment-intro">
          <p>
            Vi samarbetar med marknadsledande betalningsleverantörer för att du ska kunna välja 
            det sätt som passar dig bäst. Alla transaktioner är krypterade och 100% säkra.
          </p>
        </section>

        <div className="payment-methods-grid">
          <div className="payment-card">
            <div className="payment-icon">💳</div>
            <h3>Kortbetalning</h3>
            <p>Vi accepterar VISA och Mastercard. Ingen extra avgift tillkommer.</p>
          </div>

          <div className="payment-card">
            <div className="payment-icon">📱</div>
            <h3>Swish</h3>
            <p>Betala snabbt och enkelt med mobilen via Swish-appen.</p>
          </div>

          <div className="payment-card highlight">
            <div className="payment-icon">📄</div>
            <h3>Klarna & Resurs Bank</h3>
            <p>Få först, betala sen. Välj faktura eller dela upp din betalning månadsvis.</p>
          </div>

          <div className="payment-card">
            <div className="payment-icon">🏦</div>
            <h3>Direktbank</h3>
            <p>Betala direkt via din internetbank (Trustly).</p>
          </div>
        </div>

        <section className="payment-security">
          <h2>Säkerhet framför allt</h2>
          <div className="security-content">
            <p>
              SetupKungen använder <strong>SSL (Secure Socket Layer)</strong>, vilket innebär att all 
              information som skickas mellan dig och oss är krypterad. Vi sparar aldrig dina 
              kortuppgifter i våra egna system.
            </p>
            <div className="security-badges">
              <span>🔒 Krypterad anslutning</span>
              <span>🛡️ 3D Secure</span>
              <span>✅ Verifierad partner</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;