import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <header className="terms-header">
          <h1>Köpvillkor</h1>
          <p>Senast uppdaterad: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="terms-content">
          <div className="terms-block">
            <h2>1. Allmänt</h2>
            <p>
              Dessa köpvillkor gäller när du som konsument gör ett köp via SetupKungen.se. 
              Genom att genomföra en beställning accepterar du våra villkor och intygar att 
              du är över 18 år eller har målsmans tillstånd.
            </p>
          </div>

          <div className="terms-block">
            <h2>2. Priser och Betalning</h2>
            <p>
              Alla priser anges i svenska kronor (SEK) inklusive moms (25%). Vi reserverar oss 
              för eventuella tryckfel eller prisfelaktigheter. Betalning sker via de alternativ 
              som anges i kassan (Klarna, Swish, Kort).
            </p>
          </div>

          <div className="terms-block">
            <h2>3. Beställning och Orderbekräftelse</h2>
            <p>
              När du slutfört din beställning skickas en orderbekräftelse till din e-postadress. 
              Denna bekräftelse fungerar som ditt kvitto och garantibevis. Kontrollera alltid 
              att dina uppgifter stämmer.
            </p>
          </div>

          <div className="terms-block">
            <h2>4. Leverans</h2>
            <p>
              Normal leveranstid är 1-3 arbetsdagar. Om en vara är tillfälligt slut meddelar vi 
              dig via e-post. Vi står för risken vid transport från vårt lager till dig, medan 
              du står för risken vid en eventuell retur till oss.
            </p>
          </div>

          <div className="terms-block">
            <h2>5. Personuppgifter (GDPR)</h2>
            <p>
              Vi hanterar dina personuppgifter med största försiktighet. Vi sparar endast de 
              uppgifter som krävs för att kunna hantera din order och kontakta dig vid behov. 
              Du har alltid rätt att få ut dina uppgifter eller få dem raderade.
            </p>
          </div>

          <div className="terms-block">
            <h2>6. Tvist</h2>
            <p>
              Vid eventuell tvist följer SetupKungen rekommendationer från Allmänna 
              Reklamationsnämnden (ARN).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;