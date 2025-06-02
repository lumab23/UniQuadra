import Button from "../ui/Button";

const Modalidades = () => {
  const modalidades = [
    {
      nome: "Natação",
      emoji: "🏊‍♀️",
      color: "from-blue-400 to-blue-600",
      description: "Piscina olímpica aquecida"
    },
    {
      nome: "Basquete",
      emoji: "🏀",
      color: "from-orange-400 to-orange-600",
      description: "Quadras profissionais"
    },
    {
      nome: "Vôlei de Praia",
      emoji: "🏐",
      color: "from-yellow-400 to-yellow-600",
      description: "Areia de qualidade"
    },
    {
      nome: "Futebol",
      emoji: "⚽",
      color: "from-green-400 to-green-600",
      description: "Campo oficial"
    },
  ];

  return (
    <section className="py-8 bg-gray-50 flex flex-col justify-center items-center min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Modalidades Esportivas
          </h2>
        </div>

        {/* Espaçamento */}
        <div className="h-6"></div>

        {/* Descrição */}
        <div className="text-center">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore todas as modalidades disponíveis e encontre sua paixão
          </p>
        </div>

        {/* Espaçamento */}
        <div className="h-16"></div>

        {/* Cards das Modalidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {modalidades.map((modalidade, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-40 h-40 bg-gradient-to-br ${modalidade.color} rounded-full shadow-2xl flex items-center justify-center text-6xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl mb-4`}>
                <span className="drop-shadow-lg">{modalidade.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {modalidade.nome}
              </h3>
              <p className="text-sm text-gray-500 text-center">{modalidade.description}</p>
            </div>
          ))}
        </div>

        {/* Espaçamento */}
        <div className="h-12"></div>

        {/* Botão */}
        <div className="text-center">
          <Button variant="secondary" size="lg">
            Ver Todas as Modalidades
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Modalidades;