import Navbar from "../components/layout/Navbar";
import FormSection from "../components/sections/FormSection";
import StudentCard from "../components/sections/StudentCard";
import "../pages/styles/Carteirinha.css";

const Carteirinha = () => {
  return (
    <div className="carteirinha-page">
      <Navbar />
      
      {/* Hero Section */}
      <section id="carteirinha" className="carteirinha-hero-section">
        <div className="carteirinha-hero-container">
          <div className="carteirinha-hero-content">
            <div className="carteirinha-hero-text">
              <p className="carteirinha-hero-subtitle">Um passo para a sua carteirinha!</p>
              <h1 className="carteirinha-hero-title">
                Preencha os dados
                <br />
                a baixo
              </h1>
            </div>
            
            <div className="carteirinha-hero-card">
              {/* Usar o componente StudentCard reutilizável */}
              <StudentCard 
                name="Jane Doe"
                registration="1234567890"
                course="Educação Física"
                sport="Selecionada"
                validUntil="12/2024"
              />
            </div>
          </div>
          
          <div className="carteirinha-scroll-indicator">
            <div className="carteirinha-scroll-arrow">
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <FormSection />

      {/* Schedule Section */}
      <section className="schedule-section">
        <div className="schedule-container">
          <div className="schedule-content">
            <div className="schedule-image">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Estudantes jogando esportes" 
              />
            </div>
            
            <div className="schedule-text">
              <h2 className="schedule-title">
                Veja os horários
                <br />
                disponíveis!
              </h2>
              <button className="schedule-button">
                HORÁRIOS
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carteirinha;