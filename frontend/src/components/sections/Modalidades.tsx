import { useState } from "react";
import Button from "../ui/Button";
import "../sections/styles/Modalidades.css";

const Modalidades = () => {
  const [showAll, setShowAll] = useState(false);

  const modalidadesPrincipais = [
    {
      nome: "Natação",
      emoji: "🏊‍♀️",
      color: "blue",
      description: "Piscina olímpica aquecida"
    },
    {
      nome: "Basquete",
      emoji: "🏀",
      color: "orange",
      description: "Quadras profissionais"
    },
    {
      nome: "Vôlei de Praia",
      emoji: "🏐",
      color: "yellow",
      description: "Areia de qualidade"
    },
    {
      nome: "Futebol",
      emoji: "⚽",
      color: "green",
      description: "Campo oficial"
    },
  ];

  const modalidadesExtras = [
    {
      nome: "Atletismo",
      emoji: "🏃‍♂️",
      color: "red",
      description: "Pista oficial de atletismo"
    },
    {
      nome: "Beach Tennis",
      emoji: "🏸",
      color: "purple",
      description: "Quadras de areia"
    },
    {
      nome: "Tênis",
      emoji: "🎾",
      color: "pink",
      description: "Quadras de saibro"
    },
    {
      nome: "Vôlei",
      emoji: "🏐",
      color: "teal",
      description: "Quadras cobertas"
    },
  ];

  const modalidadesParaExibir = showAll 
    ? [...modalidadesPrincipais, ...modalidadesExtras] 
    : modalidadesPrincipais;

  return (
    <section id="modalidades" className="modalidades-section">
      <div className="modalidades-container">
        {/* Header */}
        <div className="modalidades-header">
          <h2 className="modalidades-title">
            Modalidades Esportivas
          </h2>
          <p className="modalidades-description">
            Explore todas as modalidades disponíveis e encontre sua paixão
          </p>
        </div>

        {/* Cards das Modalidades */}
        <div className="modalidades-grid">
          {modalidadesParaExibir.map((modalidade, index) => (
            <div key={index} className="modalidades-card">
              <div className={`modalidades-card-circle modalidades-${modalidade.color}`}>
                <span className="modalidades-emoji">{modalidade.emoji}</span>
              </div>
              <h3 className="modalidades-card-title">
                {modalidade.nome}
              </h3>
              <p className="modalidades-card-description">{modalidade.description}</p>
            </div>
          ))}
        </div>

        {/* Botão */}
        <div className="modalidades-button-container">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Ver Menos" : "Ver Todas as Modalidades"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Modalidades;