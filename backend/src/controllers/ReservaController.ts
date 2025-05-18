import { RequestHandler } from 'express';
import ReservaServices from '../services/ReservaServices';

class ReservaController {
    criarReserva: RequestHandler = async (req, res) => {
        try {
            const reserva = await ReservaServices.criarReserva(req.body);
            res.status(201).json(reserva);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    listarReserva: RequestHandler = async (req, res) => {
        try {
            const reservas = await ReservaServices.listarReserva();
            res.status(200).json(reservas);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    buscarReservaPorMatricula: RequestHandler = async (req, res) => {
        try {
            const reservas = await ReservaServices.buscarReservaPorMatricula(req.params.matricula);
            res.status(200).json(reservas);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    atualizarReserva: RequestHandler = async (req, res) => {
        try {
            const reservaAtualizada = await ReservaServices.atualizarReserva(req.params.id, req.body);
            res.status(200).json(reservaAtualizada);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    deletarReserva: RequestHandler = async (req, res) => {
        try {
            await ReservaServices.deletarReserva(req.params.id);
            res.status(204).send();
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    adicionarPessoaNaReserva: RequestHandler = async (req, res) => {
        try {
            await ReservaServices.adicionarPessoaNaReserva(req.params.id, req.body.matricula);
            res.status(200).json({ message: 'Matrícula adicionada com sucesso' });
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}

export default new ReservaController();