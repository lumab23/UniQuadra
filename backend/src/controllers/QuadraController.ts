import { Request, Response } from 'express';
import QuadraServices from '../services/QuadraServices';

class QuadraController {
    async criarQuadra(req: Request, res: Response) {
        try {
            const quadra = await QuadraServices.criarQuadra(req.body);
            res.status(201).json(quadra);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarQuadras(req: Request, res: Response) {
        try {
            const quadras = await QuadraServices.listarQuadra();
            res.status(200).json(quadras);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarQuadraPorId(req: Request, res: Response) {
        try {
            const quadra = await QuadraServices.buscarQuadraPorId(req.params.id);
            if (!quadra) {
                return res.status(404).json({ error: 'Quadra não encontrada' });
            }
            res.status(200).json(quadra);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarQuadraPorModalidade(req: Request, res: Response) {
        try {
            const quadras = await QuadraServices.buscarQuadraPorModalidade(req.params.modalidade);
            res.status(200).json(quadras);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarQuadra(req: Request, res: Response) {
        try {
            const quadra = await QuadraServices.atualizarQuadra(req.params.id, req.body);
            res.status(200).json(quadra);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async mudarStatusQuadra(req: Request, res: Response) {
        try {
            const quadra = await QuadraServices.mudarStatusQuadra(req.body.status, req.params.id);
            res.status(200).json(quadra);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletarQuadra(req: Request, res: Response) {
        try {
            await QuadraServices.deletarQuadra(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new QuadraController();