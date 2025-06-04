import { useState, useEffect } from "react";
import "../sections/styles/FormSection.css";

interface FormSectionProps {
  onCardCreated: () => void;
}

const FormSection = ({ onCardCreated }: FormSectionProps) => {
  const [hasCard, setHasCard] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [newStudentData, setNewStudentData] = useState({
    nome: "",
    email: "",
    matricula: "",
    esporte: "Campo de Areia"
  });

  const [existingStudentData, setExistingStudentData] = useState({
    matricula: "",
    email: ""
  });

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Fecha após 3 segundos

      // Limpa o timer se o componente for desmontado ou o popup for fechado manualmente
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Chama onCardCreated quando o usuário é autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        onCardCreated();
      }, 2000); // Aguarda 2 segundos para mostrar a mensagem de sucesso

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, onCardCreated]);

  const handleNewStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExistingStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExistingStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateNewStudentForm = () => {
    const { nome, email, matricula } = newStudentData;
    return nome.trim() !== "" && email.trim() !== "" && matricula.trim() !== "";
  };

  const validateExistingStudentForm = () => {
    const { matricula, email } = existingStudentData;
    return matricula.trim() !== "" && email.trim() !== "";
  };

  const handleNewStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateNewStudentForm()) {
      setPopupMessage("Preencha os dados para criar a carteirinha");
      setShowPopup(true);
      return;
    }
    
    // Validação específica para nova carteirinha
    const isValidNewStudent = newStudentData.matricula.length === 7 && 
                             newStudentData.email.endsWith('@edu.unifor.br');
    
    if (!isValidNewStudent) {
      setPopupMessage("Matrícula deve ter 7 dígitos e email deve ser @edu.unifor.br!");
      setShowPopup(true);
      return;
    }
    
    console.log("Dados do novo estudante:", newStudentData);
    // Lógica para criar nova carteirinha
    setIsAuthenticated(true);
  };

  const handleExistingStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateExistingStudentForm()) {
      setPopupMessage("Preencha os dados para acessar a carteirinha, fazer reservas e ver suas reservas");
      setShowPopup(true);
      return;
    }
    
    console.log("Dados do estudante existente:", existingStudentData);
    
    // Em produção, aqui seria feita uma chamada para a API
    const isValidStudent = existingStudentData.matricula.length === 7 && 
                          existingStudentData.email.endsWith('@edu.unifor.br');
    
    if (isValidStudent) {
      setIsAuthenticated(true);
      console.log("Estudante autenticado com sucesso!");
    } else {
      setPopupMessage("Matrícula ou email inválidos!");
      setShowPopup(true);
    }
  };

  const resetForm = () => {
    setHasCard(null);
    setIsAuthenticated(false);
    setNewStudentData({
      nome: "",
      email: "",
      matricula: "",
      esporte: "Campo de Areia"
    });
    setExistingStudentData({
      matricula: "",
      email: ""
    });
  };

  // Se o usuário foi autenticado, retorna um indicador
  if (isAuthenticated) {
    return (
      <section className="success-section">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2 className="success-title">
              {hasCard ? "Acesso Liberado!" : "Carteirinha Criada!"}
            </h2>
            <p className="success-message">
              {hasCard 
                ? "Sua carteirinha foi verificada com sucesso." 
                : "Sua carteirinha foi criada com sucesso!"
              }
            </p>
            <p className="success-message">
              Aguarde alguns segundos...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section">
      <div className="container">
        {hasCard === null ? (
          // Pergunta inicial
          <div>
            <h2 className="main-title">
              Acesso à Carteirinha
            </h2>
            <div className="initial-card">
              <p className="initial-question">
                Você já tem sua Carteirinha?
              </p>
              <div className="button-group">
                <button 
                  onClick={() => setHasCard(true)}
                  className="option-button option-button--yes"
                >
                  <span>✓</span>
                  Sim, já tenho
                </button>
                <button 
                  onClick={() => setHasCard(false)}
                  className="option-button option-button--no"
                >
                  <span>✗</span>
                  Não, quero fazer
                </button>
              </div>
            </div>
          </div>
        ) : hasCard ? (
          // Formulário para quem já tem carteirinha
          <div>
            <div className="back-nav">
              <button 
                onClick={resetForm}
                className="back-button"
              >
                ← Voltar
              </button>
            </div>
            <h2 className="main-title">
              Acesso com Carteirinha
            </h2>
            
            <div className="form-card">
              <div className="input-group">
                <input
                  type="text"
                  name="matricula"
                  placeholder="Matrícula (ex: 2320312)"
                  value={existingStudentData.matricula}
                  onChange={handleExistingStudentChange}
                  className="form-input"
                  required
                />
                <small className="input-hint">
                  Digite sua matrícula de 7 dígitos
                </small>
              </div>
              
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail institucional (@edu.unifor.br)"
                  value={existingStudentData.email}
                  onChange={handleExistingStudentChange}
                  className="form-input"
                  required
                />
                <small className="input-hint">
                  Use seu email institucional da Unifor
                </small>
              </div>
              
              <button 
                onClick={handleExistingStudentSubmit}
                className={`submit-button submit-button--green ${!validateExistingStudentForm() ? 'submit-button--disabled' : ''}`}
                disabled={!validateExistingStudentForm()}
              >
                ACESSAR CARTEIRINHA
              </button>
            </div>
          </div>
        ) : (
          // Formulário para nova carteirinha
          <div>
            <div className="back-nav">
              <button 
                onClick={resetForm}
                className="back-button"
              >
                ← Voltar
              </button>
            </div>
            <h2 className="main-title">
              Nova Carteirinha
            </h2>
            
            <div className="form-card">
              <div className="input-group">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  value={newStudentData.nome}
                  onChange={handleNewStudentChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail institucional (@edu.unifor.br)"
                  value={newStudentData.email}
                  onChange={handleNewStudentChange}
                  className="form-input"
                  required
                />
                <small className="input-hint">
                  Use seu email institucional da Unifor
                </small>
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  name="matricula"
                  placeholder="Matrícula (ex: 2320312)"
                  value={newStudentData.matricula}
                  onChange={handleNewStudentChange}
                  className="form-input"
                  required
                />
                <small className="input-hint">
                  Digite sua matrícula de 7 dígitos
                </small>
              </div>
              
              <div className="input-group">
                <label className="select-label">
                  Escolha seus esportes
                </label>
                <select
                  name="esporte"
                  value={newStudentData.esporte}
                  onChange={handleNewStudentChange}
                  className="form-select"
                >
                  <option value="Campo de Areia">Campo de Areia</option>
                  <option value="Futebol">Futebol</option>
                  <option value="Basquete">Basquete</option>
                  <option value="Vôlei">Vôlei</option>
                  <option value="Tênis">Tênis</option>
                  <option value="Natação">Natação</option>
                  <option value="Todas as modalidades">Todas as modalidades</option>
                </select>
              </div>
              
              <button 
                onClick={handleNewStudentSubmit}
                className={`submit-button submit-button--blue ${!validateNewStudentForm() ? 'submit-button--disabled' : ''}`}
                disabled={!validateNewStudentForm()}
              >
                CRIAR CARTEIRINHA
              </button>
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-icon">⚠️</div>
            <p className="popup-message">{popupMessage}</p>
            <button 
              onClick={() => setShowPopup(false)}
              className="popup-close-button"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FormSection;