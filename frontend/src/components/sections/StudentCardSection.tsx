const StudentCardSection = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 shadow-2xl text-white font-sans transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-lg font-bold mb-1">UNIVERSITY</div>
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
            <span className="font-semibold opacity-90">Surname:</span>
            <span>Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold opacity-90">Given Name:</span>
            <span>Jane</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold opacity-90">ID Number:</span>
            <span>1234567890</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold opacity-90">Date of Birth:</span>
            <span>01/01/2000</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold opacity-90">Sport:</span>
            <span>All</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold opacity-90">Card Expires:</span>
            <span>12/31/2024</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-75">Valid ID Card</span>
          <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default StudentCardSection;