import { RequestHandler } from 'express';
import ReservaService from '../services/ReservaService';

class ReservaController {
    criarReserva: RequestHandler = async (req, res) => {
        try {
            console.log('Controller: Recebendo dados para criar reserva:', req.body); // Log do corpo da requisição
            const reserva = await ReservaService.criarReserva(req.body);
            console.log('Controller: Reserva criada com sucesso:', reserva); // Log de sucesso
            res.status(201).json(reserva);
        } catch (e: any) {
            console.error('Controller: Erro ao criar reserva:', e.message); // Log do erro
            res.status(400).json({ error: e.message });
        }
    };
    listarReserva: RequestHandler = async (req, res) => {
        try {
            const reservas = await ReservaService.listarReserva();
            res.status(200).json(reservas);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    buscarReservaPorMatricula: RequestHandler = async (req, res) => {
        try {
            const reservas = await ReservaService.buscarReservaPorMatricula(req.params.matricula);
            res.status(200).json(reservas);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    atualizarReserva: RequestHandler = async (req, res) => {
        try {
            const reservaAtualizada = await ReservaService.atualizarReserva(req.params.id, req.body);
            res.status(200).json(reservaAtualizada);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    deletarReserva: RequestHandler = async (req, res) => {
        try {
            await ReservaService.deletarReserva(req.params.id);
            res.status(204).send();
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    adicionarPessoaNaReserva: RequestHandler = async (req, res) => {
        try {
            await ReservaService.adicionarPessoaNaReserva(req.params.id, req.body.matricula);
            res.status(200).json({ message: 'Matrícula adicionada com sucesso' });
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}

export default new ReservaController();