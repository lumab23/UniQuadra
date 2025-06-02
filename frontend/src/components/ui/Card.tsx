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
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-sm text-center flex flex-col items-center">
      <div className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg mb-8`}>
        <span className="text-white text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;