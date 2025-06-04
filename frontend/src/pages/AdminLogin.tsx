import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/AdminLogin.css';
import Navbar from '../components/layout/Navbar';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricula: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.senha) {
      setError('Senha é obrigatória');
      return false;
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
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
      // Aqui será a chamada para a API de autenticação
      // Por enquanto, vamos simular uma autenticação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular algumas matrículas válidas para teste
      const validMatriculas = ['730123456', '730987654', '730555666'];
      
      if (validMatriculas.includes(formData.matricula) && formData.senha === 'admin123') {
        // Salvar dados do admin no localStorage (ou usar contexto)
        localStorage.setItem('adminAuth', JSON.stringify({
          matricula: formData.matricula,
          nome: 'Administrador',
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        }));
        
        // Redirecionar para dashboard admin
        navigate('/admin/dashboard');
      } else {
        setError('Matrícula ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
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
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
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

          <div className="login-footer">
            <div className="test-credentials">
              <h4>📋 Credenciais para Teste:</h4>
              <div className="test-item">
                <strong>Matrícula:</strong> 730123456, 730987654, 730555666
              </div>
              <div className="test-item">
                <strong>Senha:</strong> admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;