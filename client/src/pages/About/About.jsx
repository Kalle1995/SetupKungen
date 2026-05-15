import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <h1>Om SetupKungen</h1>
          <p className="lead-text">Av entusiaster, för entusiaster.</p>
        </header>

        <section className="about-story">
          <div className="story-content">
            <h2>Vår Story</h2>
            <p>
              SetupKungen grundades ur en enkel idé: att skapa den ultimata destinationen för alla som tar sin gaming och arbetsplats på allvar. Vi insåg att marknaden saknade en butik som inte bara sålde produkter, utan som förstod helheten i en riktigt grym setup.
            </p>
            <p>
              Från det första mekaniska tangentbordet vi packade i ett litet garage, till att idag leverera hårdvara till tusentals gamers över hela landet, har vårt fokus alltid varit detsamma – kvalitet, prestanda och estetik.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <span>Här kan du ha en bild på ert team eller lager</span>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="value-card">
            <h3>Kvalitet</h3>
            <p>Vi säljer bara produkter vi själva skulle vilja ha i vår egen setup.</p>
          </div>
          <div className="value-card">
            <h3>Kunskap</h3>
            <p>Vi kan vår hårdvara. Har du frågor om DPI, switchar eller kabeldragning? Vi har svaren.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Vi är mer än en butik – vi är en del av den svenska gaming-scenen.</p>
          </div>
        </section>

        <section className="about-mission">
          <h2>Vår Vision</h2>
          <p>
            Vårt mål är att bli Nordens självklara val när det kommer till gaming-tillbehör och skrivbordsoptimering. Vi slutar aldrig leta efter nästa produkt som kan lyfta din upplevelse till en ny nivå.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;