import { Request, Response } from 'express';
import ReservaServices from '../services/ReservaServices';

class ReservaController {
    async criarReserva(req: Request, res: Response) {
        try {
            const reserva = await ReservaServices.criarReserva(req.body);
            res.status(201).json(reserva);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarReservas(req: Request, res: Response) {
        try {
            const reservas = await ReservaServices.listarReserva();
            res.status(200).json(reservas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarReservaPorMatricula(req: Request, res: Response) {
        try {
            const reservas = await ReservaServices.buscarReservaPorMatricula(req.params.matricula);
            res.status(200).json(reservas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarReserva(req: Request, res: Response) {
        try {
            const reserva = await ReservaServices.atualizarReserva(req.params.id, req.body);
            res.status(200).json(reserva);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletarReserva(req: Request, res: Response) {
        try {
            await ReservaServices.deletarReserva(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async adicionarPessoaNaReserva(req: Request, res: Response) {
        try {
            await ReservaServices.adicionarPessoaNaReserva(req.params.id, req.body.matricula);
            res.status(200).json({ message: 'Matrícula adicionada com sucesso' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async qualQuadraDaReserva(req: Request, res: Response) {
        try {
            const quadra = await ReservaServices.qualQuadraDaReserva(req.params.id);
            res.status(200).json(quadra);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new ReservaController();