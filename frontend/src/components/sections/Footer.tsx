const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl">UNIFOR SPORTS</span>
            </div>
            <p className="text-gray-300">
              Promovendo o esporte e a qualidade de vida na comunidade universitária.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Modalidades</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Reservar Quadra</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Carteirinha</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 Universidade de Fortaleza</p>
              <p>📞 (85) 3477-3000</p>
              <p>✉️ esportes@unifor.br</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 UNIFOR SPORTS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;