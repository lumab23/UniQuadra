import mongoose from 'mongoose';
import Quadra from '../models/Quadra';
import Reserva from '../models/Reserva';

class ReservaRepository {
    async criarReserva(dados: any){
        const reservaNova = new Reserva(dados);
        return await reservaNova.save();
    }
    async listarReserva(){
        return await Reserva.find()
            .populate({
                path: 'matriculas',
                model: 'Aluno',
                select: 'nome matricula email'
            })
            .populate({
                path: 'quadra',
                model: 'Quadra',
                select: 'modalidade'
            })
            .lean();
    }
    async buscarReservaPorMatricula(matricula: string){
        const aluno = await mongoose.model('Aluno').findOne({ matricula });
        if (!aluno) return [];
        return await Reserva.find({ matriculas: aluno._id }).populate('matriculas');
    }
    async buscarReservaPorId(id: string){
        return await Reserva.findById(id);
    }
    async atualizarReserva(id: string, dados: any){
        return await Reserva.findByIdAndUpdate(id, dados, { new: true });
    }
    async deletarReserva(id: string){
        return await Reserva.findByIdAndDelete(id);
    }
    async salvar(reserva: any) {
        return await reserva.save();
    }
    async qualQuadraDaReserva(id: string){
        const quadra = await Reserva.findById(id).populate('quadra');
        //Ele substitui o ID da quadra pelo objeto completo da quadra. 

        if (!quadra) {
            throw new Error('Quadra não encontrada');
        }
    
        return quadra.quadra;
    }
    async capacidadeDaQuadra(id:string){
        //ficou diferente assim pq ele tava identificando como objectID e nao dava para ler a informaçao da capacidade
        const quadra = await Reserva.findById(id).populate<{ quadra: { capacidade: number } }>('quadra');

        if (!quadra) {
            throw new Error('Quadra não encontrada');
        }

        return await quadra.quadra.capacidade;
    }
}

export default new ReservaRepository();