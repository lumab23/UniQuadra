import Navbar from "../components/layout/Navbar";
import FormSection from "../components/sections/FormSection";
import StudentCard from "../components/sections/StudentCard";
import "../pages/styles/Carteirinha.css";
import HorarioSemanal from "../pages/HorarioSemanal";
import { useState, useRef, useEffect } from "react";
import useGsapFadeInOnScroll from "../components/utils/useGsapFadeInOnScroll";
import gsap from "gsap";

const Carteirinha = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [cardCreated, setCardCreated] = useState(false); // Estado para controlar se a carteirinha foi criada

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGsapFadeInOnScroll(heroRef);
  useGsapFadeInOnScroll(formRef);
  useGsapFadeInOnScroll(scheduleRef);

  // Animação especial ao criar a carteirinha
  useEffect(() => {
    if (cardCreated && heroRef.current) {
      // Anima o fundo para verde
      gsap.to(heroRef.current, {
        background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
        duration: 1.2,
        ease: "power2.inOut"
      });
      // Anima o texto e o cartão
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.35, ease: "power3.out" }
        );
      }
    }
  }, [cardCreated]);

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
      <section id="carteirinha" className="carteirinha-main-hero-section" ref={heroRef}>
        <div className="carteirinha-main-hero-container">
          <div className="carteirinha-main-hero-content">
            <div className="carteirinha-main-hero-text" ref={textRef}>
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
            
            <div className="carteirinha-main-hero-card" ref={cardRef}>
              {/* Usar o componente StudentCard reutilizável */}
              <StudentCard 
                name="Jane Doe"
                registration="1234567890"
                sport="Selecionada"
                validUntil="12/2024"
                className={cardCreated ? "carteirinha-main-student-id-card" : "student-id-card"}
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
      {!cardCreated && (
        <div ref={formRef}>
          <FormSection onCardCreated={handleCardCreation} />
        </div>
      )}

      {/* Schedule Section - só mostra se a carteirinha foi criada */}
      {cardCreated && (
        <section className="carteirinha-main-schedule-section" ref={scheduleRef}>
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