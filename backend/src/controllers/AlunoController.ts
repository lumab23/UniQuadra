import { Request, Response } from 'express';
import * as AlunoService from '../services/AlunoService';
import { StatusCode } from '../utils/statusCode';

// buscar todos os alunos
export const buscarTodosAlunos = async (req: Request, res: Response) => {
    const httpResponse = await AlunoService.buscarTodosAlunosService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// buscar aluno por id
export const buscarAlunoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const httpResponse = await AlunoService.buscarAlunoPorIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// buscar aluno por matrícula
export const buscarAlunoPorMatricula = async (req: Request, res: Response) => {
    const { matricula } = req.params;
    const httpResponse = await AlunoService.buscarAlunoPorMatriculaService(matricula);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// validar login do aluno (matrícula + email)
export const validarLoginAluno = async (req: Request, res: Response) => {
    console.log('Controller: Iniciando validação de login');
    const { matricula, email } = req.body;
    console.log('Controller: Dados recebidos:', { matricula, email });

    if (!matricula || !email) {
        console.log('Controller: Dados inválidos - matrícula ou email faltando');
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Matrícula e email são obrigatórios"
        }); 
    }

    console.log('Controller: Chamando serviço de validação');
    const httpResponse = await AlunoService.validarLoginAlunoService(matricula, email);
    console.log('Controller: Resposta do serviço:', httpResponse);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// criar um novo aluno
export const criarAluno = async (req: Request, res: Response) => {
    console.log('Controller: Iniciando criação de aluno');
    const { nome, email, matricula, esporte } = req.body;
    console.log('Controller: Dados recebidos:', { nome, email, matricula, esporte });

    if (!nome || !email || !matricula || !esporte) {
        console.log('Controller: Dados inválidos - campos obrigatórios faltando');
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Nome, email, matrícula e esporte são obrigatórios"
        }); 
    }

    console.log('Controller: Chamando serviço de criação');
    const httpResponse = await AlunoService.criarAlunoService({ nome, email, matricula, esporte });
    console.log('Controller: Resposta do serviço:', httpResponse);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// atualizar os dados de um aluno
export const atualizarAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, matricula, esporte } = req.body;

    if (!nome && !email && !matricula && !esporte) {
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Pelo menos um campo deve ser fornecido para atualização"
        }); 
    }

    const httpResponse = await AlunoService.atualizarAlunoService(id, { nome, email, matricula, esporte });
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// remover um aluno
export const removerAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const httpResponse = await AlunoService.removerAlunoService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}