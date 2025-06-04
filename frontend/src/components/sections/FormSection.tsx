import { useState, useEffect } from "react";
import "../sections/styles/FormSection.css";
import Toast from "../ui/Toast";

interface FormSectionProps {
  onCardCreated: () => void;
}

const FormSection = ({ onCardCreated }: FormSectionProps) => {
  const [hasCard, setHasCard] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "error" | "success" } | null>(null);
  const [showForm, setShowForm] = useState(true);

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

  // Chama onCardCreated quando o usuário é autenticado e o toast já sumiu
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setShowForm(false);
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

  const handleNewStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateNewStudentForm()) {
      setToast({ message: "Preencha os dados para criar a carteirinha", type: "error" });
      return;
    }
    // Validação específica para nova carteirinha
    const isValidNewStudent = newStudentData.matricula.length === 7 && 
                             newStudentData.email.endsWith('@edu.unifor.br');
    if (!isValidNewStudent) {
      setToast({ message: "Matrícula deve ter 7 dígitos e email deve ser @edu.unifor.br!", type: "error" });
      return;
    }
    setLoading(true);
    try {
      // Simular envio
      await new Promise(res => setTimeout(res, 1000));
      // Sucesso
      setToast({ message: "Carteirinha criada com sucesso!", type: "success" });
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1200);
    } catch (err) {
      setToast({ message: "Erro ao criar carteirinha. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleExistingStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateExistingStudentForm()) {
      setToast({ message: "Preencha os dados para acessar a carteirinha, fazer reservas e ver suas reservas", type: "error" });
      return;
    }
    // Em produção, aqui seria feita uma chamada para a API
    const isValidStudent = existingStudentData.matricula.length === 7 && 
                          existingStudentData.email.endsWith('@edu.unifor.br');
    if (isValidStudent) {
      setIsAuthenticated(true);
      setToast({ message: "Acesso liberado!", type: "success" });
    } else {
      setToast({ message: "Matrícula ou email inválidos!", type: "error" });
    }
  };

  const resetForm = () => {
    setHasCard(null);
    setIsAuthenticated(false);
    setShowForm(true);
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

  if (!showForm) return null;

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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default FormSection;