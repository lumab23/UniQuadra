import ReservaRepository from '../repositories/ReservaRepository';
import QuadraRepository from '../repositories/QuadraRepository';
import mongoose from 'mongoose';
import Quadra from '../models/Quadra'; 
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
    
    async adicionarPessoaNaReserva(id: string, matricula: string){
        //para adc pessoa na reserva, temos que saber qual é a reserva
        //para saber a reserva, tem como usar o método qualQuadraDaReserva


        const quadraDaReserva = await ReservaRepository.qualQuadraDaReserva(id);
        const reserva = await ReservaRepository.buscarReservaPorId(id);
        
        //checks

        if (!quadraDaReserva) {
            throw new Error('Quadra não encontrada');
        }
        if (!matricula) {
            throw new Error('Matricula não encontrada');
        }
        if(!reserva){
            throw new Error('Reserva não encontrada');
        }
        if (reserva.matriculas.some(m => m.equals(new mongoose.Types.ObjectId(matricula)))) {
            throw new Error('Matrícula já está na reserva');
        }
        

        const isMatriculado = await ReservaRepository.buscarReservaPorMatricula(matricula);

        if(isMatriculado.length != 0){
            throw new Error('Matricula encontrada!');
        }
        const capacidadeQuadra = await ReservaRepository.capacidadeDaQuadra(id);
       
        if (reserva.matriculas.length >= capacidadeQuadra) {
            throw new Error('Reserva lotada!');
        }
        

        //adiciona a matricula na quadra
        reserva.matriculas.push(new mongoose.Types.ObjectId(matricula));
        await reserva.save();

    }

}

export default new ReservaServices();
