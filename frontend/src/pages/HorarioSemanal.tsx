import React, { useState } from 'react';
import '../pages/styles/HorarioSemanal.css';
import Navbar from '../components/layout/Navbar';

const HorarioSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedSport, setSelectedSport] = useState('Futsal');
  const [selectedPeriod, setSelectedPeriod] = useState('Todos');

  interface TimeSlot {
    code: string;
    time: string;
    label: string;
  }

  interface Court {
    id: number;
    name: string;
    sport: string;
  }

  interface Day {
    key: string;
    label: string;
    short: string;
    date?: string;
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

  const courtsBySport = {
    'Futsal': [
      { id: 1, name: 'Futsal 1', sport: 'Futsal' },
      { id: 2, name: 'Futsal 2', sport: 'Futsal' }
    ],
    'Basquete': [
      { id: 3, name: 'Basquete 1', sport: 'Basquete' },
      { id: 4, name: 'Basquete 2', sport: 'Basquete' }
    ],
    'Vôlei': [
      { id: 5, name: 'Vôlei 1', sport: 'Vôlei' },
      { id: 6, name: 'Vôlei 2', sport: 'Vôlei' }
    ],
    'Tênis': [
      { id: 7, name: 'Tênis 1', sport: 'Tênis' },
      { id: 8, name: 'Tênis 2', sport: 'Tênis' }
    ]
  };

  const periods = ['Todos', 'Manhã', 'Tarde', 'Noite'];

  const getAvailability = (timeSlot: TimeSlot, day: Day, court: Court): boolean => {
    const dayCode = day.key;
    if (timeSlot.code.includes('246') && !['2', '4', '6'].includes(dayCode)) {
      return false;
    }
    if (timeSlot.code.includes('35') && !['3', '5'].includes(dayCode)) {
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
      'Basquete': '🏀',
      'Vôlei': '🏐',
      'Tênis': '🎾'
    };
    return icons[sport] || '🏟️';
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

  const selectedCourts = courtsBySport[selectedSport as keyof typeof courtsBySport] || [];
  const filteredTimeSlots = getFilteredTimeSlots();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />
      
      <div className="schedule-page">
        {/* Header */}
        <header className="schedule-header">
          <div className="header-container">
            <div className="header-left">
              <button className="back-button" onClick={() => window.history.back()}>
                ← Voltar
              </button>
              <h1 className="page-title">📅 Horários Disponíveis</h1>
            </div>
            
            <div className="week-navigation">
              <button 
                className="week-nav-button"
                onClick={() => setSelectedWeek(selectedWeek - 1)}
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
            {/* Seletor de Modalidade */}
            <div className="selector-section">
              <h2 className="selector-title">Modalidade:</h2>
              <div className="selector-buttons">
                {Object.keys(courtsBySport).map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`selector-button ${selectedSport === sport ? 'active' : ''}`}
                  >
                    <span className="selector-button-icon">{getSportIcon(sport)}</span>
                    <span className="selector-button-text">{sport}</span>
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
              <div className="legend-color occupied"></div>
              <span>Ocupado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color not-applicable"></div>
              <span>N/A</span>
            </div>
            <span className="legend-info">246=Seg/Qua/Sex | 35=Ter/Qui</span>
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
                        const isApplicable = isTimeSlotApplicable(timeSlot, day);
                        const isAvailable = isApplicable && getAvailability(timeSlot, day, court);
                        
                        return (
                          <div
                            key={day.key}
                            className={`schedule-cell ${
                              !isApplicable ? 'not-applicable' :
                              isAvailable ? 'available' : 'occupied'
                            }`}
                          >
                            <div className={`status-dot ${
                              !isApplicable ? 'gray' :
                              isAvailable ? 'green' : 'red'
                            }`}></div>
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
      </div>
    </div>
  );
};

export default HorarioSemanal;