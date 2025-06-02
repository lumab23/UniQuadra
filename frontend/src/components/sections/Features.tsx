import Card from "../ui/Card";

const Features = () => {
  const features = [
    {
      icon: "📅",
      title: "Horário das Quadras",
      description: "Consulte a disponibilidade das quadras em tempo real e faça sua reserva de forma rápida e fácil.",
    },
    {
      icon: "🆔",
      title: "Carteirinha Digital",
      description: "Tenha sua identificação estudantil sempre à mão com nossa carteirinha 100% digital.",
    },
    {
      icon: "🏓",
      title: "Modalidades Esportivas",
      description: "Descubra todas as modalidades disponíveis e encontre o esporte perfeito para você.",
    },
  ];

  return (
    <section className="min-h-[40vh] py-16 bg-gradient-to-r from-blue-800 to-blue-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Recursos Principais
          </h2>
        </div>
        
        {/* Espaçamento */}
        <div className="h-8"></div>
        
        {/* Descrição */}
        <div className="text-center">
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tudo que você precisa para aproveitar ao máximo o esporte na Unifor
          </p>
        </div>
        
        {/* Espaçamento */}
        <div className="h-16"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
          {features.map((feature, index) => (
            <div key={index} className="p-4">
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;