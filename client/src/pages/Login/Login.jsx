import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inloggningen är inte aktiverad ännu (Skolprojekt)");
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-container">
        <div className="login-box">
          <h1>Logga in</h1>
          <p>Välkommen tillbaka till SetupKungen!</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>E-post</label>
              <input type="email" placeholder="din@epost.se" required />
            </div>
            
            <div className="input-group">
              <label>Lösenord</label>
              <input type="password" placeholder="********" required />
            </div>

            <button type="submit" className="login-submit-btn">Logga in</button>
          </form>

          <div className="login-footer">
            <p>Saknar du konto? <span className="link-text">Registrera dig här</span></p>
            <p className="forgot-password">Glömt lösenordet?</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;