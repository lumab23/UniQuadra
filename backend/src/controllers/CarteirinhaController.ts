import { Request, Response } from 'express';
import * as CarteirinhaService from '../services/CarteirinhaService';
import { StatusCode } from '../utils/statusCode';
import Carteirinha from '../models/Carteirinha'; // Importando o modelo Carteirinha
// import { Carteirinha } from '../models/Carteirinha'; // Importando o modelo Carteirinha

// buscar todas as carteirinhas
export const buscarTodasCarteirinhas = async (req: Request, res: Response) => {
    const httpResponse = await CarteirinhaService.buscarTodasAsCarteirinhasService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// buscar carteirinha por ID
export const buscarCarteirinhaPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const httpResponse = await CarteirinhaService.buscarCarteirinhaPeloIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// buscar carteirinhas por aluno
export const buscarCarteirinhaPorAluno = async (req: Request, res: Response) => {
    const { alunoId } = req.params;
    const httpResponse = await CarteirinhaService.buscarCarteirinhaPorAlunoService(alunoId);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// emitir nova carteirinha
export const emitirCarteirinha = async (req: Request, res: Response) => {
    console.log('Controller: Iniciando emissão de carteirinha');
    const { alunoId } = req.body;
    console.log('Controller: Dados recebidos:', { alunoId });

    if (!alunoId) {
        console.log('Controller: Dados inválidos - alunoId faltando');
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "ID do aluno é obrigatório"
        });
    }

    console.log('Controller: Chamando serviço de emissão');
    const httpResponse = await CarteirinhaService.emitirCarteirinhaService(alunoId);
    console.log('Controller: Resposta do serviço:', httpResponse);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// atualizar status da carteirinha
export const atualizarStatusCarteirinha = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['ativa', 'vencida'].includes(status)) {
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Status deve ser 'ativa' ou 'vencida'"
        });
    }

    const httpResponse = await CarteirinhaService.atualizarStatusCarteirinhaService(id, status);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// renovar carteirinha
export const renovarCarteirinha = async (req: Request, res: Response) => {
    const { id } = req.params;
    const httpResponse = await CarteirinhaService.renovarCarteirinhaService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// verificar carteirinhas vencidas
export const verificarCarteirinhasVencidas = async (req: Request, res: Response) => {
    const httpResponse = await CarteirinhaService.verificarCarteirinhasVencidasService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const validarCarteirinha = async (req: Request, res: Response) => {
  const { matricula, email } = req.body;

  if (!matricula || !email) {
    return res.status(400).json({ message: 'Matrícula e email são obrigatórios.' });
  }

  if (!email.endsWith('@edu.unifor.br')) {
    return res.status(400).json({ message: 'Email deve ser @edu.unifor.br.' });
  }

  try {
    const carteirinha = await Carteirinha.findOne({ matricula, email });
    
    if (!carteirinha) {
      return res.status(404).json({ message: 'Carteirinha não encontrada.', valid: false });
    }

    res.status(200).json({ valid: true, carteirinha });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao validar a carteirinha.', error });
  }
};