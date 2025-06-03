import "../sections/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-container">
              <div className="footer-logo">
                <span className="footer-logo-text">U</span>
              </div>
              <span className="footer-brand-name">UNIFOR SPORTS</span>
            </div>
            <p className="footer-description">
              Promovendo o esporte e a qualidade de vida na comunidade universitária.
            </p>
          </div>
          
          <div>
            <h3 className="footer-section-title">Links Rápidos</h3>
            <ul className="footer-link-list">
              <li><a href="#" className="footer-link">Modalidades</a></li>
              <li><a href="#" className="footer-link">Reservar Quadra</a></li>
              <li><a href="#" className="footer-link">Carteirinha</a></li>
              <li><a href="#" className="footer-link">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-section-title">Contato</h3>
            <div className="footer-contact-info">
              <p>📍 Universidade de Fortaleza</p>
              <p>📞 (85) 3477-3000</p>
              <p>✉️ esportes@unifor.br</p>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; 2024 UNIFOR SPORTS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;