import { Request, Response, RequestHandler } from 'express';
import HorarioFuncionamentoService from '../services/HorarioFuncionamentoService';
import { StatusCode } from '../utils/statusCode';

class HorarioFuncionamentoController {
    criarHorario: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const horario = await HorarioFuncionamentoService.criarHorario(req.body);
            res.status(StatusCode.CREATED).json(horario);
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };

    listarHorarios: RequestHandler = async (_req: Request, res: Response) => {
        try {
            const horarios = await HorarioFuncionamentoService.listarHorarios();
            res.status(StatusCode.OK).json(horarios);
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };

    buscarHorarioPorId: RequestHandler = async (req: Request, res: Response) => {
        try {
            const horario = await HorarioFuncionamentoService.buscarHorarioPorId(req.params.id);
            res.status(StatusCode.OK).json(horario);
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };

    atualizarHorario: RequestHandler = async (req: Request, res: Response) => {
        try {
            const horarioAtualizado = await HorarioFuncionamentoService.atualizarHorario(req.params.id, req.body);
            res.status(StatusCode.OK).json(horarioAtualizado);
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };

    deletarHorario: RequestHandler = async (req: Request, res: Response) => {
        try {
            await HorarioFuncionamentoService.deletarHorario(req.params.id);
            res.status(StatusCode.NO_CONTENT).send();
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };

    buscarQuadrasDisponiveis: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { modalidade, diaSemana, hora } = req.query;

            if (!modalidade || !diaSemana || !hora) {
                res.status(StatusCode.BAD_REQUEST).json({
                    error: 'Parâmetros "modalidade", "diaSemana" e "hora" são obrigatórios'
                });
                return;
            }

            const quadrasDisponiveis = await HorarioFuncionamentoService.buscarQuadrasDisponiveis(
                String(modalidade),
                String(diaSemana),
                String(hora)
            );

            res.status(StatusCode.OK).json(quadrasDisponiveis);
        } catch (e: any) {
            res.status(StatusCode.BAD_REQUEST).json({ error: e.message });
        }
    };
}

export default new HorarioFuncionamentoController();
