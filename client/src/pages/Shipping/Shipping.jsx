import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="shipping-page">
      <div className="shipping-container">
        <header className="shipping-header">
          <h1>Frakt & Leverans</h1>
          <p>Snabb och säker leverans direkt till ditt postombud eller dörr.</p>
        </header>

        <div className="shipping-grid">
          <section className="shipping-card">
            <div className="icon">🚚</div>
            <h2>Leveranstid</h2>
            <p>Vi skickar normalt dina varor inom 24 timmar på vardagar. Standard leveranstid är <strong>1-3 arbetsdagar</strong>.</p>
          </section>

          <section className="shipping-card">
            <div className="icon">💰</div>
            <h2>Fraktkostnad</h2>
            <p>Vi erbjuder fri frakt på alla beställningar över <strong>500 kr</strong>. För order under 500 kr tillkommer en fraktavgift på 49 kr.</p>
          </section>

          <section className="shipping-card">
            <div className="icon">📦</div>
            <h2>Fraktbolag</h2>
            <p>Vi samarbetar med <strong>PostNord</strong> och <strong>Instabox</strong> för att garantera en trygg resa hela vägen hem till dig.</p>
          </section>
        </div>

        <section className="shipping-details">
          <h2>Hur spårar jag mitt paket?</h2>
          <p>
            När din order lämnar vårt lager får du en leveransbekräftelse via e-post med ett spårningsnummer. 
            Du kan använda detta nummer på fraktbolagets hemsida eller i deras app för att följa paketet i realtid.
          </p>

          <div className="shipping-notice">
            <h3>Transportskador</h3>
            <p>
              Om du upptäcker en skada på emballaget vid uthämtning, anmäl detta direkt till ombudet. 
              Om varan i paketet är skadad, kontakta vår <a href="/contact">kundtjänst</a> så hjälper vi dig direkt.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;