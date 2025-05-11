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

// criar um novo aluno
export const criarAluno = async (req: Request, res: Response) => {
    const { nome, matricula } = req.body;

    if (!nome || !matricula) {
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Nome e matrícula são obrigatórios"
        }); 
    }

    const httpResponse = await AlunoService.criarAlunoService({ nome, matricula });
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// atualizar os dados de um aluno
export const atualizarAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, matricula } = req.body;

    if (!nome && !matricula) {
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Nome ou matrícula são obrigatórios"
        }); 
    }

    const httpResponse = await AlunoService.atualizarAlunoService(id, { nome, matricula });
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

// remover um aluno
export const removerAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const httpResponse = await AlunoService.removerAlunoService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}