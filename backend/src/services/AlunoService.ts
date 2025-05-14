import * as HttpResponse from "../utils/http-helper";
import * as AlunoRepository from "../repositories/AlunoRepository";
import HttpResponseModel from "../models/http-response-model";
import { StatusCode } from "../utils/statusCode";

// serviço para buscar todos os alunos
export const buscarTodosAlunosService = async (): Promise<HttpResponseModel> => {
    try {
        const data = await AlunoRepository.buscarTodosAlunos();
        if (data && data.length > 0) {
            return await HttpResponse.ok(data);
        } else {
            return await HttpResponse.noContent();
        }
    } catch (error) {
        console.error("Erro ao buscar alunos: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { 
                message: "Erro ao buscar alunos"
            }
        }
        
    }
}

// serviço para buscar um aluno pelo id
export const buscarAlunoPorIdService = async (id: string): Promise<HttpResponseModel> => {
    try {
        const aluno = await AlunoRepository.buscarAlunoPorId(id);
        
        if (aluno) {
            return await HttpResponse.ok(aluno);
        } else {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: {
                    message: "Aluno não encontrado por id"
                }
            };
        }
    } catch (error) {
        console.error("Erro ao buscar aluno por id: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { 
                message: "Erro ao buscar aluno por id"
            }
        }
    }
}

// serviço para buscar um aluno por matrícula
export const buscarAlunoPorMatriculaService = async (matricula: string): Promise<HttpResponseModel> => {
    try {
        const aluno = await AlunoRepository.buscarAlunoPorMatricula(matricula);

        if (aluno) {
            return await HttpResponse.ok(aluno);
        } else {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: {
                    message: "Aluno não encontrado por matrícula"
                }
            };
        }
    } catch (error) {
        console.error("Erro ao buscar aluno por matrícula: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message: "Erro ao buscar aluno por matrícula"
            }
        }
    }
}

// serviço para criar um novo aluno
export const criarAlunoService = async (dadosAluno: { nome: string; matricula: string }): Promise<HttpResponseModel> => {
    console.log('Service: Iniciando serviço de criação de aluno');
    try {
        // ver se já tem um aluno com a mesma matrícula
        console.log('Service: Verificando matrícula existente:', dadosAluno.matricula);
        const alunoExistente = await AlunoRepository.buscarAlunoPorMatricula(dadosAluno.matricula);

        if (alunoExistente) {
            console.log('Service: Matrícula já existe');
            return {
                statusCode: StatusCode.CONFLICT,
                body: {
                    message: "Já existe um aluno com essa matrícula"
                }
            }
        }

        console.log('Service: Criando novo aluno');
        const novoAluno = await AlunoRepository.criarAluno(dadosAluno);
        console.log('Service: Aluno criado com sucesso:', novoAluno);
        return {
            statusCode: StatusCode.CREATED,
            body: novoAluno
        }

    } catch (error) {
        console.error("Service: Erro ao criar aluno:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message: "Erro ao criar aluno"
            }
        }
    }
}

// serviço para atualizar um aluno
export const atualizarAlunoService = async (
    id: string,
    dadosAtualizadosAluno: {
        nome?: string;
        matricula?: string
    }
): Promise<HttpResponseModel> => {
    
    try {
        const alunoExistente = await AlunoRepository.buscarAlunoPorId(id);

        // vericar se o aluno existe
        if (!alunoExistente) {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: {
                    message: "Aluno não encontrado"
                }
            }
        }

        // se estiver tentando atualizar a matrícula, vai verificar se já existe outro aluno come a mesma matrícula
        if (dadosAtualizadosAluno.matricula && dadosAtualizadosAluno.matricula !== alunoExistente.matricula) {
            const alunoComMesmaMatricula = await AlunoRepository.buscarAlunoPorMatricula(dadosAtualizadosAluno.matricula);

            if (alunoComMesmaMatricula && alunoComMesmaMatricula.id !== id) {
                return {
                    statusCode: StatusCode.CONFLICT,
                    body: {
                        message: "Já existe um aluno com essa matrícula"
                    }
                }
            }
        }

        const alunoAtualizado = await AlunoRepository.atualizarAluno(id, dadosAtualizadosAluno);
        return await HttpResponse.ok(alunoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar aluno: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message: "Erro ao atualizar aluno"
            }
        }
    }
}

// serviço para remover um aluno
export const removerAlunoService = async (id: string): Promise<HttpResponseModel> => {
    try {
        const alunoExistente = await AlunoRepository.buscarAlunoPorId(id);
        
        // verificar se o aluno existe
        if (alunoExistente) {
            const removido = await AlunoRepository.removerAluno(id);
            return await HttpResponse.ok(removido);
        } else {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: {
                    message: "Aluno não encontrado"
                }
            }
        }
    } catch (error) {
        console.error("Erro ao remover aluno: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message: "Erro ao remover aluno"
            }
        }
    }
}