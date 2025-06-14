import React, { useState, useMemo, useEffect } from 'react';
import '../pages/styles/HorarioSemanal.css';
import Navbar from '../components/layout/Navbar';

// ====================================================================
// FUNÇÕES DE ÍCONES MOVIDAS PARA FORA DO COMPONENTE HorarioSemanal
// ====================================================================
const getLocationTypeIcon = (type: string): string => {
  const icons: { [key: string]: string } = {
    'Quadra': '🏟️',
    'Quadra de Tênis': '🎾',
    'Campo': '⚽',
    'Quadra de Areia': '🏖️',
    'Piscina': '🏊‍♀️',
    'Pista de Atletismo': '🏃‍♂️'
  };
  return icons[type] || '📍';
};

const getPeriodIcon = (period: string): string => {
  const icons: { [key: string]: string } = {
    'Manhã': '🌅',
    'Tarde': '☀️',
    'Noite': '🌙'
  };
  return icons[period] || '🕐';
};
// ====================================================================

// ====================================================================
// Componente SelectorButtons MOVIDO PARA FORA do HorarioSemanal
// ====================================================================
interface SelectorButtonsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  getIcon: (option: string) => string;
  title: string;
}

const SelectorButtons: React.FC<SelectorButtonsProps> = ({ options, selectedOption, onSelect, getIcon, title }) => (
  <div className="selector-section">
    <h2 className="selector-title">{title}:</h2>
    <div className="selector-buttons">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`selector-button ${selectedOption === option ? 'active' : ''}`}
        >
          <span className="selector-button-icon">{getIcon(option)}</span>
          <span className="selector-button-text">{option}</span>
        </button>
      ))}
    </div>
  </div>
);
// ====================================================================


