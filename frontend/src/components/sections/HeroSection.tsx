import Button from "../ui/Button";
import "../sections/styles/HeroSection.css";
import { useRef } from "react";
import useGsapFadeInOnScroll from "../utils/useGsapFadeInOnScroll";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapFadeInOnScroll(sectionRef);

  const handleStartClick = () => {
    const el = document.querySelector('#card-section');
    if (el) {
      const navbarHeight = 80;
      const y = (el as HTMLElement).offsetTop - navbarHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-overlay"></div>
      
      {/* Elementos decorativos */}
      <div className="decorative-element-1"></div>
      <div className="decorative-element-2"></div>
      <div className="decorative-element-3"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          UniQuadra
        </h1>
        <p className="hero-description">
          Sua plataforma esportiva completa para uma vida mais ativa e saudável
        </p>
        <div className="hero-buttons">
          <Button variant="white" size="lg" onClick={handleStartClick}>Começar Agora</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;