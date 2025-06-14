import { buscarAlunoPorMatricula } from '../repositories/AlunoRepository';
import ReservaRepository from '../repositories/ReservaRepository';
import QuadraRepository from '../repositories/QuadraRepository';
import mongoose from 'mongoose';
import Quadra from '../models/Quadra'; 
import * as AlunoRepository from '../repositories/AlunoRepository';
import QuadraSchema from '../models/Quadra';

class ReservaService {
    async criarReserva(dados: any){
        // Validar se a quadra existe
        const quadra = await QuadraRepository.buscarQuadraPorId(dados.quadra);
        if (!quadra) {
            throw new Error('Quadra não encontrada');
        }

        // Validar se a data é futura
        const dataReserva = new Date(dados.data);
        if (dataReserva < new Date()) {
            throw new Error('A data da reserva deve ser futura');
        }

        // Validar se há conflito de horário
        const reservasExistentes = await ReservaRepository.listarReserva();
        const conflito = reservasExistentes.some((reserva: any) => {
            const dataExistente = new Date(reserva.data);
            return dataExistente.getTime() === dataReserva.getTime() && 
                   reserva.quadra.toString() === dados.quadra;
        });

        if (conflito) {
            throw new Error('Já existe uma reserva para este horário nesta quadra');
        }

        // Converter os IDs dos alunos para ObjectId
        const matriculasObjectIds = dados.matriculas.map((id: string) => new mongoose.Types.ObjectId(id));

        // Validar se as matrículas existem
        for (const matriculaId of matriculasObjectIds) {
            try {
                const aluno = await AlunoRepository.buscarAlunoPorId(matriculaId);
                if (!aluno) {
                    throw new Error(`Aluno com ID ${matriculaId} não encontrado`);
                }
            } catch (error) {
                if (error instanceof mongoose.Error.CastError) {
                    throw new Error(`ID de aluno inválido: ${matriculaId}`);
                }
                throw error;
            }
        }

        // Validar se não excede a capacidade da quadra
        if (matriculasObjectIds.length > quadra.capacidade) {
            throw new Error(`A quadra suporta apenas ${quadra.capacidade} pessoas`);
        }

        // Criar a reserva com os ObjectIds convertidos
        const dadosReserva = {
            ...dados,
            matriculas: matriculasObjectIds
        };

        return await ReservaRepository.criarReserva(dadosReserva);
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

export default new ReservaService();
