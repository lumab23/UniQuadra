import HorarioFuncionamentoRepository from '../repositories/HorarioFuncionamentoRepository';

class HorarioFuncionamentoService {
    async criarHorario(dados: any) {
        return await HorarioFuncionamentoRepository.criarHorario(dados);
    }

    async listarHorarios() {
        return await HorarioFuncionamentoRepository.listarHorarios();
    }

    async buscarHorarioPorId(id: string) {
        const horario = await HorarioFuncionamentoRepository.buscarHorarioPorId(id);
        if (!horario) throw new Error('Horário não encontrado');
        return horario;
    }

    async atualizarHorario(id: string, dados: any) {
        const horarioAtualizado = await HorarioFuncionamentoRepository.atualizarHorario(id, dados);
        if (!horarioAtualizado) throw new Error('Horário não encontrado ou não atualizado');
        return horarioAtualizado;
    }

    async deletarHorario(id: string) {
        const deletado = await HorarioFuncionamentoRepository.deletarHorario(id);
        if (!deletado) throw new Error('Horário não encontrado para exclusão');
        return deletado;
    }

    //Consultando a disponibilidade das quadras por modalidade, dia da semana e horárioo
    
    async buscarQuadrasDisponiveis(modalidade: string, diaSemana: string, hora: string) {
        if (!modalidade || !diaSemana || !hora) {
            throw new Error('Parâmetros obrigatórios ausentes: modalidade, diaSemana ou hora');
        }

        const quadrasDisponiveis = await HorarioFuncionamentoRepository.buscarQuadrasDisponiveis(
            modalidade,
            diaSemana,
            hora
        );

        return quadrasDisponiveis;
    }
}

export default new HorarioFuncionamentoService();
