import express, { Request, Response, RequestHandler } from "express";
import {
    buscarTodosAlunos,
    buscarAlunoPorId,
    buscarAlunoPorMatricula,
    criarAluno,
    atualizarAluno,
    removerAluno
} from "../controllers/AlunoController";

const router = express.Router();

router.get('/', buscarTodosAlunos as RequestHandler);
router.get('/matricula/:matricula', buscarAlunoPorMatricula as RequestHandler);
router.get('/:id', buscarAlunoPorId as RequestHandler);
router.post('/', criarAluno as RequestHandler);
router.put('/:id', atualizarAluno as RequestHandler);
router.delete('/:id', removerAluno as RequestHandler);

export default router;