import React from 'react';
import './Returns.css';

const Returns = () => {
  return (
    <div className="returns-page">
      <div className="returns-container">
        <header className="returns-header">
          <h1>Retur & Reklamation</h1>
          <p>Vi vill att du ska vara 100% nöjd med din setup. Här hittar du allt om hur du går tillväga om något inte blev rätt.</p>
        </header>

        <section className="returns-section">
          <h2>Ångerrätt i 14 dagar</h2>
          <p>
            Hos SetupKungen har du alltid 14 dagars ångerrätt från det att du tagit emot din vara. 
            Varan ska returneras i oförändrat skick och i sin originalförpackning för att en fullständig återbetalning ska kunna ske.
          </p>
          <div className="returns-steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Kontakta vår kundtjänst via mejl och ange ditt ordernummer.</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Packa varan noga i originalkartongen (tänk på miljön, använd gärna samma emballage).</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Skicka paketet med den retursedel du får av oss.</p>
            </div>
          </div>
        </section>

        <section className="returns-section highlight">
          <h2>Reklamation</h2>
          <p>
            Är din vara trasig eller defekt? Enligt konsumentköplagen har du rätt att reklamera en vara i upp till 3 år, 
            förutsatt att felet är ursprungligt.
          </p>
          <ul>
            <li>Fotografera skadan tydligt.</li>
            <li>Beskriv felet noggrant i ett mejl till oss.</li>
            <li>Vi står självklart för alla fraktkostnader vid godkänd reklamation.</li>
          </ul>
        </section>

        <section className="returns-section">
          <h2>Återbetalning</h2>
          <p>
            När vi har tagit emot och kontrollerat din retur sker återbetalningen via samma betalsätt som du använde vid köpet. 
            Det tar vanligtvis 3–5 bankdagar innan pengarna syns på ditt konto.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Returns;