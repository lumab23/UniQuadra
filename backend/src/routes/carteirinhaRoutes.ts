import express, { RequestHandler } from "express";
import {
    buscarCarteirinhas,
    buscarCarteirinhaPorId,
    buscarCarteirinhaPorAluno,
    emitirCarteirinha,
    atualizarStatusCarteirinha,
    renovarCarteirinha,
    verificarCarteirinhasVencidas
} from "../controllers/CarteirinhaController";

const router = express.Router();

router.get('/', buscarCarteirinhas as RequestHandler);
router.get('/:id', buscarCarteirinhaPorId as RequestHandler);
router.get('/aluno/:alunoId', buscarCarteirinhaPorAluno as RequestHandler);
router.post('/emitir', emitirCarteirinha as RequestHandler);
router.put('/:id/status', atualizarStatusCarteirinha as RequestHandler);
router.put('/:id/renovar', renovarCarteirinha as RequestHandler);
router.get('/verificar/vencidas', verificarCarteirinhasVencidas as RequestHandler);

export default router;