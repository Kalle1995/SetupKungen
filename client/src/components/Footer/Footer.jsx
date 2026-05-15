import React from 'react';
import { Link } from 'react-router-dom'; // Viktigt: Importera Link
import './Footer.css';

const Footer = () => {
  return (
    <footer className="non-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Kundservice</h4>
          <ul>
            <li><Link to="/contact">Kontakt</Link></li>
            <li><Link to="/returns">Retur & Reklamation</Link></li>
            <li><Link to="/giftcards">Presentkort</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Handla hos oss</h4>
          <ul>
            <li><Link to="/shipping">Frakt & Leverans</Link></li>
            <li><Link to="/payment">Betalning</Link></li>
            <li><Link to="/terms">Köpvillkor</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Om SetupKungen</h4>
          <ul>
            <li><Link to="/about">Om företaget</Link></li>
            <li><Link to="/sustainability">Hållbarhet</Link></li>
            <li><Link to="/careers">Jobba hos oss</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-payments">
        <p>Vi samarbetar med: <strong>Resurs Bank | Klarna | Swish | PostNord</strong></p>
      </div>
    </footer>
  );
};

export default Footer;