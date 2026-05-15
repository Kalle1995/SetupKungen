import React from 'react';
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-page">
      <div className="careers-container">
        <header className="careers-header">
          <h1>Häng med på resan!</h1>
          <p>Vill du jobba med Sveriges vassaste setups? Vi letar alltid efter nya talanger.</p>
        </header>

        <section className="careers-intro">
          <div className="intro-text">
            <h2>Varför SetupKungen?</h2>
            <p>
              Vi är ett ungt, snabbväxande team som brinner för gaming-kultur och teknik. 
              Hos oss får du jobba i en kreativ miljö där vi värdesätter egna initiativ och 
              där fikarasten ofta spenderas framför en skärm eller ett parti bordtennis.
            </p>
          </div>
        </section>

        <div className="open-positions">
          <h2>Lediga tjänster</h2>
          <div className="job-list">
            <div className="job-card">
              <div className="job-info">
                <h3>Lagerhjälte / Logistik</h3>
                <span>Heltid | Stockholm</span>
              </div>
              <p>Vi söker dig som är snabb, noggrann och vill se till att våra kunder får sina paket i rekordfart.</p>
              <button className="apply-btn">Läs mer</button>
            </div>

            <div className="job-card">
              <div className="job-info">
                <h3>Kundtjänst-stjärna</h3>
                <span>Deltid | Distans/Hybrid</span>
              </div>
              <p>Älskar du att hjälpa folk och har stenkoll på skillnaden mellan olika switchar? Sök nu!</p>
              <button className="apply-btn">Läs mer</button>
            </div>
          </div>
        </div>

        <section className="spontaneous-app">
          <div className="app-box">
            <h3>Hittar du inte rätt tjänst?</h3>
            <p>Vi är alltid intresserade av drivna personer. Skicka en spontanansökan till oss!</p>
            <a href="mailto:jobb@setupkungen.se" className="email-link">jobb@setupkungen.se</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;