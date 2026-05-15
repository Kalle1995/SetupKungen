import React from 'react';
import './Sustainability.css';

const Sustainability = () => {
  return (
    <div className="sustainability-page">
      <div className="sustainability-container">
        <header className="sustainability-header">
          <div className="eco-badge">Eko-medvetna val</div>
          <h1>Vårt ansvar för framtiden</h1>
          <p>Vi på SetupKungen tror att framtidens gaming måste vara hållbar.</p>
        </header>

        <div className="sus-grid">
          <section className="sus-item">
            <div className="sus-icon">📦</div>
            <h2>Smartare emballage</h2>
            <p>
              Vi har tagit bort onödig plast i våra leveranser. Vi använder återvunnen kartong 
              och ser till att paketen inte är större än nödvändigt för att spara plats i lastbilarna.
            </p>
          </section>

          <section className="sus-item">
            <div className="sus-icon">🔋</div>
            <h2>Elektronikåtervinning</h2>
            <p>
              Elektronik innehåller värdefulla metaller. Vi samarbetar med lokala stationer 
              för att säkerställa att uttjänta produkter tas om hand på rätt sätt.
            </p>
          </section>

          <section className="sus-item">
            <div className="sus-icon">🚚</div>
            <h2>Klimatkompenserad frakt</h2>
            <p>
              Tillsammans med PostNord satsar vi på att göra våra transporter så gröna som möjligt 
              genom att optimera rutter och använda elfordon i städerna.
            </p>
          </section>
        </div>

        <section className="sus-quote">
          <blockquote>
            "Vårt mål är att minska vårt klimatavtryck med 30% till år 2028 utan att tumma på prestandan i din setup."
          </blockquote>
          <cite>– Grundaren av SetupKungen</cite>
        </section>
      </div>
    </div>
  );
};

export default Sustainability;