import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import '../pages/styles/AdminHorarios.css';

interface TimeSlot {
  id: string;
  timeCode: string;
  timeSlot: string;
  period: 'Manhã' | 'Tarde' | 'Noite';
}

interface SportSchedule {
  sport: string;
  icon: string;
  courts: {
    courtName: string;
    timeSlots: TimeSlot[];
  }[];
}

const AdminHorarios: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('Futsal');

  // Dados mockados dos horários
  const timeSlots: TimeSlot[] = [
    // Manhã
    { id: 'M1', timeCode: 'M1AB', timeSlot: '07:30-09:10', period: 'Manhã' },
    { id: 'M2', timeCode: 'M2CD', timeSlot: '09:20-11:00', period: 'Manhã' },
    { id: 'M3', timeCode: 'M3EF', timeSlot: '11:10-12:50', period: 'Manhã' },
    
    // Tarde
    { id: 'T1', timeCode: 'T1AB', timeSlot: '13:30-15:10', period: 'Tarde' },
    { id: 'T2', timeCode: 'T2CD', timeSlot: '15:20-17:00', period: 'Tarde' },
    { id: 'T3', timeCode: 'T3EF', timeSlot: '17:10-18:50', period: 'Tarde' },
    
    // Noite
    { id: 'N1', timeCode: 'N1AB', timeSlot: '19:00-20:40', period: 'Noite' },
    { id: 'N2', timeCode: 'N2CD', timeSlot: '20:50-22:30', period: 'Noite' },
  ];

  const sportsSchedules: SportSchedule[] = [
    {
      sport: 'Futsal',
      icon: '⚽',
      courts: [
        { courtName: 'Futsal 1', timeSlots },
        { courtName: 'Futsal 2', timeSlots },
      ]
    },
    {
      sport: 'Basquete',
      icon: '🏀',
      courts: [
        { courtName: 'Quadra 1', timeSlots },
        { courtName: 'Quadra 2', timeSlots },
      ]
    },
    {
      sport: 'Vôlei',
      icon: '🏐',
      courts: [
        { courtName: 'Quadra de Vôlei 1', timeSlots },
        { courtName: 'Quadra de Vôlei 2', timeSlots },
      ]
    },
    {
      sport: 'Natação',
      icon: '🏊‍♀️',
      courts: [
        { courtName: 'Piscina Olímpica', timeSlots },
        { courtName: 'Piscina Semi-Olímpica', timeSlots },
      ]
    },
    {
      sport: 'Tênis',
      icon: '🎾',
      courts: [
        { courtName: 'Quadra de Tênis 1', timeSlots },
        { courtName: 'Quadra de Tênis 2', timeSlots },
      ]
    }
  ];

  useEffect(() => {
    // Verificar se o admin está autenticado
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  const selectedSchedule = sportsSchedules.find(s => s.sport === selectedSport);

  const getPeriodSlots = (period: 'Manhã' | 'Tarde' | 'Noite') => {
    return timeSlots.filter(slot => slot.period === period);
  };

  const getPeriodIcon = (period: string) => {
    const icons = {
      'Manhã': '🌅',
      'Tarde': '☀️',
      'Noite': '🌙'
    };
    return icons[period as keyof typeof icons] || '⏰';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Navbar />
      
      <div className="admin-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-container">
            <div className="header-left">
              <h1 className="dashboard-title">📅 Gerenciamento de Horários</h1>
              <p className="dashboard-subtitle">Visualizar e gerenciar horários das modalidades esportivas</p>
            </div>
            
            <div className="header-actions">
              <button 
                className="btn-secondary"
                onClick={() => navigate('/admin/dashboard')}
              >
                ← Voltar ao Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Seletor de Modalidades */}
          <div className="filters-container">
            <div className="sport-selector">
              <label htmlFor="sport-select" className="selector-label">
                🏟️ Selecionar Modalidade:
              </label>
              <select
                id="sport-select"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="filter-select sport-select"
              >
                {sportsSchedules.map(schedule => (
                  <option key={schedule.sport} value={schedule.sport}>
                    {schedule.icon} {schedule.sport}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grade de Horários */}
          {selectedSchedule && (
            <div className="schedule-container">
              <div className="schedule-header">
                <h2 className="schedule-title">
                  {selectedSchedule.icon} {selectedSchedule.sport}
                </h2>
                <p className="schedule-subtitle">
                  Horários disponíveis para reserva
                </p>
              </div>

              {/* Horários por Período */}
              {(['Manhã', 'Tarde', 'Noite'] as const).map(period => (
                <div key={period} className="period-section">
                  <h3 className="period-title">
                    {getPeriodIcon(period)} {period}
                  </h3>
                  
                  <div className="schedule-grid">
                    {/* Cabeçalho da tabela */}
                    <div className="schedule-table">
                      <div className="table-header">
                        <div className="header-cell time-header">Horário</div>
                        <div className="header-cell code-header">Código</div>
                        {selectedSchedule.courts.map(court => (
                          <div key={court.courtName} className="header-cell court-header">
                            {court.courtName}
                          </div>
                        ))}
                      </div>

                      {/* Linhas de horários */}
                      {getPeriodSlots(period).map(slot => (
                        <div key={slot.id} className="table-row">
                          <div className="table-cell time-cell">
                            <strong>{slot.timeSlot}</strong>
                          </div>
                          <div className="table-cell code-cell">
                            <span className="time-code">{slot.timeCode}</span>
                          </div>
                          {selectedSchedule.courts.map(court => (
                            <div key={`${court.courtName}-${slot.id}`} className="table-cell court-cell">
                              <div className="slot-status available">
                                <span className="status-icon">✅</span>
                                <span className="status-text">Disponível</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Legenda */}
              <div className="legend-container">
                <h4>📋 Legenda:</h4>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-icon available">✅</span>
                    <span className="legend-text">Horário Disponível</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon reserved">🔒</span>
                    <span className="legend-text">Horário Reservado</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon maintenance">🔧</span>
                    <span className="legend-text">Manutenção</span>
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="info-container">
                <div className="info-card">
                  <h4>ℹ️ Informações Importantes:</h4>
                  <ul>
                    <li>Cada horário tem duração de 1h40min (2 tempos de aula)</li>
                    <li>Reservas podem ser feitas com até 7 dias de antecedência</li>
                    <li>Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência</li>
                    <li>Horários de funcionamento: 07:30 às 22:30</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h4>📊 Códigos de Horário:</h4>
                  <ul>
                    <li><strong>M</strong> = Manhã (07:30 - 12:50)</li>
                    <li><strong>T</strong> = Tarde (13:30 - 18:50)</li>
                    <li><strong>N</strong> = Noite (19:00 - 22:30)</li>
                    <li><strong>AB/CD/EF</strong> = Identificadores dos tempos</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHorarios;