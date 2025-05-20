import HorarioFuncionamento from '../models/HorarioFuncionamento';
import Quadra from '../models/Quadra';

class HorarioFuncionamentoRepository {
    async criarHorario(dados: any) {
        const horario = new HorarioFuncionamento(dados);
        return await horario.save();
    }

    // listando os horarios
    async listarHorarios() {
        return await HorarioFuncionamento.find().populate('quadraId');
    }

    // buscando oshorarios por id
    async buscarHorarioPorId(id: string) {
        return await HorarioFuncionamento.findById(id).populate('quadraId');
    }


    // buscando horario por quadra
    async buscarHorariosPorQuadra(quadraId: string) {
        return await HorarioFuncionamento.find({ quadraId }).populate('quadraId');
    }

    // P atualizar o horario, busca e faz o update
    async atualizarHorario(id: string, dados: any) {
        return await HorarioFuncionamento.findByIdAndUpdate(id, dados, { new: true });
    }

    async deletarHorario(id: string) {
        return await HorarioFuncionamento.findByIdAndDelete(id);
    }

    // // fAz a Consulta por disponibilidade
    async buscarQuadrasDisponiveis(modalidade: string, diaSemana: string, hora: string) {
        const quadrasComModalidade = await Quadra.find({ modalidade, status: 'disponível' });

        const idsQuadras = quadrasComModalidade.map(q => q._id);

        return await HorarioFuncionamento.find({
            quadraId: { $in: idsQuadras },
            diaSemana,
            horaInicio: { $lte: hora },
            horaFim: { $gt: hora },
        }).populate('quadraId');
    }
}

export default new HorarioFuncionamentoRepository();
