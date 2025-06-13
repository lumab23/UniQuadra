import React, { useState } from 'react';
import '../pages/styles/HorarioSemanal.css';
import Navbar from '../components/layout/Navbar';

const HorarioSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedSport, setSelectedSport] = useState('Quadra');
  const [selectedPeriod, setSelectedPeriod] = useState('Todos');
  const [activeTab, setActiveTab] = useState<'horarios' | 'reservas'>('horarios');
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [pendingReservation, setPendingReservation] = useState<{
    timeSlot: TimeSlot;
    day: Day;
    court: Court;
  } | null>(null);

  interface TimeSlot {
    code: string;
    time: string;
    label: string;
  }

  interface Court {
    id: number;
    name: string;
    sport: string;
    type: string;
  }

  interface Day {
    key: string;
    label: string;
    short: string;
    date?: string;
  }

  interface Reserva {
    timeSlot: TimeSlot;
    day: Day;
    court: Court;
    week: number;
    createdAt: string;
  }

  const timeSlots: TimeSlot[] = [
    { code: 'M246AB', time: '07:30-09:10', label: 'Manhã' },
    { code: 'M35AB', time: '07:30-09:10', label: 'Manhã' },
    { code: 'M246CD', time: '09:20-11:00', label: 'Manhã' },
    { code: 'M35CD', time: '09:20-11:00', label: 'Manhã' },
    { code: 'M246EF', time: '11:10-12:50', label: 'Manhã' },
    { code: 'M35EF', time: '11:10-12:50', label: 'Manhã' },
    { code: 'T246AB', time: '13:30-15:10', label: 'Tarde' },
    { code: 'T35AB', time: '13:30-15:10', label: 'Tarde' },
    { code: 'T246CD', time: '15:20-17:00', label: 'Tarde' },
    { code: 'T35CD', time: '15:20-17:00', label: 'Tarde' },
    { code: 'T246EF', time: '17:10-18:50', label: 'Tarde' },
    { code: 'T35EF', time: '17:10-18:50', label: 'Tarde' },
    { code: 'N246AB', time: '19:00-20:40', label: 'Noite' },
    { code: 'N35AB', time: '19:00-20:40', label: 'Noite' },
    { code: 'N246CD', time: '20:50-22:30', label: 'Noite' },
    { code: 'N35CD', time: '20:50-22:30', label: 'Noite' }
  ];

  const daysOfWeek: Day[] = [
    { key: '2', label: 'Segunda-feira', short: 'SEG' },
    { key: '3', label: 'Terça-feira', short: 'TER' },
    { key: '4', label: 'Quarta-feira', short: 'QUA' },
    { key: '5', label: 'Quinta-feira', short: 'QUI' },
    { key: '6', label: 'Sexta-feira', short: 'SEX' }
  ];

  const courtsByType = {
    'Quadra': [
      { id: 1, name: 'Quadra de Futsal', sport: 'Futsal', type: 'Quadra' },
      { id: 5, name: 'Quadra de Basquete', sport: 'Basquete', type: 'Quadra' },
      { id: 17, name: 'Quadra de Vôlei', sport: 'Vôlei', type: 'Quadra' }
    ],
    'Campo': [
      { id: 10, name: 'Campo Society', sport: 'Futebol', type: 'Campo' }
    ],
    'Piscina': [
      { id: 3, name: 'Piscina Olímpica', sport: 'Natação', type: 'Piscina' }
    ],
    'Quadra de Tênis': [
      { id: 15, name: 'Quadra Saibro 1', sport: 'Tênis', type: 'Quadra de Tênis' },
      { id: 16, name: 'Quadra Saibro 2', sport: 'Tênis', type: 'Quadra de Tênis' },
      { id: 19, name: 'Quadra Saibro 3', sport: 'Tênis', type: 'Quadra de Tênis' },
      { id: 20, name: 'Quadra Saibro 4', sport: 'Tênis', type: 'Quadra de Tênis' }
    ],
    'Pista de Atletismo': [
      { id: 11, name: 'Pista Oficial', sport: 'Atletismo', type: 'Pista de Atletismo' },
      { id: 12, name: 'Campo de Saltos', sport: 'Atletismo', type: 'Pista de Atletismo' },
      { id: 21, name: 'Campo de Futebol Oficial', sport: 'Futebol', type: 'Pista de Atletismo' }
    ],
    'Quadra de Areia': [
      { id: 7, name: 'Quadra Areia 1', sport: 'Vôlei de Praia', type: 'Quadra de Areia' },
      { id: 8, name: 'Quadra Areia 2', sport: 'Vôlei de Praia', type: 'Quadra de Areia' },
      { id: 13, name: 'Quadra Areia 3', sport: 'Beach Tennis', type: 'Quadra de Areia' },
      { id: 14, name: 'Quadra Areia 4', sport: 'Beach Tennis', type: 'Quadra de Areia' }
    ]
  };

  const periods = ['Todos', 'Manhã', 'Tarde', 'Noite'];

  const generateReservationKey = (timeSlot: TimeSlot, day: Day, court: Court, week: number): string => {
    return `${timeSlot.code}-${day.key}-${court.id}-week${week}`;
  };

  // Função para obter a data/hora da reserva como objeto Date
  const getReservationDate = (day: Day, timeSlot: TimeSlot, week: number): Date => {
    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() - today.getDay() + 1 + (week * 7));
    const dayIndex = daysOfWeek.findIndex(d => d.key === day.key);
    const date = new Date(currentWeek);
    date.setDate(currentWeek.getDate() + dayIndex);
    // Pega o horário inicial do timeSlot
    const [startHour, startMinute] = timeSlot.time.split('-')[0].split(':');
    date.setHours(Number(startHour), Number(startMinute), 0, 0);
    return date;
  };

  const getAvailability = (timeSlot: TimeSlot, day: Day, court: Court): boolean => {
    const dayCode = day.key;
    if (timeSlot.code.includes('246') && !['2', '4', '6'].includes(dayCode)) {
      return false;
    }
    if (timeSlot.code.includes('35') && !['3', '5'].includes(dayCode)) {
      return false;
    }
    const reservationKey = generateReservationKey(timeSlot, day, court, selectedWeek);
    if (reservations.some(r => generateReservationKey(r.timeSlot, r.day, r.court, r.week) === reservationKey)) {
      return false;
    }
    const random = Math.random();
    return random > 0.3;
  };

  const getCurrentWeekDates = (): Day[] => {
    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() - today.getDay() + 1 + (selectedWeek * 7));
    return daysOfWeek.map((day, index) => {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + index);
      return {
        ...day,
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      };
    });
  };

  const weekDates = getCurrentWeekDates();

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

  const getTypeIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      'Quadra': '🏀',
      'Campo': '⚽',
      'Piscina': '🏊‍♀️',
      'Quadra de Tênis': '🎾',
      'Pista de Atletismo': '🏃‍♂️',
      'Quadra de Areia': '🏖️'
    };
    return icons[type] || '🏟️';
  };

  const getPeriodIcon = (period: string): string => {
    const icons: { [key: string]: string } = {
      'Todos': '🕐',
      'Manhã': '🌅',
      'Tarde': '☀️',
      'Noite': '🌙'
    };
    return icons[period] || '🕐';
  };

  const isTimeSlotApplicable = (timeSlot: TimeSlot, day: Day): boolean => {
    const dayCode = day.key;
    if (timeSlot.code.includes('246') && ['2', '4', '6'].includes(dayCode)) {
      return true;
    }
    if (timeSlot.code.includes('35') && ['3', '5'].includes(dayCode)) {
      return true;
    }
    return false;
  };

  const getFilteredTimeSlots = (): TimeSlot[] => {
    if (selectedPeriod === 'Todos') {
      return timeSlots;
    }
    return timeSlots.filter(slot => slot.label === selectedPeriod);
  };

  const handleCellClick = (timeSlot: TimeSlot, day: Day, court: Court) => {
    const isApplicable = isTimeSlotApplicable(timeSlot, day);
    const isAvailable = isApplicable && getAvailability(timeSlot, day, court);
    const reservationKey = generateReservationKey(timeSlot, day, court, selectedWeek);
    if (!isApplicable) return;
    if (reservations.some(r => generateReservationKey(r.timeSlot, r.day, r.court, r.week) === reservationKey)) {
      // Cancelar reserva
      setReservations(reservations.filter(r => generateReservationKey(r.timeSlot, r.day, r.court, r.week) !== reservationKey));
    } else if (isAvailable) {
      setPendingReservation({ timeSlot, day, court });
      setShowReservationModal(true);
    }
  };

  const confirmReservation = () => {
    if (pendingReservation) {
      const { timeSlot, day, court } = pendingReservation;
      setReservations([
        ...reservations,
        {
          timeSlot,
          day,
          court,
          week: selectedWeek,
          createdAt: new Date().toISOString()
        }
      ]);
      setShowReservationModal(false);
      setPendingReservation(null);
    }
  };

  const cancelReservation = () => {
    setShowReservationModal(false);
    setPendingReservation(null);
  };

  const getCellStatus = (timeSlot: TimeSlot, day: Day, court: Court): 'available' | 'occupied' | 'reserved' | 'not-applicable' => {
    const isApplicable = isTimeSlotApplicable(timeSlot, day);
    if (!isApplicable) return 'not-applicable';
    const reservationKey = generateReservationKey(timeSlot, day, court, selectedWeek);
    if (reservations.some(r => generateReservationKey(r.timeSlot, r.day, r.court, r.week) === reservationKey)) return 'reserved';
    const isAvailable = getAvailability(timeSlot, day, court);
    return isAvailable ? 'available' : 'occupied';
  };

  // Separar reservas futuras e passadas
  const now = new Date();
  const reservasFuturas = reservations.filter(r => getReservationDate(r.day, r.timeSlot, r.week) >= now);
  const reservasPassadas = reservations.filter(r => getReservationDate(r.day, r.timeSlot, r.week) < now);

  const selectedCourts = courtsByType[selectedSport as keyof typeof courtsByType] || [];
  const filteredTimeSlots = getFilteredTimeSlots();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />
      <div className="schedule-page">
        {/* Abas */}
        <div className="tabs-container">
          <button
            className={`tab-button${activeTab === 'horarios' ? ' active' : ''}`}
            onClick={() => setActiveTab('horarios')}
          >
            Horários
          </button>
          <button
            className={`tab-button${activeTab === 'reservas' ? ' active' : ''}`}
            onClick={() => setActiveTab('reservas')}
          >
            Minhas Reservas
          </button>
        </div>
        {/* Conteúdo das Abas */}
        {activeTab === 'horarios' && (
          <>
            {/* Header */}
            <header className="schedule-header">
              <div className="header-container">
                <div className="header-left">
                  <button className="back-button" onClick={() => window.history.back()}>
                    ← Voltar
                  </button>
                  <h1 className="page-title">📅 Horários e Reservas</h1>
                </div>
                <div className="week-navigation">
                  <button 
                    className="week-nav-button"
                    onClick={() => setSelectedWeek(selectedWeek - 1)}
                    disabled={selectedWeek <= 0}
                    style={{ 
                      opacity: selectedWeek <= 0 ? 0.5 : 1,
                      cursor: selectedWeek <= 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ← Anterior
                  </button>
                  <span className="current-week">
                    {selectedWeek === 0 ? 'Esta Semana' : `Semana ${selectedWeek > 0 ? '+' : ''}${selectedWeek}`}
                  </span>
                  <button 
                    className="week-nav-button"
                    onClick={() => setSelectedWeek(selectedWeek + 1)}
                  >
                    Próxima →
                  </button>
                </div>
              </div>
            </header>
            <div className="schedule-content">
              {/* Seletores */}
              <div className="selectors-container">
                {/* Seletor de Tipo de Espaço */}
                <div className="selector-section">
                  <h2 className="selector-title">Tipo de Espaço:</h2>
                  <div className="selector-buttons">
                    {Object.keys(courtsByType).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSport(type)}
                        className={`selector-button ${selectedSport === type ? 'active' : ''}`}
                      >
                        <span className="selector-button-icon">{getTypeIcon(type)}</span>
                        <span className="selector-button-text">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Seletor de Período */}
                <div className="selector-section">
                  <h2 className="selector-title">Período:</h2>
                  <div className="selector-buttons">
                    {periods.map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`selector-button ${selectedPeriod === period ? 'active' : ''}`}
                      >
                        <span className="selector-button-icon">{getPeriodIcon(period)}</span>
                        <span className="selector-button-text">{period}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Legenda */}
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span>Disponível</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color reserved"></div>
                  <span>Minha Reserva</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color occupied"></div>
                  <span>Ocupado</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color not-applicable"></div>
                  <span>N/A</span>
                </div>
                <span className="legend-info">246=Seg/Qua/Sex | 35=Ter/Qui | Clique para reservar</span>
              </div>
              {/* Grid da Modalidade Selecionada */}
              <div className="sport-section">
                <div className="sport-header">
                  <div className="sport-header-left">
                    <span className="sport-icon">{getSportIcon(selectedSport)}</span>
                    <h2 className="sport-title">{selectedSport}</h2>
                  </div>
                  <div className="sport-header-right">
                    <span className="period-icon">{getPeriodIcon(selectedPeriod)}</span>
                    <span className="period-title">{selectedPeriod}</span>
                  </div>
                </div>
                {selectedCourts.map((court) => (
                  <div key={court.id} className="court-schedule">
                    <div className="court-name-header">
                      <h3 className="court-name">{court.name}</h3>
                    </div>
                    <div className="schedule-grid">
                      {/* Header dos dias */}
                      <div className="grid-header">
                        <div className="time-column-header">Horário</div>
                        {weekDates.map((day) => (
                          <div key={day.key} className="day-header">
                            <div className="day-name">{day.short}</div>
                            <div className="day-date">{day.date}</div>
                          </div>
                        ))}
                      </div>
                      {/* Linhas de horários */}
                      {filteredTimeSlots.map((timeSlot) => (
                        <div key={timeSlot.code} className="schedule-row">
                          <div className="time-cell">
                            <div className="time-display">{timeSlot.time}</div>
                            <div className="time-code">{timeSlot.code}</div>
                          </div>
                          {weekDates.map((day) => {
                            const status = getCellStatus(timeSlot, day, court);
                            const reservationKey = generateReservationKey(timeSlot, day, court, selectedWeek);
                            return (
                              <div
                                key={reservationKey}
                                className={`schedule-cell ${status}`}
                                onClick={() => handleCellClick(timeSlot, day, court)}
                              >
                                <div className={`status-dot ${
                                  status === 'not-applicable' ? 'gray' :
                                  status === 'available' ? 'green' :
                                  status === 'reserved' ? 'blue' : 'red'
                                }`}></div>
                                {status === 'reserved' && (
                                  <div className="reservation-icon">📌</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal de Confirmação */}
            {showReservationModal && pendingReservation && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-header">
                    <h3>Confirmar Reserva</h3>
                    <button className="modal-close" onClick={cancelReservation}>×</button>
                  </div>
                  <div className="modal-content">
                    <div className="reservation-details">
                      <div className="detail-item">
                        <span className="detail-label">Modalidade:</span>
                        <span className="detail-value">
                          {getSportIcon(pendingReservation.court.sport)} {pendingReservation.court.sport}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Local:</span>
                        <span className="detail-value">{pendingReservation.court.name}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Data:</span>
                        <span className="detail-value">
                          {pendingReservation.day.label} ({pendingReservation.day.date})
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Horário:</span>
                        <span className="detail-value">{pendingReservation.timeSlot.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={cancelReservation}>
                      Cancelar
                    </button>
                    <button className="btn-primary" onClick={confirmReservation}>
                      Confirmar Reserva
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {activeTab === 'reservas' && (
          <div className="reservas-list-section">
            <h2 className="reservas-title">Minhas Reservas</h2>
            <div className="reservas-subsection">
              <h3>Futuras</h3>
              {reservasFuturas.length === 0 ? (
                <div className="reservas-empty">Nenhuma reserva futura.</div>
              ) : (
                <ul className="reservas-list">
                  {reservasFuturas.map((r, idx) => (
                    <li key={idx} className="reserva-item futura">
                      <span className="reserva-icon">{getSportIcon(r.court.sport)}</span>
                      <span><b>{r.court.sport}</b> - {r.court.name}</span>
                      <span>{r.day.label} ({r.day.date})</span>
                      <span>{r.timeSlot.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="reservas-subsection">
              <h3>Passadas</h3>
              {reservasPassadas.length === 0 ? (
                <div className="reservas-empty">Nenhuma reserva passada.</div>
              ) : (
                <ul className="reservas-list">
                  {reservasPassadas.map((r, idx) => (
                    <li key={idx} className="reserva-item passada">
                      <span className="reserva-icon">{getSportIcon(r.court.sport)}</span>
                      <span><b>{r.court.sport}</b> - {r.court.name}</span>
                      <span>{r.day.label} ({r.day.date})</span>
                      <span>{r.timeSlot.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorarioSemanal;