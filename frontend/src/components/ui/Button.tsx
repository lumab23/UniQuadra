
interface ButtonProps {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

// Componente Button reutilizável
const Button = ({ children, variant = "primary", size = "md", onClick, className = "" }: React.PropsWithChildren<ButtonProps>) => {
  const baseClasses = "font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 rounded-xl";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl focus:ring-blue-300",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300",
    white: "bg-white text-blue-800 hover:bg-gray-100 shadow-md hover:shadow-lg focus:ring-white"
  };
  
  const sizes = {
    sm: "px-5 py-2.5 text-sm",    
    md: "px-7 py-3.5 text-base",  
    lg: "px-9 py-5 text-lg"  
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;