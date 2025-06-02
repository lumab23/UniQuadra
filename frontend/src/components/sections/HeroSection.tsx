import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[50vh] bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl mb-6 animate-fade-in">
          UNIFOR SPORTS
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Sua plataforma esportiva completa para uma vida mais ativa e saudável
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
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