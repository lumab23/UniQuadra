import Aluno, { IAluno } from "../models/Aluno";

// buscar todos os alunos
export const buscarTodosAlunos = async (): Promise<IAluno[]> => {
	return await Aluno.find().sort({ nome: 1});
}

// buscar um aluno pelo id
export const buscarAlunoPorId = async (id: string): Promise<IAluno | null> => {
    return await Aluno.findById(id);
}

// buscar um aluno por matrícula
export const buscarAlunoPorMatricula = async (matricula: string): Promise<IAluno | null> => {
    return await Aluno.findOne({ matricula });
}

// buscar um aluno por email
export const buscarAlunoPorEmail = async (email: string): Promise<IAluno | null> => {
    return await Aluno.findOne({ email: email.toLowerCase() });
}

// buscar aluno por matrícula E email (para validação de login)
export const buscarAlunoPorMatriculaEEmail = async (matricula: string, email: string): Promise<IAluno | null> => {
    return await Aluno.findOne({ 
        matricula, 
        email: email.toLowerCase() 
    });
}

// criar um novo aluno
export const criarAluno = async (dadosAluno: { 
    nome: string; 
    email: string; 
    matricula: string; 
    esporte: string 
}): Promise<IAluno> => {
    const aluno = new Aluno(dadosAluno);
    return await aluno.save();
}

// atualizar um aluno
export const atualizarAluno = async (
    id: string, 
    dadosAtualizadosAluno: {
        nome?: string; 
        email?: string; 
        matricula?: string; 
        esporte?: string 
    }
): Promise<IAluno | null> => {
    return await Aluno.findByIdAndUpdate(id, dadosAtualizadosAluno, { new: true}); 
}

// remover um aluno
export const removerAluno = async (id: string): Promise<IAluno | null> => {
    return await Aluno.findByIdAndDelete(id);
}