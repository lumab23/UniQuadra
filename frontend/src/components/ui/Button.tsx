import "../sections/styles/Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

// Componente Button reutilizável
const Button = ({ children, variant = "primary", size = "md", onClick, className = "" }: React.PropsWithChildren<ButtonProps>) => {
  const buttonClasses = `button button-${variant} button-${size} ${className}`;
  
  return (
    <button 
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;