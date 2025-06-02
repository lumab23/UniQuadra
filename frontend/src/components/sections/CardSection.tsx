import Button from "../ui/Button";

const CardSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Faça sua Carteirinha Digital!
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Crie sua identificação estudantil digital e tenha acesso a todos os espaços esportivos da Unifor de forma prática e segura.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-blue-100">Acesso a todas as modalidades</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-blue-100">Reserva de quadras prioritária</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-blue-100">Identificação sempre disponível</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="white" size="lg">
                Criar Carteirinha
              </Button>
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Saiba Mais
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 shadow-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-lg font-bold mb-1">UNIFOR</div>
                  <div className="text-sm font-semibold opacity-90">STUDENT ID</div>
                </div>
                <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm"></div>
              </div>

              <div className="flex gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>

                <div className="text-sm space-y-2 flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-90">Nome:</span>
                    <span>João Silva</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-90">Matrícula:</span>
                    <span>2024001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-90">Curso:</span>
                    <span>Engenharia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-90">Esporte:</span>
                    <span>Todos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold opacity-90">Válida até:</span>
                    <span>12/2025</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-75">Carteira Válida</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;