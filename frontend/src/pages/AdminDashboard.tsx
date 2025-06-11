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
  curso: string;
  status: string;
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
  status: 'ativa' | 'cancelada' | 'concluida';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reservas' | 'alunos'>('reservas');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedSport, setSelectedSport] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sports = ['Todos', 'Futsal', 'Natação', 'Basquete', 'Vôlei', 'Futebol', 'Tênis', 'Atletismo', 'Beach Tennis', 'Vôlei de Praia'];
  const statusOptions = ['Todos', 'ativa', 'cancelada', 'concluida'];

  useEffect(() => {
    // Verificar se o admin está autenticado
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Carregar reservas
      const reservasResponse = await api.get('/reservas');
      const reservasFromApi = reservasResponse.data;
      
      const transformedReservas: Reservation[] = reservasFromApi.map((reserva: any) => {
        try {
          const dataReserva = new Date(reserva.data);
          
          // Verifica se a data é válida
          if (isNaN(dataReserva.getTime())) {
            throw new Error('Data inválida');
          }

          return {
            id: reserva._id,
            studentName: reserva.matriculas[0]?.nome || 'Aluno não encontrado',
            studentMatricula: reserva.matriculas[0]?.matricula || 'N/A',
            studentEmail: reserva.matriculas[0]?.email || 'N/A',
            sport: reserva.quadra?.modalidade || 'Não especificado',
            court: `Quadra ${reserva.quadra?.modalidade || 'não especificada'}`,
            date: dataReserva.toISOString().split('T')[0],
            dayOfWeek: dataReserva.toLocaleDateString('pt-BR', { weekday: 'long' }),
            timeSlot: dataReserva.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'ativa',
            createdAt: dataReserva.toISOString()
          };
        } catch (error) {
          // Se houver erro no processamento da data, retorna um objeto com dados padrão
          console.warn('Erro ao processar data da reserva:', reserva._id, error);
          return {
            id: reserva._id,
            studentName: reserva.matriculas[0]?.nome || 'Aluno não encontrado',
            studentMatricula: reserva.matriculas[0]?.matricula || 'N/A',
            studentEmail: reserva.matriculas[0]?.email || 'N/A',
            sport: reserva.quadra?.modalidade || 'Não especificado',
            court: `Quadra ${reserva.quadra?.modalidade || 'não especificada'}`,
            date: 'Data inválida',
            dayOfWeek: 'Data inválida',
            timeSlot: 'Horário não especificado',
            status: 'ativa',
            createdAt: new Date().toISOString() // Usa a data atual como fallback
          };
        }
      });

      console.log('Reservas carregadas:', reservasFromApi);
      console.log('Reservas transformadas:', transformedReservas);
      
      setReservations(transformedReservas);

      // Carregar alunos
      const alunosResponse = await api.get('/alunos');
      setStudents(alunosResponse.data);

    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      setError('Não foi possível carregar os dados. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const getSportIcon = (sport: string): string => {
    const icons: { [key: string]: string } = {
      'Futsal': '⚽',
      'Natação': '🏊‍♀️',
      'Basquete': '🏀',
      'Vôlei de Praia': '🏐',
      'Futebol': '⚽',
      'Atletismo': '🏃‍♂️',
      'Beach Tennis': '🏸',
      'Tênis': '🎾',
      'Vôlei': '🏐'
    };
    return icons[sport] || '🏟️';
  };

  const getStatusIcon = (status: string): string => {
    const icons: { [key: string]: string } = {
      'ativa': '✅',
      'cancelada': '❌',
      'concluida': '✔️'
    };
    return icons[status] || '❓';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getFilteredReservations = (): Reservation[] => {
    return reservations.filter(reservation => {
      const matchesSport = selectedSport === 'Todos' || reservation.sport === selectedSport;
      const matchesStatus = selectedStatus === 'Todos' || reservation.status === selectedStatus;
      const matchesSearch = searchTerm === '' || 
        reservation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.studentMatricula.includes(searchTerm) ||
        reservation.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSport && matchesStatus && matchesSearch;
    });
  };

  const getFilteredStudents = (): Student[] => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' ||
        student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricula.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.curso.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const cancelReservation = (reservationId: string) => {
    setReservations(prev => 
      prev.map(res => 
        res.id === reservationId 
          ? { ...res, status: 'cancelada' as const }
          : res
      )
    );
  };

  const openStudentModal = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const filteredReservations = getFilteredReservations();
  const filteredStudents = getFilteredStudents();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Navbar />
      
      <div className="admin-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-container">
            <div className="header-left">
              <h1 className="dashboard-title">🏛️ Painel Administrativo</h1>
              <p className="dashboard-subtitle">Gestão de Reservas e Alunos</p>
            </div>
            
            <div className="header-actions">
              <button 
                className="btn-danger"
                onClick={() => setShowLogoutModal(true)}
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Navegação por Tabs */}
          <div className="tabs-container">
            <button
              className={`tab-button ${activeTab === 'reservas' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservas')}
            >
              📋 Reservas ({reservations.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'alunos' ? 'active' : ''}`}
              onClick={() => setActiveTab('alunos')}
            >
              🎓 Alunos ({students.length})
            </button>
          </div>

          {/* Filtros */}
          <div className="filters-container">
            <div className="search-container">
              <input
                type="text"
                placeholder={activeTab === 'reservas' ? 'Buscar por aluno, matrícula ou email...' : 'Buscar aluno...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {activeTab === 'reservas' && (
              <>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="filter-select"
                >
                  {sports.map(sport => (
                    <option key={sport} value={sport}>
                      {sport === 'Todos' ? '🏟️ Todas as Modalidades' : `${getSportIcon(sport)} ${sport}`}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-select"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'Todos' ? '📊 Todos os Status' : `${getStatusIcon(status)} ${status.charAt(0).toUpperCase() + status.slice(1)}`}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Conteúdo das Tabs */}
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
            <>
              {activeTab === 'reservas' && (
                <div className="reservations-content">
                  <div className="reservations-stats">
                    <div className="stat-card">
                      <span className="stat-icon">✅</span>
                      <div className="stat-info">
                        <span className="stat-number">{reservations.filter(r => r.status === 'ativa').length}</span>
                        <span className="stat-label">Ativas</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">❌</span>
                      <div className="stat-info">
                        <span className="stat-number">{reservations.filter(r => r.status === 'cancelada').length}</span>
                        <span className="stat-label">Canceladas</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">✔️</span>
                      <div className="stat-info">
                        <span className="stat-number">{reservations.filter(r => r.status === 'concluida').length}</span>
                        <span className="stat-label">Concluídas</span>
                      </div>
                    </div>
                  </div>

                  <div className="reservations-table">
                    {filteredReservations.length === 0 ? (
                      <div className="empty-state">
                        <span className="empty-icon">📝</span>
                        <h3>Nenhuma reserva encontrada</h3>
                        <p>Não há reservas que correspondam aos filtros selecionados.</p>
                      </div>
                    ) : (
                      <div className="table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Aluno</th>
                              <th>Modalidade</th>
                              <th>Local</th>
                              <th>Data/Hora</th>
                              <th>Status</th>
                              <th>Criada em</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredReservations.map((reservation) => (
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
                                    {getStatusIcon(reservation.status)} {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                  </span>
                                </td>
                                <td>{formatDateTime(reservation.createdAt)}</td>
                                <td>
                                  <div className="action-buttons">
                                    {reservation.status === 'ativa' && (
                                      <button
                                        className="btn-cancel"
                                        onClick={() => cancelReservation(reservation.id)}
                                        title="Cancelar reserva"
                                      >
                                        ❌
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'alunos' && (
                <div className="students-content">
                  <div className="students-stats">
                    <div className="stat-card">
                      <span className="stat-icon">👥</span>
                      <div className="stat-info">
                        <span className="stat-number">{students.length}</span>
                        <span className="stat-label">Total de Alunos</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">✅</span>
                      <div className="stat-info">
                        <span className="stat-number">{students.filter(s => s.status.toLowerCase() === 'ativo').length}</span>
                        <span className="stat-label">Ativos</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">⏸️</span>
                      <div className="stat-info">
                        <span className="stat-number">{students.filter(s => s.status.toLowerCase() === 'inativo').length}</span>
                        <span className="stat-label">Inativos</span>
                      </div>
                    </div>
                  </div>

                  <div className="students-grid">
                    {filteredStudents.length === 0 ? (
                      <div className="empty-state">
                        <span className="empty-icon">🎓</span>
                        <h3>Nenhum aluno encontrado</h3>
                        <p>Não há alunos que correspondam à busca realizada.</p>
                      </div>
                    ) : (
                      filteredStudents.map((student) => (
                        <div key={student._id} className={`student-card ${student.status.toLowerCase() === 'inativo' ? 'inactive' : ''}`}>
                          <div className="student-photo">
                            <img src={student.foto} alt={student.nome} />
                            <div className={`status-indicator ${student.status.toLowerCase() === 'ativo' ? 'active' : 'inactive'}`}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </div>
                          </div>
                          
                          <div className="student-info">
                            <h3 className="student-name">{student.nome}</h3>
                            <div className="student-details">
                              <div className="detail-item">
                                <span className="detail-label">Matrícula:</span>
                                <span className="detail-value">{student.matricula}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{student.email}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Curso:</span>
                                <span className="detail-value">{student.curso}</span>
                              </div>
                            </div>

                            <button
                              className="btn-primary"
                              onClick={() => openStudentModal(student)}
                            >
                              👁️ Ver Carteirinha
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal da Carteirinha */}
        {showStudentModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal student-modal">
              <div className="modal-header">
                <h3>🎓 Carteirinha do Aluno</h3>
                <button 
                  className="modal-close" 
                  onClick={() => setShowStudentModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="student-card-content">
                <div className="card-header">
                  <div className="university-logo">🏛️</div>
                  <div className="university-info">
                    <h2>UNIFOR</h2>
                    <p>Universidade de Fortaleza</p>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="student-photo-large">
                    <img src={selectedStudent.foto} alt={selectedStudent.nome} />
                  </div>
                  
                  <div className="student-info-detailed">
                    <h3 className="student-name-large">{selectedStudent.nome}</h3>
                    
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Matrícula:</span>
                        <span className="info-value">{selectedStudent.matricula}</span>
                      </div>
                      
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{selectedStudent.email}</span>
                      </div>
                      
                      <div className="info-item">
                        <span className="info-label">Curso:</span>
                        <span className="info-value">{selectedStudent.curso}</span>
                      </div>
                    </div>
                    
                    <div className="sports-section">
                      <h4>Modalidades Autorizadas:</h4>
                      <div className="sports-grid">
                        {selectedStudent.modalidades.map((modalidade, index) => (
                          <div key={index} className="sport-item">
                            <span className="sport-icon-large">{getSportIcon(modalidade)}</span>
                            <span className="sport-name">{modalidade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="validity-info">
                    <span className={`status-badge ${selectedStudent.status.toLowerCase() === 'ativo' ? 'ativa' : 'inactive'}`}>
                      {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                    </span>
                    <span className="validity-text">
                      Válido até: 31/12/2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmação de Logout */}
        {showLogoutModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="logout-modal-icon">⚠️</div>
              <div className="logout-modal-title">Confirmação</div>
              <div className="logout-modal-message">Tem certeza que quer sair?</div>
              <div className="logout-modal-actions">
                <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>
                  Cancelar
                </button>
                <button className="btn-danger" onClick={handleLogout}>
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;