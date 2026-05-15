import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importera useNavigate
import './Header.css';

const Header = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State för sökordet
  const navigate = useNavigate(); // Hook för att byta sida programmatiskt

  // Funktion som körs när man trycker på Sök eller Enter
  const handleSearch = (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om
    if (searchTerm.trim()) {
      // Skickar användaren till /search?q=sökord
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Tömmer sökfältet
      setIsMenuOpen(false); // Stänger menyn om den är öppen (mobil)
    }
  };

  return (
    <header className="non-header">
      <div className="header-top">
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className="logo-container">
          <Link to="/">
            <span className="logo-text">Setup<span className="logo-highlight">Kungen</span></span>
          </Link>
        </div>
        
        {/* Ändrat till FORM för att stödja Enter-tryck */}
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Sök..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Uppdaterar sökordet när man skriver
          />
          <button type="submit" className="search-btn">Sök</button>
        </form>

        <div className="header-icons">
          <Link to="/login" className="icon-item login-link">
            <span className="icon-img">👤</span>
            <span className="icon-text">Logga in</span>
          </Link>
          
          <div className="icon-item cart" onClick={onCartClick} style={{ cursor: 'pointer' }}>
            <span className="icon-img">🛒</span>
            <span className="icon-text">Kundvagn</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>

      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
            <li><Link to="/category/Datorer" onClick={() => setIsMenuOpen(false)}>Datorer & Laptops</Link></li>
            <li><Link to="/category/Komponenter" onClick={() => setIsMenuOpen(false)}>Datorkomponenter</Link></li>
            <li><Link to="/category/Tillbehor" onClick={() => setIsMenuOpen(false)}>Datortillbehör</Link></li>
            <li><Link to="/category/Ljud-Bild" onClick={() => setIsMenuOpen(false)}>Ljud & Bild</Link></li>
            <li><Link to="/category/Konsoler" onClick={() => setIsMenuOpen(false)}>Spelkonsoler</Link></li>
            <li><Link to="/category/Spel" onClick={() => setIsMenuOpen(false)}>Spel & Media</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;