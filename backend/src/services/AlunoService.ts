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

// serviço para validar login do aluno (matrícula + email)
export const validarLoginAlunoService = async (matricula: string, email: string): Promise<HttpResponseModel> => {
    try {
        console.log('Service: Validando login do aluno:', { matricula, email });
        
        const aluno = await AlunoRepository.buscarAlunoPorMatriculaEEmail(matricula, email);

        if (aluno) {
            console.log('Service: Login válido, aluno encontrado:', aluno._id);
            return await HttpResponse.ok({
                message: "Login válido",
                aluno: aluno
            });
        } else {
            console.log('Service: Login inválido - aluno não encontrado');
            return {
                statusCode: StatusCode.UNAUTHORIZED,
                body: {
                    message: "Matrícula ou email inválidos"
                }
            };
        }
    } catch (error) {
        console.error("Erro ao validar login do aluno: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message: "Erro ao validar login"
            }
        }
    }
}

// serviço para criar um novo aluno
export const criarAlunoService = async (dadosAluno: { 
    nome: string; 
    email: string; 
    matricula: string; 
    esporte: string 
}): Promise<HttpResponseModel> => {
    console.log('Service: Iniciando serviço de criação de aluno');
    try {
        // Validações básicas
        if (!dadosAluno.nome || !dadosAluno.email || !dadosAluno.matricula || !dadosAluno.esporte) {
            return {
                statusCode: StatusCode.BAD_REQUEST,
                body: {
                    message: "Todos os campos são obrigatórios"
                }
            }
        }

        // Validar formato da matrícula
        if (!/^\d{7}$/.test(dadosAluno.matricula)) {
            return {
                statusCode: StatusCode.BAD_REQUEST,
                body: {
                    message: "Matrícula deve ter exatamente 7 dígitos"
                }
            }
        }

        // Validar formato do email
        if (!/@edu\.unifor\.br$/.test(dadosAluno.email)) {
            return {
                statusCode: StatusCode.BAD_REQUEST,
                body: {
                    message: "Email deve ser do domínio @edu.unifor.br"
                }
            }
        }

        // Verificar se já existe um aluno com a mesma matrícula
        console.log('Service: Verificando matrícula existente:', dadosAluno.matricula);
        const alunoExistentePorMatricula = await AlunoRepository.buscarAlunoPorMatricula(dadosAluno.matricula);

        if (alunoExistentePorMatricula) {
            console.log('Service: Matrícula já existe');
            return {
                statusCode: StatusCode.CONFLICT,
                body: {
                    message: "Já existe um aluno com essa matrícula"
                }
            }
        }

        // Verificar se já existe um aluno com o mesmo email
        console.log('Service: Verificando email existente:', dadosAluno.email);
        const alunoExistentePorEmail = await AlunoRepository.buscarAlunoPorEmail(dadosAluno.email);

        if (alunoExistentePorEmail) {
            console.log('Service: Email já existe');
            return {
                statusCode: StatusCode.CONFLICT,
                body: {
                    message: "Já existe um aluno com esse email"
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

    } catch (error: any) {
        console.error("Service: Erro ao criar aluno:", error);
        
        // Tratar erros de validação do Mongoose
        if (error.name === 'ValidationError') {
            return {
                statusCode: StatusCode.BAD_REQUEST,
                body: {
                    message: "Dados inválidos",
                    details: error.message
                }
            }
        }
        
        // Tratar erro de duplicação (índice único)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return {
                statusCode: StatusCode.CONFLICT,
                body: {
                    message: `Já existe um aluno com esse ${field}`
                }
            }
        }
        
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
        email?: string;
        matricula?: string;
        esporte?: string;
    }
): Promise<HttpResponseModel> => {
    
    try {
        const alunoExistente = await AlunoRepository.buscarAlunoPorId(id);

        // verificar se o aluno existe
        if (!alunoExistente) {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: {
                    message: "Aluno não encontrado"
                }
            }
        }

        // se estiver tentando atualizar a matrícula, vai verificar se já existe outro aluno com a mesma matrícula
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

        // se estiver tentando atualizar o email, vai verificar se já existe outro aluno com o mesmo email
        if (dadosAtualizadosAluno.email && dadosAtualizadosAluno.email !== alunoExistente.email) {
            const alunoComMesmoEmail = await AlunoRepository.buscarAlunoPorEmail(dadosAtualizadosAluno.email);

            if (alunoComMesmoEmail && alunoComMesmoEmail.id !== id) {
                return {
                    statusCode: StatusCode.CONFLICT,
                    body: {
                        message: "Já existe um aluno com esse email"
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