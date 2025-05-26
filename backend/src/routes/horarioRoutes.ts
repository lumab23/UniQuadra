import { Router } from 'express';
import HorarioFuncionamentoController from '../controllers/HorarioFuncionamentoController';

const router = Router();

// CRUD
router.post('/', HorarioFuncionamentoController.criarHorario);
router.get('/', HorarioFuncionamentoController.listarHorarios);
router.get('/:id', HorarioFuncionamentoController.buscarHorarioPorId);
router.put('/:id', HorarioFuncionamentoController.atualizarHorario);
router.delete('/:id', HorarioFuncionamentoController.deletarHorario);

// [RF04] Consulta de disponibilidade
// Exemplo de uso: GET /horarios/disponiveis?modalidade=futebol&diaSemana=segunda-feira&hora=10:00
router.get('/disponiveis/buscar', HorarioFuncionamentoController.buscarQuadrasDisponiveis);

export default router;
