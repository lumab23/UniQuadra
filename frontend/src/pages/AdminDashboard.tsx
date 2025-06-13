import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/AdminDashboard.css';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';

interface Student {
  _id: string;
  nome: string;
  matricula: string;
  email: string;
  esporte: string;
  carteirinha?: {
    status: string;
    validade: string;
  };
}

interface Reservation {
  id: string;
  studentName: string;
  studentMatricula: string;
  studentEmail: string;
  sport: string;
  court: string;
  date: string;
  dayOfWeek: string;
  timeSlot: string;
  status: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reservas' | 'alunos'>('reservas');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se o admin está autenticado
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }

    loadData();
  }, [navigate, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'reservas') {
        // Carregar reservas
        const reservasResponse = await api.get('/reservas');
        const reservasFromApi = reservasResponse.data;
        
        if (!Array.isArray(reservasFromApi)) {
          throw new Error('Formato de dados inválido para reservas');
        }

        const transformedReservas: Reservation[] = reservasFromApi.map((reserva: any) => {
          try {
            const dataReserva = new Date(reserva.data);
            
            // Verifica se a data é válida
            if (isNaN(dataReserva.getTime())) {
              throw new Error('Data inválida');
            }

            return {
              id: reserva._id || 'ID não encontrado',
              studentName: reserva.matriculas?.[0]?.nome || 'Aluno não encontrado',
              studentMatricula: reserva.matriculas?.[0]?.matricula || 'N/A',
              studentEmail: reserva.matriculas?.[0]?.email || 'N/A',
              sport: reserva.quadra?.modalidade || 'Não especificado',
              court: `Quadra ${reserva.quadra?.modalidade || 'não especificada'}`,
              date: dataReserva.toISOString().split('T')[0],
              dayOfWeek: dataReserva.toLocaleDateString('pt-BR', { weekday: 'long' }),
              timeSlot: dataReserva.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              status: 'ativa',
              createdAt: dataReserva.toISOString()
            };
          } catch (error) {
            console.warn('Erro ao processar data da reserva:', reserva._id, error);
            return {
              id: reserva._id || 'ID não encontrado',
              studentName: 'Erro ao carregar dados',
              studentMatricula: 'N/A',
              studentEmail: 'N/A',
              sport: 'Não especificado',
              court: 'Quadra não especificada',
              date: 'Data inválida',
              dayOfWeek: 'Data inválida',
              timeSlot: 'Horário não especificado',
              status: 'ativa',
              createdAt: new Date().toISOString()
            };
          }
        });

        setReservations(transformedReservas);
      } else {
        // Carregar alunos
        const alunosResponse = await api.get('/alunos');
        const alunosData = alunosResponse.data;

        if (!Array.isArray(alunosData)) {
          throw new Error('Formato de dados inválido para alunos');
        }

        // Para cada aluno, buscar sua carteirinha
        const alunosComCarteirinha = await Promise.all(
          alunosData.map(async (aluno: any) => {
            try {
              const carteirinhaResponse = await api.get(`/carteirinhas/aluno/${aluno._id}`);
              const carteirinha = carteirinhaResponse.data[0]; // Pega a carteirinha mais recente
              
              return {
                _id: aluno._id || 'ID não encontrado',
                nome: aluno.nome || 'Nome não especificado',
                matricula: aluno.matricula || 'N/A',
                email: aluno.email || 'N/A',
                esporte: aluno.esporte || 'Não especificado',
                carteirinha: carteirinha ? {
                  status: carteirinha.status,
                  validade: carteirinha.validade
                } : undefined
              };
            } catch (error) {
              console.warn('Erro ao buscar carteirinha do aluno:', aluno._id, error);
              return {
                _id: aluno._id || 'ID não encontrado',
                nome: aluno.nome || 'Nome não especificado',
                matricula: aluno.matricula || 'N/A',
                email: aluno.email || 'N/A',
                esporte: aluno.esporte || 'Não especificado'
              };
            }
          })
        );

        setStudents(alunosComCarteirinha);
      }
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      setError(error.response?.data?.message || error.message || 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (error) {
      return 'Data inválida';
    }
  };

  const formatDateTime = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString('pt-BR');
    } catch (error) {
      return 'Data/hora inválida';
    }
  };

  const getSportIcon = (sport: string): string => {
    const icons: { [key: string]: string } = {
      'Futsal': '⚽',
      'Basquete': '🏀',
      'Vôlei': '🏐',
      'Campo de areia': '🏖️',
      'Tenis': '🎾'
    };
    return icons[sport] || '🏟️';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Navbar />
      
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div className="header-container">
            <div className="header-left">
              <h1 className="dashboard-title">🏛️ Painel Administrativo</h1>
              <div className="tab-buttons">
                <button 
                  className={`tab-button ${activeTab === 'reservas' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reservas')}
                >
                  📅 Reservas
                </button>
                <button 
                  className={`tab-button ${activeTab === 'alunos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('alunos')}
                >
                  👥 Alunos
                </button>
              </div>
            </div>
            <div className="header-right">
              <button 
                onClick={handleLogout}
                className="logout-button"
                title="Sair do painel administrativo"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Carregando dados...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>❌ {error}</p>
              <button onClick={loadData} className="btn-primary">
                🔄 Tentar novamente
              </button>
            </div>
          ) : (
            <div className="table-container">
              {activeTab === 'reservas' ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Modalidade</th>
                      <th>Local</th>
                      <th>Data/Hora</th>
                      <th>Status</th>
                      <th>Criada em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                          Nenhuma reserva encontrada
                        </td>
                      </tr>
                    ) : (
                      reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td>
                            <div className="student-info">
                              <div className="student-name">{reservation.studentName}</div>
                              <div className="student-details">
                                {reservation.studentMatricula} • {reservation.studentEmail}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="sport-info">
                              <span className="sport-icon">{getSportIcon(reservation.sport)}</span>
                              {reservation.sport}
                            </div>
                          </td>
                          <td>{reservation.court}</td>
                          <td>
                            <div className="datetime-info">
                              <div className="date-info">{reservation.dayOfWeek}</div>
                              <div className="time-info">{formatDate(reservation.date)} • {reservation.timeSlot}</div>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${reservation.status}`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </td>
                          <td>{formatDateTime(reservation.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Matrícula</th>
                      <th>Email</th>
                      <th>Modalidade</th>
                      <th>Status da Carteirinha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                          Nenhum aluno encontrado
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <tr key={student._id}>
                          <td>{student.nome}</td>
                          <td>{student.matricula}</td>
                          <td>{student.email}</td>
                          <td>
                            <div className="sport-info">
                              <span className="sport-icon">{getSportIcon(student.esporte)}</span>
                              {student.esporte}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${student.carteirinha?.status || 'inativa'}`}>
                              {student.carteirinha ? (
                                <>
                                  {student.carteirinha.status.charAt(0).toUpperCase() + student.carteirinha.status.slice(1)}
                                  <br />
                                  <small>Válida até: {formatDate(student.carteirinha.validade)}</small>
                                </>
                              ) : (
                                'Sem carteirinha'
                              )}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;