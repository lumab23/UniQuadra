import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard";
import "../sections/styles/CardSection.css";

const CardSection = () => {

  const navigate = useNavigate();

  const handleCreateCard = () => {
    navigate('/carteirinha');
  };

  const handleLearnMore = () => {
  // Scroll para seção de modalidades ou outras informações
    const modalidadesSection = document.querySelector('#modalidades');
    if (modalidadesSection) {
      const navbarHeight = 80;
      const elementPosition = (modalidadesSection as HTMLElement).offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };


  return (
    <section className="card-section">
      <div className="section-container">
        <div className="section-grid">
          <div className="section-content">
            <h2 className="section-title">
              Faça sua Carteirinha Digital!
            </h2>
            <p className="section-description">
              Crie sua identificação estudantil digital e tenha acesso a todos os espaços esportivos da Unifor de forma prática e segura.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <span>✓</span>
                </div>
                <span className="feature-text">Acesso a todas as modalidades</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <span>✓</span>
                </div>
                <span className="feature-text">Reserva de quadras prioritária</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <span>✓</span>
                </div>
                <span className="feature-text">Identificação sempre disponível</span>
              </div>
            </div>
            <div className="section-buttons">
              <Button variant="white" size="lg" onClick={handleCreateCard}>
                Criar Carteirinha
              </Button>
              <Button variant="secondary" onClick={handleLearnMore} size="lg" className="saiba-mais-button">
                Saiba Mais
              </Button>
            </div>
          </div>

          <div className="card-display">
            <StudentCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;