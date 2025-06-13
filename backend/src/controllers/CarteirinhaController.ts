import { Request, Response } from 'express';
import * as CarteirinhaService from '../services/CarteirinhaService';
import { StatusCode } from '../utils/statusCode';
import Carteirinha from '../models/Carteirinha'; // Importando o modelo Carteirinha
import Aluno from '../models/Aluno'; // Importando o modelo Aluno
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
  console.log('Controller: Iniciando validação de carteirinha');
  const { matricula, email } = req.body;
  console.log('Controller: Dados recebidos:', { matricula, email });

  if (!matricula || !email) {
    console.log('Controller: Dados inválidos - matrícula ou email faltando');
    return res.status(400).json({ 
      message: 'Matrícula e email são obrigatórios.',
      valid: false 
    });
  }

  if (!email.endsWith('@edu.unifor.br')) {
    console.log('Controller: Email inválido - não é @edu.unifor.br');
    return res.status(400).json({ 
      message: 'Email deve ser @edu.unifor.br.',
      valid: false 
    });
  }

  if (!/^\d{7}$/.test(matricula)) {
    console.log('Controller: Matrícula inválida - deve ter 7 dígitos');
    return res.status(400).json({ 
      message: 'Matrícula deve ter exatamente 7 dígitos.',
      valid: false 
    });
  }

  try {
    console.log('Controller: Buscando aluno...');
    // Primeiro, busca o aluno pelo email e matrícula
    const aluno = await Aluno.findOne({ 
      email: email.toLowerCase(), 
      matricula: matricula.trim() 
    });
    console.log('Controller: Resultado da busca do aluno:', aluno);
    
    if (!aluno) {
      console.log('Controller: Aluno não encontrado');
      return res.status(404).json({ 
        message: 'Aluno não encontrado. Verifique se a matrícula e o email estão corretos.',
        valid: false 
      });
    }

    console.log('Controller: Buscando carteirinha...');
    // Depois, busca a carteirinha do aluno
    const carteirinha = await Carteirinha.findOne({ 
      aluno: aluno._id, 
      status: 'ativa' 
    }).populate('aluno');
    console.log('Controller: Resultado da busca da carteirinha:', carteirinha);
    
    if (!carteirinha) {
      console.log('Controller: Carteirinha não encontrada ou inativa');
      return res.status(404).json({ 
        message: 'Carteirinha não encontrada ou inativa. Entre em contato com a administração.',
        valid: false 
      });
    }

    // Verifica se a carteirinha está válida
    const hoje = new Date();
    if (carteirinha.validade < hoje) {
      console.log('Controller: Carteirinha vencida');
      return res.status(400).json({ 
        message: 'Carteirinha vencida. Por favor, renove sua carteirinha.',
        valid: false 
      });
    }

    console.log('Controller: Validação bem-sucedida');
    res.status(200).json({ 
      valid: true, 
      carteirinha,
      message: 'Carteirinha válida.'
    });
  } catch (error) {
    console.error('Controller: Erro ao validar carteirinha:', error);
    res.status(500).json({ 
      message: 'Erro ao validar a carteirinha. Tente novamente mais tarde.',
      valid: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
};