import Navbar from "../components/layout/Navbar";
import FormSection from "../components/sections/FormSection";
import StudentCard from "../components/sections/StudentCard";
import "../pages/styles/Carteirinha.css";
import HorarioSemanal from "../pages/HorarioSemanal";
import { useState } from "react";

const Carteirinha = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [cardCreated, setCardCreated] = useState(false); // Estado para controlar se a carteirinha foi criada

  if (showSchedule) {
    return <HorarioSemanal />;
  }

  // Função para simular a criação da carteirinha
  const handleCardCreation = () => {
    setCardCreated(true);
  };

  return (
    <div className={`carteirinha-main-page ${cardCreated ? 'carteirinha-card-created' : ''}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section id="carteirinha" className="carteirinha-main-hero-section">
        <div className="carteirinha-main-hero-container">
          <div className="carteirinha-main-hero-content">
            <div className="carteirinha-main-hero-text">
              <p className="carteirinha-main-hero-subtitle">
                {cardCreated ? "Parabéns!" : "Um passo para a sua carteirinha!"}
              </p>
              <h1 className="carteirinha-main-hero-title">
                {cardCreated ? (
                  <>
                    Agora você tem sua
                    <br />
                    carteira, aproveite!!
                  </>
                ) : (
                  <>
                    Preencha os dados
                    <br />
                    a baixo
                  </>
                )}
              </h1>
            </div>
            
            <div className="carteirinha-main-hero-card">
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
          
          <div className="carteirinha-main-scroll-indicator">
            <div className="carteirinha-main-scroll-arrow">
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - só mostra se a carteirinha não foi criada */}
      {!cardCreated && <FormSection onCardCreated={handleCardCreation} />}

      {/* Schedule Section - só mostra se a carteirinha foi criada */}
      {cardCreated && (
        <section className="carteirinha-main-schedule-section">
          <div className="carteirinha-main-schedule-container">
            <div className="carteirinha-main-schedule-content">
              <div className="carteirinha-main-schedule-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Estudantes jogando esportes" 
                />
              </div>
              
              <div className="carteirinha-main-schedule-text">
                <h2 className="carteirinha-main-schedule-title">
                  Reservar espaço
                </h2>
                <button className="carteirinha-main-schedule-button" onClick={() => setShowSchedule(true)}>
                  HORÁRIOS
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Carteirinha;