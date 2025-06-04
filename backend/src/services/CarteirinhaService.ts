import * as HttpResponse from "../utils/http-helper";
import * as CarteirinhaRepository from "../repositories/CarteirinhaRepository";
import * as AlunoRepository from "../repositories/AlunoRepository";
import HttpResponseModel from "../models/http-response-model";
import { StatusCode } from "../utils/statusCode";
import Carteirinha from "../models/Carteirinha";

// Função auxiliar para gerar um código único para a carteirinha
const gerarCodigoCarteirinha = (): string => {
    // Formato: CXXXXXX-YYYY (C de Carteirinha, X são números aleatórios, Y é o ano atual)
    const random = Math.floor(100000 + Math.random() * 900000); // 6 dígitos aleatórios
    const ano = new Date().getFullYear();
    return `C${random}-${ano}`;
};

// Serviço para buscar todas as carteirinhas
export const buscarTodasAsCarteirinhasService = async (): Promise<HttpResponseModel> => {
    try {
        const data = await CarteirinhaRepository.buscarTodasCarteirinhas();
        
        if (data && data.length > 0) {
            return await HttpResponse.ok(data);
        } else {
            return await HttpResponse.noContent();
        }
    } catch (error) {
        console.error("Erro ao buscar carteirinhas:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao buscar carteirinhas" }
        };
    }
};

// Serviço para buscar uma carteirinha pelo ID
export const buscarCarteirinhaPeloIdService = async (id: string): Promise<HttpResponseModel> => {
    try {
        const carteirinha = await CarteirinhaRepository.buscarCarteirinhaPorId(id);
        
        if (carteirinha) {
            return await HttpResponse.ok(carteirinha);
        } else {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: { message: "Carteirinha não encontrada" }
            };
        }
    } catch (error) {
        console.error("Erro ao buscar carteirinha por ID:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao buscar carteirinha" }
        };
    }
};

// Serviço para buscar carteirinhas por aluno
export const buscarCarteirinhaPorAlunoService = async (alunoId: string): Promise<HttpResponseModel> => {
    try {
        // Verifica se o aluno existe
        const aluno = await AlunoRepository.buscarAlunoPorId(alunoId);
        
        if (!aluno) {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: { message: "Aluno não encontrado" }
            };
        }
        
        const carteirinhas = await CarteirinhaRepository.buscarCarteirinhaPeloAlunoId(alunoId);
        
        if (carteirinhas && carteirinhas.length > 0) {
            return await HttpResponse.ok(carteirinhas);
        } else {
            return await HttpResponse.noContent();
        }
    } catch (error) {
        console.error("Erro ao buscar carteirinhas do aluno:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao buscar carteirinhas do aluno" }
        };
    }
};

// Serviço para emitir uma nova carteirinha para um aluno
export const emitirCarteirinhaService = async (alunoId: string): Promise<HttpResponseModel> => {
    console.log('Service: Iniciando serviço de emissão de carteirinha');
    try {
        // Verifica se o aluno existe
        console.log('Service: Verificando existência do aluno:', alunoId);
        const aluno = await AlunoRepository.buscarAlunoPorId(alunoId);

        if (!aluno) {
            console.log('Service: Aluno não encontrado');
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: { message: "Aluno não encontrado" }
            };
        }
        
        // Verifica se o aluno já possui uma carteirinha ativa
        console.log('Service: Verificando carteirinhas existentes do aluno');
        const carteirinhasExistentes = await CarteirinhaRepository.buscarCarteirinhaPeloAlunoId(alunoId);
        
        // Verificação de segurança para garantir que carteirinhasExistentes seja um array
        if (!Array.isArray(carteirinhasExistentes)) {
            console.error('Service: Erro - carteirinhasExistentes não é um array:', carteirinhasExistentes);
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                body: { message: "Erro ao verificar carteirinhas existentes" }
            };
        }
        
        const temCarteirinhaAtiva = carteirinhasExistentes.some(c => c.status === 'ativa');
        
        if (temCarteirinhaAtiva) {
            console.log('Service: Aluno já possui carteirinha ativa');
            return {
                statusCode: StatusCode.CONFLICT,
                body: { message: "O aluno já possui uma carteirinha ativa" }
            };
        }
        
        // Gera um código único para a carteirinha
        console.log('Service: Gerando código da carteirinha');
        const codigo = gerarCodigoCarteirinha();
        
        // Define a data de validade (6 meses a partir da data atual)
        const dataAtual = new Date();
        const validade = new Date(dataAtual);
        validade.setMonth(validade.getMonth() + 6);
        
        // Cria a nova carteirinha
        console.log('Service: Criando nova carteirinha');
        const novaCarteirinha = await CarteirinhaRepository.criarCarteirinha({
            aluno: alunoId,
            codigo,
            dataEmissao: dataAtual,
            validade,
            status: 'ativa'
        });
        
        console.log('Service: Carteirinha criada com sucesso:', novaCarteirinha);
        return {
            statusCode: StatusCode.CREATED,
            body: novaCarteirinha
        };
    } catch (error) {
        console.error("Service: Erro ao emitir carteirinha:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao emitir carteirinha", error: String(error) }
        };
    }
};

