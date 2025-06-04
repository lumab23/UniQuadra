import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/AdminDashboard.css';
import Navbar from '../components/layout/Navbar';

interface Student {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  telefone: string;
  curso: string;
  modalidades: string[];
  foto: string;
  ativo: boolean;
}

interface Reservation {
  id: string;
  studentId: number;
  studentName: string;
  studentMatricula: string;
  studentEmail: string;
  sport: string;
  court: string;
  date: string;
  dayOfWeek: string;
  timeSlot: string;
  timeCode: string;
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

  // Dados mockados para demonstração
  const mockStudents: Student[] = [
    {
      id: 1,
      nome: 'João Silva Santos',
      matricula: '123456789',
      email: 'joao.silva@edu.unifor.br',
      telefone: '(85) 99999-9999',
      curso: 'Engenharia de Software',
      modalidades: ['Futsal', 'Natação', 'Basquete'],
      foto: '/api/placeholder/150/150',
      ativo: true
    },
    {
      id: 2,
      nome: 'Maria Oliveira Costa',
      matricula: '987654321',
      email: 'maria.oliveira@edu.unifor.br',
      telefone: '(85) 88888-8888',
      curso: 'Medicina',
      modalidades: ['Vôlei', 'Tênis', 'Atletismo'],
      foto: '/api/placeholder/150/150',
      ativo: true
    },
    {
      id: 3,
      nome: 'Pedro Almeida Lima',
      matricula: '456789123',
      email: 'pedro.almeida@edu.unifor.br',
      telefone: '(85) 77777-7777',
      curso: 'Administração',
      modalidades: ['Futebol', 'Beach Tennis'],
      foto: '/api/placeholder/150/150',
      ativo: false
    }
  ];

  const mockReservations: Reservation[] = [
    {
      id: 'res-001',
      studentId: 1,
      studentName: 'João Silva Santos',
      studentMatricula: '123456789',
      studentEmail: 'joao.silva@edu.unifor.br',
      sport: 'Futsal',
      court: 'Futsal 1',
      date: '2024-12-16',
      dayOfWeek: 'Segunda-feira',
      timeSlot: '07:30-09:10',
      timeCode: 'M246AB',
      status: 'ativa',
      createdAt: '2024-12-14T10:30:00Z'
    },
    {
      id: 'res-002',
      studentId: 2,
      studentName: 'Maria Oliveira Costa',
      studentMatricula: '987654321',
      studentEmail: 'maria.oliveira@edu.unifor.br',
      sport: 'Natação',
      court: 'Piscina Olímpica',
      date: '2024-12-17',
      dayOfWeek: 'Terça-feira',
      timeSlot: '15:20-17:00',
      timeCode: 'T35CD',
      status: 'ativa',
      createdAt: '2024-12-14T14:15:00Z'
    },
    {
      id: 'res-003',
      studentId: 3,
      studentName: 'Pedro Almeida Lima',
      studentMatricula: '456789123',
      studentEmail: 'pedro.almeida@edu.unifor.br',
      sport: 'Basquete',
      court: 'Quadra 1',
      date: '2024-12-18',
      dayOfWeek: 'Quarta-feira',
      timeSlot: '19:00-20:40',
      timeCode: 'N246AB',
      status: 'cancelada',
      createdAt: '2024-12-13T16:45:00Z'
    }
  ];

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
    try {
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReservations(mockReservations);
      setStudents(mockStudents);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
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
                className="btn-secondary"
                onClick={() => navigate('/admin/horarios')}
              >
                📅 Ver Horários
              </button>
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
                                    <div className="code-info">{reservation.timeCode}</div>
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
                        <span className="stat-number">{students.filter(s => s.ativo).length}</span>
                        <span className="stat-label">Ativos</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">⏸️</span>
                      <div className="stat-info">
                        <span className="stat-number">{students.filter(s => !s.ativo).length}</span>
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
                        <div key={student.id} className={`student-card ${!student.ativo ? 'inactive' : ''}`}>
                          <div className="student-photo">
                            <img src={student.foto} alt={student.nome} />
                            <div className={`status-indicator ${student.ativo ? 'active' : 'inactive'}`}>
                              {student.ativo ? '✅' : '⏸️'}
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
                                <span className="detail-label">Telefone:</span>
                                <span className="detail-value">{student.telefone}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Curso:</span>
                                <span className="detail-value">{student.curso}</span>
                              </div>
                            </div>

                            <div className="student-sports">
                              <span className="sports-label">Modalidades:</span>
                              <div className="sports-list">
                                {student.modalidades.map((modalidade, index) => (
                                  <span key={index} className="sport-tag">
                                    {getSportIcon(modalidade)} {modalidade}
                                  </span>
                                ))}
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
                        <span className="info-label">Telefone:</span>
                        <span className="info-value">{selectedStudent.telefone}</span>
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
                    <span className={`status-badge ${selectedStudent.ativo ? 'ativa' : 'inactive'}`}>
                      {selectedStudent.ativo ? '✅ ATIVO' : '⏸️ INATIVO'}
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