import { useState } from "react";
import "../sections/styles/FormSection.css";

const FormSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    matricula: "",
    esporte: "Campo de Areia"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // lógica para enviar dados
  };

  return (
    <section className="form-section">
      <div className="form-container">
        <h2 className="form-title">Formulário</h2>
        
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="matricula"
              placeholder="Matrícula"
              value={formData.matricula}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Escolha seus esportes</label>
            <select
              name="esporte"
              value={formData.esporte}
              onChange={handleInputChange}
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
          
          <button type="submit" className="form-submit-btn">
            ENVIAR
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;