// Serviço para atualizar o status de uma carteirinha
export const atualizarStatusCarteirinhaService = async (
    id: string,
    status: 'ativa' | 'vencida' | 'inativa' | 'suspensa'
): Promise<HttpResponseModel> => {
    try {
        // Verifica se a carteirinha existe
        const carteirinha = await CarteirinhaRepository.buscarCarteirinhaPorId(id);

        if (!carteirinha) {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: { message: "Carteirinha não encontrada" }
            };
        }
        
        // Se estiver tentando ativar uma carteirinha, verifica se já existe outra ativa para o mesmo aluno
        if (status === 'ativa' && carteirinha.status !== 'ativa') {
            const alunoId = carteirinha.aluno.toString();
            const carteirinhasDoAluno = await CarteirinhaRepository.buscarCarteirinhaPeloAlunoId(alunoId);
            
            // Verificação de segurança para garantir que carteirinhasDoAluno seja um array
            if (!Array.isArray(carteirinhasDoAluno)) {
                console.error("carteirinhasDoAluno não é um array:", carteirinhasDoAluno);
                return {
                    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                    body: { message: "Erro ao verificar carteirinhas existentes" }
                };
            }
            
            // Verifica se existe outra carteirinha ativa para o mesmo aluno
            const temOutraAtiva = carteirinhasDoAluno.some(c => {
                if (c && typeof c === 'object' && '_id' in c) {
                    const carteirinhaId = String(c._id);
                    return carteirinhaId !== id && c.status === 'ativa';
                }
                return false;
            });
            
            if (temOutraAtiva) {
                return {
                    statusCode: StatusCode.CONFLICT,
                    body: { message: "O aluno já possui outra carteirinha ativa" }
                };
            }
        }
        
        // Atualiza o status da carteirinha
        const carteirinhaAtualizada = await CarteirinhaRepository.atualizarStatusCarteirinha(id, status);
        
        if (!carteirinhaAtualizada) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                body: { message: "Erro ao atualizar status da carteirinha" }
            };
        }
        
        return await HttpResponse.ok(carteirinhaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar status da carteirinha:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao atualizar status da carteirinha" }
        };
    }
};

// Serviço para renovar uma carteirinha
export const renovarCarteirinhaService = async (id: string): Promise<HttpResponseModel> => {
    try {
        // Verifica se a carteirinha existe
        const carteirinha = await CarteirinhaRepository.buscarCarteirinhaPorId(id);

        if (!carteirinha) {
            return {
                statusCode: StatusCode.NOT_FOUND,
                body: { message: "Carteirinha não encontrada" }
            };
        }
        
        // Define a nova data de validade (6 meses a partir da data atual)
        const dataAtual = new Date();
        const novaValidade = new Date(dataAtual);
        novaValidade.setMonth(novaValidade.getMonth() + 6);
        
        // Atualiza a carteirinha
        const carteirinhaAtualizada = await CarteirinhaRepository.atualizarCarteirinha(id, {
            validade: novaValidade,
            status: 'ativa'
        });
        
        if (!carteirinhaAtualizada) {
            return {
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
                body: { message: "Erro ao renovar carteirinha" }
            };
        }
        
        return await HttpResponse.ok(carteirinhaAtualizada);
    } catch (error) {
        console.error("Erro ao renovar carteirinha:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao renovar carteirinha" }
        };
    }
};

// Serviço para verificar e atualizar carteirinhas vencidas
export const verificarCarteirinhasVencidasService = async (): Promise<HttpResponseModel> => {
    try {
        console.log('Service: Iniciando verificação de carteirinhas vencidas');
        const resultado = await CarteirinhaRepository.verificarCarteirinhasVencidas();
        
        const response = {
            carteirinhasAtualizadas: resultado.modifiedCount,
            carteirinhasJaVencidas: resultado.alreadyExpiredCount,
            total: resultado.modifiedCount + resultado.alreadyExpiredCount,
            detalhes: resultado.expiredCarteirinhas.map(c => ({
                id: c._id,
                codigo: c.codigo,
                aluno: typeof c.aluno === 'object' && c.aluno !== null && 'nome' in c.aluno 
                    ? {
                        id: c.aluno._id,
                        nome: c.aluno.nome,
                        matricula: c.aluno.matricula
                      }
                    : c.aluno,
                dataEmissao: c.dataEmissao,
                validade: c.validade,
                status: c.status
            }))
        };
        
        console.log('Service: Verificação concluída:', response);
        return {
            statusCode: StatusCode.OK,
            body: response
        };
    } catch (error) {
        console.error("Erro ao verificar carteirinhas vencidas:", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao verificar carteirinhas vencidas" }
        };
    }
};
