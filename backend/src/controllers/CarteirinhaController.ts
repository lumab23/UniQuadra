import { Request, Response } from "express";
import * as CarteirinhaService from "../services/CarteirinhaService";
import { StatusCode } from "../utils/statusCode";

// Busca todas as carteirinhas
export const buscarCarteirinhas = async (req: Request, res: Response): Promise<void> => {
    const httpResponse = await CarteirinhaService.buscarTodasAsCarteirinhasService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Busca uma carteirinha pelo ID
export const buscarCarteirinhaPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const httpResponse = await CarteirinhaService.buscarCarteirinhaPeloIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Busca carteirinhas por aluno
export const buscarCarteirinhaPorAluno = async (req: Request, res: Response): Promise<void> => {
    const { alunoId } = req.params;
    const httpResponse = await CarteirinhaService.buscarCarteirinhaPorAlunoService(alunoId);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Emitir uma nova carteirinha para um aluno
export const emitirCarteirinha = async (req: Request, res: Response): Promise<void> => {
    console.log('Request body:', req.body);
    console.log('Controller: Iniciando emissão de carteirinha');
    const { alunoId } = req.body;
    console.log('Controller: Dados recebidos:', { alunoId });
  
    if (!alunoId) {
        console.log('Controller: ID do aluno não fornecido');
        res.status(StatusCode.BAD_REQUEST).json({ 
            message: "ID do aluno é obrigatório" 
        });
        return;
    }
  
    try {
        console.log('Controller: Chamando serviço de emissão');
        const httpResponse = await CarteirinhaService.emitirCarteirinhaService(alunoId);
        console.log('Controller: Resposta do serviço:', httpResponse);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
        console.error('Controller: Erro ao emitir carteirinha:', error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Erro ao processar a solicitação de emissão de carteirinha"
        });
    }
};

// Atualizar o status de uma carteirinha
export const atualizarStatusCarteirinha = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;
    
    // Valida o status informado
    const statusesValidos = ['ativa', 'vencida'];
    
    if (!status || !statusesValidos.includes(status)) {
        res.status(StatusCode.BAD_REQUEST).json({ 
            message: "Status inválido. Os valores permitidos são: ativa, inativa, suspensa ou vencida" 
        });
        return;
    }
    
    const httpResponse = await CarteirinhaService.atualizarStatusCarteirinhaService(
        id, 
        status as 'ativa' | 'vencida'
    );
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Renovar uma carteirinha
export const renovarCarteirinha = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const httpResponse = await CarteirinhaService.renovarCarteirinhaService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Verificar e atualizar carteirinhas vencidas
export const verificarCarteirinhasVencidas = async (req: Request, res: Response): Promise<void> => {
    const httpResponse = await CarteirinhaService.verificarCarteirinhasVencidasService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};