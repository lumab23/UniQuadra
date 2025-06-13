import express, { RequestHandler } from "express";
import {
    buscarTodasCarteirinhas,
    buscarCarteirinhaPorId,
    buscarCarteirinhaPorAluno,
    emitirCarteirinha,
    atualizarStatusCarteirinha,
    renovarCarteirinha,
    verificarCarteirinhasVencidas,
    validarCarteirinha
} from "../controllers/CarteirinhaController";

const router = express.Router();

// Middleware de log para todas as rotas
router.use((req, res, next) => {
    console.log('Routes: Nova requisição:', {
        method: req.method,
        path: req.path,
        body: req.body,
        params: req.params,
        query: req.query
    });
    next();
});

router.get('/verificar/vencidas', verificarCarteirinhasVencidas as RequestHandler);
router.post('/emitir', emitirCarteirinha as RequestHandler);
router.post('/validar', validarCarteirinha as RequestHandler);
router.get('/aluno/:alunoId', buscarCarteirinhaPorAluno as RequestHandler);
router.put('/:id/status', atualizarStatusCarteirinha as RequestHandler);
router.put('/:id/renovar', renovarCarteirinha as RequestHandler);
router.get('/:id', buscarCarteirinhaPorId as RequestHandler);
router.get('/', buscarTodasCarteirinhas as RequestHandler);

export default router;