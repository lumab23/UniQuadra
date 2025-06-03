import React from 'react';
import '../sections/styles/Card.css';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

const Card = ({
  icon,
  title,
  description,
  gradient = "from-blue-600 to-blue-700",
}: CardProps) => {
  return (
    <div className="card">
      <div className={`card-icon ${gradient}`}>
        <span className="card-icon-content">{icon}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;