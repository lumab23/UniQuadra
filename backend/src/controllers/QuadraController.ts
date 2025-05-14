import { RequestHandler } from 'express';
import QuadraServices from '../services/QuadraServices';

class QuadraController {
    criarQuadra: RequestHandler = async (req, res) => {
        try {
            const quadra = await QuadraServices.criarQuadra(req.body);
            res.status(201).json(quadra);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    listarQuadra: RequestHandler = async (req, res) => {
        try {
            const quadras = await QuadraServices.listarQuadra();
            res.status(200).json(quadras);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    buscarQuadraPorId: RequestHandler = async (req, res) => {
        try {
            const quadra = await QuadraServices.buscarQuadraPorId(req.params.id);
            quadra ? res.status(200).json(quadra)
                   : res.status(404).json({ error: 'Quadra não encontrada' });
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    buscarQuadraPorModalidade: RequestHandler = async (req, res) => {
        try {
            const quadra = await QuadraServices.buscarQuadraPorModalidade(req.params.modalidade);
            quadra ? res.status(200).json(quadra)
                   : res.status(404).json({ error: 'Quadra não encontrada' });
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    atualizarQuadra: RequestHandler = async (req, res) => {
        try {
            const quadraAtualizada = await QuadraServices.atualizarQuadra(req.params.id, req.body);
            res.status(200).json(quadraAtualizada);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    deletarQuadra: RequestHandler = async (req, res) => {
        try {
            await QuadraServices.deletarQuadra(req.params.id);
            res.status(204).send();
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}

export default new QuadraController();