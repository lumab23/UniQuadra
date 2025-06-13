import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001/api",
});

export const reservaService = {
  criarReserva: async (dados: {
    quadra: string;
    data: Date;
    matriculas: string[];
  }) => {
    try {
      console.log('Enviando dados da reserva:', dados);
      
      // Primeiro, busca os IDs dos alunos
      const alunosIds = await Promise.all(
        dados.matriculas.map(async (matricula) => {
          const response = await api.get(`/alunos/matricula/${matricula}`);
          return response.data._id;
        })
      );

      // Depois, cria a reserva com os IDs dos alunos
      const response = await api.post('/reservas', {
        quadra: dados.quadra,
        data: dados.data.toISOString(),
        matriculas: alunosIds
      });
      
      console.log('Resposta da criação da reserva:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar reserva:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erro ao criar reserva');
    }
  },

  listarReservas: async () => {
    try {
      const response = await api.get('/reservas');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao listar reservas');
    }
  },

  buscarReservasPorMatricula: async (matricula: string) => {
    try {
      const response = await api.get(`/reservas/${matricula}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar reservas');
    }
  }
};

export default api;