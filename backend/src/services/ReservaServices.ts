import { buscarAlunoPorMatricula } from './../repositories/AlunoRepository';
import ReservaRepository from '../repositories/ReservaRepository';
import QuadraRepository from '../repositories/QuadraRepository';
import mongoose from 'mongoose';
import Quadra from '../models/Quadra'; 
import AlunoRepository from '../repositories/AlunoRepository';
import QuadraSchema from '../models/Quadra';

class ReservaServices {
    async criarReserva(dados: any){
        return await ReservaRepository.criarReserva(dados);
    }
    async listarReserva(){
        return await ReservaRepository.listarReserva();
    }
    async buscarReservaPorMatricula(matricula: string){
        return await ReservaRepository.buscarReservaPorMatricula(matricula);
    }
    async atualizarReserva(id: string, dados: any){
        return await ReservaRepository.atualizarReserva(id, dados);
    }
    async deletarReserva(id: string){
        return await ReservaRepository.deletarReserva(id);
    }
    async salvar(reserva: any) {
        return await ReservaRepository.salvar(reserva);
    }
    async qualQuadraDaReserva(id: string){
        const quadra = await ReservaRepository.qualQuadraDaReserva(id);
        return quadra;
    }
    
    async adicionarPessoaNaReserva(id: string, matricula: string) {
        const aluno = await AlunoRepository.buscarAlunoPorMatricula(matricula);
        if (!aluno) throw new Error('Aluno não encontrado');
    
        const reserva = await ReservaRepository.buscarReservaPorId(id);
        if (!reserva) throw new Error('Reserva não encontrada');
    
        // Correção aplicada aqui:
        const alunoJaAdicionado = reserva.matriculas.some((m: mongoose.Types.ObjectId) => 
            m.equals(new mongoose.Types.ObjectId(aluno._id as string))
        );
    
        if (alunoJaAdicionado) throw new Error('Aluno já está nesta reserva');
    
        // Restante do método permanece igual...
        reserva.matriculas.push(new mongoose.Types.ObjectId(aluno._id as string));
        await reserva.save();
    }

}

export default new ReservaServices();