const HorarioSemanal: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedLocationType, setSelectedLocationType] = useState('Quadra');
  const [selectedPeriod, setSelectedPeriod] = useState('Manhã');
  const [activeTab, setActiveTab] = useState<'horarios' | 'reservas'>('horarios');
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [pendingReservation, setPendingReservation] = useState<{
    timeSlot: TimeSlot;
    day: Day;
    court: Court;
  } | null>(null);
  const [dbReservations, setDbReservations] = useState<BackendReserva[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [dbCourts, setDbCourts] = useState<any[]>([]);
  const [userMatricula, setUserMatricula] = useState<string | null>(null);

  interface TimeSlot {
    code: string;
    time: string;
    label: string;
  }

  interface Court {
    id: number;
    name: string;
    sport: string;
    locationType: string;
    _id?: string;
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

  interface BackendReserva {
    _id: string;
    quadra: string;
    data: string;
    matriculas: string[];
  }

  const timeSlots: TimeSlot[] = useMemo(() => [
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
  ], []);

  const daysOfWeek: Day[] = useMemo(() => [
    { key: '2', label: 'Segunda-feira', short: 'SEG' },
    { key: '3', label: 'Terça-feira', short: 'TER' },
    { key: '4', label: 'Quarta-feira', short: 'QUA' },
    { key: '5', label: 'Quinta-feira', short: 'QUI' },
    { key: '6', label: 'Sexta-feira', short: 'SEX' }
  ], []);

  const allCourts: Court[] = useMemo(() => [
    { id: 1, name: 'Quadra Poliesportiva 1', sport: 'Campo de Futsal', locationType: 'Quadra' },
    { id: 2, name: 'Quadra Poliesportiva 2', sport: 'Basquete', locationType: 'Quadra' },
    { id: 17, name: 'Quadra Vôlei 1', sport: 'Vôlei', locationType: 'Quadra' },
    { id: 18, name: 'Quadra Vôlei 2', sport: 'Vôlei', locationType: 'Quadra' },

    { id: 15, name: 'Quadra de Tênis Saibro 1', sport: 'Tenis', locationType: 'Quadra de Tênis' },
    { id: 16, name: 'Quadra de Tênis Saibro 2', sport: 'Tenis', locationType: 'Quadra de Tênis' },

    { id: 9, name: 'Campo de Futebol Oficial', sport: 'Campo de Futsal', locationType: 'Campo' },

    { id: 3, name: 'Piscina Olímpica', sport: 'Natação', locationType: 'Piscina' },

    { id: 7, name: 'Quadra de Areia Vôlei de Praia 1', sport: 'Campo de areia', locationType: 'Quadra de Areia' },
    { id: 8, name: 'Quadra de Areia Vôlei de Praia 2', sport: 'Campo de areia', locationType: 'Quadra de Areia' },
    { id: 13, name: 'Quadra de Areia Beach Tennis 1', sport: 'Campo de areia', locationType: 'Quadra de Areia' },
    { id: 14, name: 'Quadra de Areia Beach Tennis 2', sport: 'Campo de areia', locationType: 'Quadra de Areia' },

    { id: 11, name: 'Pista de Atletismo Oficial', sport: 'Atletismo', locationType: 'Pista de Atletismo' },
    { id: 12, name: 'Campo de Saltos Atletismo', sport: 'Atletismo', locationType: 'Pista de Atletismo' },
  ], []);

  const locationTypes: string[] = useMemo(() => ['Quadra', 'Quadra de Tênis', 'Campo', 'Quadra de Areia', 'Piscina', 'Pista de Atletismo'], []);
  const periods: string[] = useMemo(() => ['Manhã', 'Tarde', 'Noite'], []);

  const hourToTimeSlotCodeMap: { [key: string]: string } = useMemo(() => ({
    '07:30': 'M', '09:20': 'M', '11:10': 'M',
    '13:30': 'T', '15:20': 'T', '17:10': 'T',
    '19:00': 'N', '20:50': 'N'
  }), []);

  // Buscar matrícula do usuário do localStorage
  useEffect(() => {
    const userData = localStorage.getItem('@UniQuadra:user');
    if (userData) {
      const { matricula } = JSON.parse(userData);
      setUserMatricula(matricula);
    }
  }, []);

  // Verificar se a matrícula existe e carregar dados
  useEffect(() => {
    const verificarMatriculaECarregarDados = async () => {
      if (!userMatricula) return;
      
      try {
        // Verificar matrícula
        const response = await fetch(`http://localhost:3001/api/alunos/matricula/${userMatricula}`);
        if (!response.ok) {
          console.error('Matrícula não encontrada no sistema');
          alert('Sua matrícula não está cadastrada no sistema. Por favor, faça seu cadastro primeiro.');
          return;
        }

        // Carregar quadras
        const courtsResponse = await fetch('http://localhost:3001/api/quadras');
        if (!courtsResponse.ok) {
          throw new Error('Erro ao buscar quadras');
        }
        const quadras = await courtsResponse.json();
        console.log('Quadras carregadas do banco:', quadras);
        
        // Mapear as quadras do banco para o formato do frontend
        const mappedCourts = quadras.map((q: any) => ({
          ...q,
          id: q._id, // Garantir que o ID está disponível como 'id'
          _id: q._id // Manter o _id original também
        }));
        
        console.log('Quadras mapeadas:', mappedCourts);
        setDbCourts(mappedCourts);

        // Carregar reservas
        await fetchReservationsFromDb();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    verificarMatriculaECarregarDados();
  }, [userMatricula]); // Executa quando userMatricula muda

  const fetchReservationsFromDb = async () => {
    if (!userMatricula) return;
    
    setIsLoadingReservations(true);
    try {
      const response = await fetch('http://localhost:3001/api/reservas'); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BackendReserva[] = await response.json();
      setDbReservations(data);

      const userReservasFromDb: Reserva[] = [];
      data.forEach(dbRes => {
          if (dbRes.matriculas.includes(userMatricula)) {
              const resDate = new Date(dbRes.data);
              let dayKeyForFrontend: string | undefined;
              if (resDate.getDay() >= 1 && resDate.getDay() <= 5) { 
                  dayKeyForFrontend = (resDate.getDay() + 1).toString(); 
              } else {
                  return; 
              }
              
              const timeHourMinute = `${resDate.getUTCHours().toString().padStart(2, '0')}:${resDate.getUTCMinutes().toString().padStart(2, '0')}`;
              
              const correspondingDay = daysOfWeek.find(d => d.key === dayKeyForFrontend);
              const correspondingTimeSlot = timeSlots.find(ts => 
                 ts.time.startsWith(timeHourMinute) && ts.code.startsWith(hourToTimeSlotCodeMap[timeHourMinute])
              );
              const correspondingCourt = allCourts.find(court => court.id.toString() === dbRes.quadra);

              if (correspondingDay && correspondingTimeSlot && correspondingCourt) {
                  const appWeekStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1));
                  const diffTime = resDate.getTime() - appWeekStartDate.getTime();
                  const weekOffset = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

                  userReservasFromDb.push({
                      timeSlot: correspondingTimeSlot,
                      day: correspondingDay,
                      court: correspondingCourt,
                      week: weekOffset,
                      createdAt: dbRes.data
                  });
              }
          }
      });
      setReservations(userReservasFromDb);

    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    } finally {
      setIsLoadingReservations(false);
    }
  };

  useEffect(() => {
    if (userMatricula) {
      fetchReservationsFromDb();
    }
  }, [selectedWeek]);

  const generateReservationKey = (timeSlot: TimeSlot, day: Day, court: Court, week: number): string => {
    // CORREÇÃO: Usando template literal correto aqui
    return `${timeSlot.code}-${day.key}-${court.id}-week${week}`;
  };

  const getCurrentWeekDates = (): Day[] => {
    const today = new Date();
    const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) + (selectedWeek * 7));

    return daysOfWeek.map((day, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + index);
      return {
        ...day,
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      };
    });
  };

  const weekDates = useMemo(() => getCurrentWeekDates(), [selectedWeek, daysOfWeek]);


  const getReservationDate = (day: Day, timeSlot: TimeSlot, week: number): Date => {
    const today = new Date();
    const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1) + (week * 7));

    const dayIndex = daysOfWeek.findIndex(d => d.key === day.key);
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + dayIndex);
    const [startHour, startMinute] = timeSlot.time.split('-')[0].split(':');
    
    // Ajustar para o fuso horário local
    const localDate = new Date(date);
    localDate.setHours(Number(startHour), Number(startMinute), 0, 0);
    
    // Converter para UTC mantendo o mesmo horário local
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
    
    return utcDate;
  };

  const getCellStatus = (timeSlot: TimeSlot, day: Day, court: Court): 'available' | 'occupied' | 'reserved' | 'not-applicable' => {
    const isTimeSlotApplicable = (ts: TimeSlot, d: Day): boolean => {
      const dayCode = d.key;
      return (ts.code.includes('246') && ['2', '4', '6'].includes(dayCode)) ||
             (ts.code.includes('35') && ['3', '5'].includes(dayCode));
    };

    const isApplicable = isTimeSlotApplicable(timeSlot, day);
    if (!isApplicable) return 'not-applicable';

    const targetDate = getReservationDate(day, timeSlot, selectedWeek);
    const targetDateUTC = new Date(targetDate.getTime() - (targetDate.getTimezoneOffset() * 60000));

    const isReservedByMeLocally = reservations.some(r =>
        r.court.id === court.id &&
        r.day.key === day.key &&
        r.timeSlot.code === timeSlot.code &&
        r.week === selectedWeek
    );
    if (isReservedByMeLocally) {
        return 'reserved';
    }

    const isDbReserved = dbReservations.some(dbRes => {
        const dbResDate = new Date(dbRes.data);
        const dbDayOfWeek = dbResDate.getDay();
        let dbDayKeyForFrontend: string | undefined;
        if (dbDayOfWeek >= 1 && dbDayOfWeek === parseInt(day.key)-1) {
            dbDayKeyForFrontend = day.key;
        } else {
            return false;
        }

        // CORREÇÃO: Usando template literal correto aqui
        const dbTimeHourMinute = `${dbResDate.getUTCHours().toString().padStart(2, '0')}:${dbResDate.getUTCMinutes().toString().padStart(2, '0')}`;

        const isSameCourt = dbRes.quadra === court.id.toString();
        const isSameDay = dbDayKeyForFrontend === day.key;
        const isSameTime = timeSlot.time.startsWith(dbTimeHourMinute);
        const isSameWeek = getWeekNumber(dbResDate) === getWeekNumber(targetDateUTC);

        const isReservedBySomeoneElse = userMatricula ? !dbRes.matriculas.includes(userMatricula) : true;

        return isSameCourt && isSameDay && isSameTime && isSameWeek && isReservedBySomeoneElse;
    });

    if (isDbReserved) {
        return 'occupied';
    }

    return 'available';
  };

  function getWeekNumber(d: Date): number {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

  const getFilteredTimeSlots = (): TimeSlot[] => {
    return timeSlots.filter(slot => slot.label === selectedPeriod);
  };

  const handleCellClick = async (timeSlot: TimeSlot, day: Day, court: Court) => {
    const status = getCellStatus(timeSlot, day, court);

    if (status === 'not-applicable' || status === 'occupied') {
        return;
    }

    const reservationKey = generateReservationKey(timeSlot, day, court, selectedWeek);
    const existingReservation = reservations.find(r => generateReservationKey(r.timeSlot, r.day, r.court, r.week) === reservationKey);

    if (existingReservation) {
        const confirmCancel = window.confirm('Deseja cancelar esta reserva?');
        if (confirmCancel) {
            try {
                const dbReservaToCancel = dbReservations.find(dbRes => {
                    const dbResDate = new Date(dbRes.data);
                    const dbDayOfWeek = dbResDate.getDay();
                    let dbDayKeyForFrontend: string | undefined;
                    if (dbDayOfWeek >= 1 && dbDayOfWeek === parseInt(day.key)-1) {
                        dbDayKeyForFrontend = day.key;
                    } else {
                        return false;
                    }
                    const dbTimeHourMinute = `${dbResDate.getUTCHours().toString().padStart(2, '0')}:${dbResDate.getUTCMinutes().toString().padStart(2, '0')}`;

                    const isSameCourt = dbRes.quadra === court.id.toString();
                    const isSameDay = dbDayKeyForFrontend === day.key;
                    const isSameTime = timeSlot.time.startsWith(dbTimeHourMinute);
                    const isSameWeek = getWeekNumber(dbResDate) === getWeekNumber(getReservationDate(day, timeSlot, selectedWeek));
                    const isMyReservationInDb = userMatricula ? dbRes.matriculas.includes(userMatricula) : false;

                    return isSameCourt && isSameDay && isSameTime && isSameWeek && isMyReservationInDb;
                });

                if (!dbReservaToCancel || !dbReservaToCancel._id) {
                    throw new Error('Reserva não encontrada no banco de dados para cancelar ou ID inválido.');
                }

                const response = await fetch(`http://localhost:3001/api/reservas/${dbReservaToCancel._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Falha ao cancelar reserva: ${errorData.message || response.status}`);
                }

                setDbReservations(prevDbReservations => prevDbReservations.filter(dbRes => dbRes._id !== dbReservaToCancel._id));
                setReservations(prevReservations => prevReservations.filter(r => r !== existingReservation));

                alert('Reserva cancelada com sucesso!');

            } catch (error: any) {
                console.error('Erro ao cancelar reserva:', error.message || error);
                alert(`Erro ao cancelar reserva: ${error.message || 'Tente novamente.'}`);
            }
        }
    } else {
        setPendingReservation({ timeSlot, day, court });
        setShowReservationModal(true);
    }
  };

  const confirmReservation = async () => {
    if (pendingReservation) {
      const { timeSlot, day, court } = pendingReservation;

      try {
          const reservationDate = getReservationDate(day, timeSlot, selectedWeek);
          
          // Verificar se a data é futura
          const now = new Date();
          if (reservationDate <= now) {
              throw new Error('A data da reserva deve ser futura');
          }

          console.log('Quadras disponíveis:', dbCourts);
          console.log('Procurando quadra com modalidade:', court.sport);
          
          // Encontrar a quadra correspondente no banco de dados
          const dbCourt = dbCourts.find(q => {
            console.log('Comparando com quadra do DB:', q);
            // Mapear o esporte do frontend para a modalidade do backend
            const modalidadeMap: { [key: string]: string } = {
              'Campo de Futsal': 'Campo de Futsal',
              'Basquete': 'Basquete',
              'Vôlei': 'Vôlei',
              'Campo de areia': 'Campo de areia',
              'Tenis': 'Tenis',
              'Natação': 'Natação',
              'Atletismo': 'Atletismo'
            };
            return q.modalidade === modalidadeMap[court.sport];
          });
          console.log('Quadra encontrada:', dbCourt);
          
          if (!dbCourt) {
              console.error('Quadras disponíveis no DB:', dbCourts);
              console.error('Modalidade procurada:', court.sport);
              throw new Error(`Quadra não encontrada no sistema`);
          }

          console.log('Buscando aluno com matrícula:', userMatricula);
          // Buscar o ID do aluno usando a matrícula
          const alunoResponse = await fetch(`http://localhost:3001/api/alunos/matricula/${userMatricula}`);
          if (!alunoResponse.ok) {
              throw new Error('Sua matrícula não está cadastrada no sistema. Por favor, faça seu cadastro primeiro.');
          }
          const alunoData = await alunoResponse.json();
          console.log('Dados do aluno encontrado:', alunoData);
          
          if (!alunoData || !alunoData._id) {
              throw new Error('Dados do aluno inválidos. Por favor, tente novamente.');
          }

          // Garantir que os IDs são strings válidas do MongoDB
          const quadraId = String(dbCourt._id);
          const alunoId = String(alunoData._id);

          console.log('ID da quadra:', quadraId);
          console.log('ID do aluno:', alunoId);
          console.log('Data da reserva:', reservationDate.toISOString());

          const reservaData = {
              quadra: quadraId,
              data: reservationDate.toISOString(),
              matriculas: [alunoId]
          };

          console.log('Dados da reserva:', reservaData);

          const response = await fetch('http://localhost:3001/api/reservas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(reservaData)
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Falha ao criar reserva: ${errorData.message || response.status}`);
          }

          const newReservation = await response.json();
          console.log('Nova reserva criada:', newReservation);

          setDbReservations(prev => [...prev, newReservation]);
          setReservations(prev => [...prev, {
              timeSlot,
              day,
              court,
              week: selectedWeek,
              createdAt: newReservation.data
          }]);

          setShowReservationModal(false);
          setPendingReservation(null);
          alert('Reserva criada com sucesso!');

      } catch (error: any) {
          console.error('Erro detalhado:', error);
          alert(`Erro ao confirmar reserva: ${error.message}`);
      }
    }
  };

  const cancelReservationModal = () => {
    setShowReservationModal(false);
    setPendingReservation(null);
  };

  const now = new Date();
  const reservasFuturas = reservations.filter(r => getReservationDate(r.day, r.timeSlot, r.week) >= now);
  const reservasPassadas = reservations.filter(r => getReservationDate(r.day, r.timeSlot, r.week) < now);

  const selectedCourts = useMemo(() =>
    allCourts.filter(court => court.locationType === selectedLocationType),
    [allCourts, selectedLocationType]
  );
  const filteredTimeSlots = useMemo(() => getFilteredTimeSlots(), [selectedPeriod, timeSlots]);

  return (
    <div className="schedule-page-wrapper">
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
            <header className="schedule-header">
              <div className="header-container">
                <button className="back-button" onClick={() => window.history.back()}>
                  ← Voltar
                </button>
                <h1 className="page-title">📅 Horários e Reservas</h1>
                <div className="week-navigation">
                  <button
                    className="week-nav-button"
                    onClick={() => setSelectedWeek(selectedWeek - 1)}
                    disabled={selectedWeek <= 0}
                    style={{ opacity: selectedWeek <= 0 ? 0.5 : 1, cursor: selectedWeek <= 0 ? 'not-allowed' : 'pointer' }}
                  >
                    ← Anterior
                  </button>
                  <span className="current-week">
                    {/* CORREÇÃO: Template literal com backticks ` ` */}
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
                <SelectorButtons
                  options={locationTypes}
                  selectedOption={selectedLocationType}
                  onSelect={setSelectedLocationType}
                  getIcon={getLocationTypeIcon}
                  title="Local"
                />
                <SelectorButtons
                  options={periods}
                  selectedOption={selectedPeriod}
                  onSelect={setSelectedPeriod}
                  getIcon={getPeriodIcon}
                  title="Período"
                />
              </div>

              {/* Legenda */}
              <div className="legend">
                <div className="legend-item"><div className="legend-color available"></div><span>Disponível</span></div>
                <div className="legend-item"><div className="legend-color reserved"></div><span>Minha Reserva</span></div>
                <div className="legend-item"><div className="legend-color occupied"></div><span>Ocupado</span></div>
                <div className="legend-item"><div className="legend-color not-applicable"></div><span>N/A</span></div>
                <span className="legend-info">246=Seg/Qua/Sex | 35=Ter/Qui | Clique para reservar</span>
              </div>

              {/* Grid dos Locais Selecionados */}
              <div className="sport-section">
                <div className="sport-header">
                  <div className="sport-header-left">
                    <span className="sport-icon">{getLocationTypeIcon(selectedLocationType)}</span>
                    <h2 className="sport-title">{selectedLocationType}</h2>
                  </div>
                  <div className="sport-header-right">
                    <span className="period-icon">{getPeriodIcon(selectedPeriod)}</span>
                    <span className="period-title">{selectedPeriod}</span>
                  </div>
                </div>
                {isLoadingReservations ? (
                    <div className="loading-message">Carregando horários...</div>
                ) : selectedCourts.length === 0 ? (
                  <div className="no-courts-message">
                    Não há locais disponíveis para esta categoria.
                  </div>
                ) : (
                  selectedCourts.map((court) => (
                    <div key={court.id} className="court-schedule">
                      <h3 className="court-name">{court.name} ({court.sport})</h3>
                      <div className="schedule-grid">
                        <div className="grid-header">
                          <div className="time-column-header">Horário</div>
                          {weekDates.map((day) => (
                            <div key={day.key} className="day-header">
                              <div className="day-name">{day.short}</div>
                              <div className="day-date">{day.date}</div>
                            </div>
                          ))}
                        </div>
                        {filteredTimeSlots.map((timeSlot) => (
                          <div key={timeSlot.code} className="schedule-row">
                            <div className="time-cell">
                              <div className="time-display">{timeSlot.time}</div>
                              <div className="time-code">{timeSlot.code}</div>
                            </div>
                            {weekDates.map((day) => {
                              const status = getCellStatus(timeSlot, day, court);
                              return (
                                <div
                                  // CORREÇÃO: Template literal com backticks ` `
                                  key={`${court.id}-${timeSlot.code}-${day.key}`}
                                  className={`schedule-cell ${status}`}
                                  onClick={() => handleCellClick(timeSlot, day, court)}
                                >
                                  {status === 'reserved' && (
                                    <span className="reservation-icon">📌</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Modal de Confirmação */}
            {showReservationModal && pendingReservation && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-header">
                    <h3>Confirmar Reserva</h3>
                    <button className="modal-close" onClick={cancelReservationModal}>×</button>
                  </div>
                  <div className="modal-content">
                    <div className="reservation-details">
                      {/* LOCAL */}
                      <div className="detail-item">
                        <span className="detail-label"><span role="img" aria-label="local">📍</span> Local:</span>
                        <span className="detail-value">
                          {pendingReservation.court.locationType} - {pendingReservation.court.name}
                          <br />
                          <small>Modalidade: {pendingReservation.court.sport}</small>
                        </span>
                      </div>
                      {/* DATA */}
                      <div className="detail-item">
                        <span className="detail-label"><span role="img" aria-label="data">📅</span> Data:</span>
                        <span className="detail-value">
                          {pendingReservation.day.label} ({pendingReservation.day.date})
                        </span>
                      </div>
                      {/* HORÁRIO */}
                      <div className="detail-item">
                        <span className="detail-label"><span role="img" aria-label="horário">⌚</span> Horário:</span>
                        <span className="detail-value">{pendingReservation.timeSlot.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-secondary" onClick={cancelReservationModal}>
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
                      <span className="reserva-icon">{getLocationTypeIcon(r.court.locationType)}</span>
                      <span><b>{r.court.locationType}</b> - {r.court.name} ({r.court.sport})</span>
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
                      <span className="reserva-icon">{getLocationTypeIcon(r.court.locationType)}</span>
                      <span><b>{r.court.locationType}</b> - {r.court.name} ({r.court.sport})</span>
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