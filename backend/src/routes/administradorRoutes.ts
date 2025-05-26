import express, {RequestHandler } from "express";
import {
    buscarTodosAdministradores,
    buscarAdministradorPorId,
    buscarAdministradorPorMatricula,
    criarAdministrador,
    atualizarAdministrador,
    removerAdministrador} from "../controllers/AdministradorController";

const router = express.Router();

router.get('/', buscarTodosAdministradores as RequestHandler);
router.get('/matricula/:matricula', buscarAdministradorPorMatricula as RequestHandler);
router.get('/:id', buscarAdministradorPorId as RequestHandler);
router.post('/', criarAdministrador as RequestHandler);
router.put('/:id', atualizarAdministrador as RequestHandler);
router.delete('/:id', removerAdministrador as RequestHandler);

export default router;