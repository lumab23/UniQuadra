import Button from "../ui/Button";
import "../sections/styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      {/* Elementos decorativos */}
      <div className="decorative-element-1"></div>
      <div className="decorative-element-2"></div>
      <div className="decorative-element-3"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          UNIFOR SPORTS
        </h1>
        <p className="hero-description">
          Sua plataforma esportiva completa para uma vida mais ativa e saudável
        </p>
        <div className="hero-buttons">
          <Button variant="white" size="lg">Começar Agora</Button>
          <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;