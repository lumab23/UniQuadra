import { useRef } from "react";
import { Clock, CreditCard, Activity } from "lucide-react";
import Card from "../ui/Card";
import "../sections/styles/Features.css";
import useGsapFadeInOnScroll from "../utils/useGsapFadeInOnScroll";

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGsapFadeInOnScroll(sectionRef);

  const features = [
    {
      icon: <Clock size={32} />,
      title: "Horário das Quadras",
      description: "Consulte a disponibilidade das quadras em tempo real e faça sua reserva de forma rápida e fácil.",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: <CreditCard size={32} />,
      title: "Carteirinha Digital",
      description: "Tenha sua identificação estudantil sempre à mão com nossa carteirinha 100% digital.",
      gradient: "from-purple-600 to-purple-700"
    },
    {
      icon: <Activity size={32} />,
      title: "Modalidades Esportivas",
      description: "Descubra todas as modalidades disponíveis e encontre o esporte perfeito para você.",
      gradient: "from-green-600 to-green-700"
    },
  ];

  return (
    <section ref={sectionRef} className="features-section">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <h2 className="features-title">
            Recursos Principais
          </h2>
          <p className="features-description">
            Tudo que você precisa para aproveitar ao máximo o esporte na Unifor
          </p>
        </div>

        {/* Cards */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card-wrapper">
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;