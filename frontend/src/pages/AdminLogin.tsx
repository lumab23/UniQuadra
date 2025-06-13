import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/AdminLogin.css';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricula: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Para matrícula, permitir apenas números e limitar a 9 dígitos
    if (name === 'matricula') {
      const numericValue = value.replace(/\D/g, '').slice(0, 9);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpar erro quando usuário começar a digitar
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.matricula) {
      setError('Matrícula é obrigatória');
      return false;
    }

    if (formData.matricula.length !== 9) {
      setError('Matrícula deve ter 9 dígitos');
      return false;
    }

    if (!formData.matricula.startsWith('730')) {
      setError('Matrícula de funcionário deve começar com 730');
      return false;
    }

    if (!formData.email) {
      setError('Email é obrigatório');
      return false;
    }

    if (!formData.email.endsWith('@unifor.br')) {
      setError('Email deve ser do domínio @unifor.br');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Buscar administrador pela matrícula
      const response = await api.get(`/administrador/matricula/${formData.matricula}`);
      
      if (response.data && response.data.email === formData.email) {
        localStorage.setItem('adminAuth', JSON.stringify({
          matricula: response.data.matricula,
          nome: response.data.nome,
          email: response.data.email,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        }));
        
        navigate('/admin/dashboard');
      } else {
        setError('Matrícula ou email incorretos');
      }
    } catch (err) {
      setError('Matrícula ou email incorretos');
    } finally {
      setLoading(false);
    }
  };

  const formatMatricula = (value: string): string => {
    // Formatar como 730.123.456
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Navbar />
      
      <div className="admin-login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="admin-icon">
              <span>🔐</span>
            </div>
            <h1 className="login-title">Acesso Administrativo</h1>
            <p className="login-subtitle">Unifor Sports Online</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="matricula" className="form-label">
                Matrícula do Funcionário
              </label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="matricula"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleInputChange}
                  placeholder="730.000.000"
                  className="form-input"
                  maxLength={9}
                />
                <div className="input-display">
                  {formData.matricula && formatMatricula(formData.matricula)}
                </div>
              </div>
              <div className="form-hint">
                Matrícula deve começar com 730 e ter 9 dígitos
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Institucional
              </label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu.email@unifor.br"
                  className="form-input"
                />
              </div>
              <div className="form-hint">
                Use seu email institucional @unifor.br
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Autenticando...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Entrar no Sistema
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;