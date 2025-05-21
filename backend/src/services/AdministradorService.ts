import * as HttpResponse from "../utils/http-helper";
import * as AdministradorRepository from "../repositories/AdministradorRepository";
import HttpResponseModel from "../models/http-response-model";
import { StatusCode } from "../utils/statusCode";

<<<<<<< Updated upstream
export const buscarTodosadministradoresService = async (): Promise<HttpResponseModel> => {
    try{
        const data = await AdministradorRepository.buscarTodosAdministradores();
        if(data && data.length > 0){
            return await HttpResponse.ok(data);
        }else {
            return await HttpResponse.noContent();
        }
    }catch(error) {
        console.log("Erro ao buscar administradores: ", error);
    return{
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        body:{ 
            message: "Erro ao buscar administradores"
            }
        } 
    }
}

export const buscarAdministradorPorIdService = async(id: string): Promise<HttpResponseModel> =>{
    try{
        const admin = await AdministradorRepository.buscarAdministradorPorId(id);
        if(admin){
            return await HttpResponse.ok(admin);
        }else {
            return{
                statusCode: StatusCode.NOT_FOUND,
                body: { 
                    message: "Administrador não encontrado"
                }
            };

        }
    } catch (error) { 
        console.error("Error ao buscar administrador por id: ", error);
        return{
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {
                message:"Erro ao buscar o administrador por id"
            }
        }
    }
}

export const buscarAdministradorPorMatricula = async (matricula: string): Promise<HttpResponseModel> => {
    try{
        const admin = await AdministradorRepository.buscarAdministradorPorMatricula(matricula);
        if(admin){
            return await HttpResponse.ok(admin);
        }else {
            return{ 
                statusCode: StatusCode.NOT_FOUND,
                body: { 
                    message: "Administrador não encontrado por matrícula"
                }
            };
        }
    } catch(error){
        console.error("Erro ao buscar administrador por matrícula: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body : {
                message:"Erro ao buscar o administrador por matrícula"

            }
        };
    }
}

export const criarAdministradorService = async(dados: {nome: string; matricula: string}): Promise<HttpResponseModel> => {
    try{
        const adminMatriculaExistente = await AdministradorRepository.buscarAdministradorPorMatricula(dados.matricula);
        if(adminMatriculaExistente){
            return{
                statusCode : StatusCode.CONFLICT,
                body: {message: "Já existe um administrador com essa matrícula"}
            };
        }
        const novoAdmin = await AdministradorRepository.criarAdministrador(dados);
        return { 
            statusCode: StatusCode.CREATED,
            body: novoAdmin
        };
    }catch (error){
        console.log("Erro ao criar administrador: ", error);
        return{
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: {message: "Erro ao criar administrador"}
        };
    }
}

export const atualizarAdministradorService = async (
    id: string,
    dadosAtualizados: { nome? : string; matricula?: string}): Promise<HttpResponseModel> => {
    try{
        const adminExistente = await AdministradorRepository.buscarAdministradorPorId(id);
            if(!adminExistente) {
                return{
                    statusCode : StatusCode.NOT_FOUND,
                    body: {message : "Administrador não encontrado"}
                };
            }

            if( 
                dadosAtualizados.matricula && 
                dadosAtualizados.matricula !== adminExistente.matricula
            ) {
                const matriculaEmUso = await AdministradorRepository.buscarAdministradorPorMatricula(dadosAtualizados.matricula)
                if(matriculaEmUso && matriculaEmUso.id !== id){
                    return{
                        statusCode: StatusCode.CONFLICT,
                        body: {message: "Matrícula já em está em uso"}
                    }
                }
            }
            const adminAtualizado = await AdministradorRepository.atualizarAdministrador(id, dadosAtualizados);
            return HttpResponse.ok(adminAtualizado);
    }catch (error){
        console.error ("Erro ao atualizar administrador: ", error);
        return{
            statusCode : StatusCode.INTERNAL_SERVER_ERROR,
            body: {message: "Erro ao atualizar administrador "}
        };
    }
}

export const removerAdministradorService = async (id: string): Promise<HttpResponseModel> =>{
    try{
        const adminExistente = await AdministradorRepository.buscarAdministradorPorId(id);
        if(!adminExistente) {
            return{
                statusCode: StatusCode.NOT_FOUND,
                body: {message: "Administrador não encontrado"}
            };
        }
        const removido = await AdministradorRepository.removerAdministrador(id);
        return HttpResponse.ok(removido);
    }catch(error){
        console.error("Erro ao remover administrador: ", error);
        return {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: { message: "Erro ao remover administrador" }
        };
    }
}
=======
export const criarAdministrador = async (dados: {
    nome: string;
    email: string;
    matricula: string;
}): Promise<IAdministrador> => { 
    return await AdministradorRepository.criarAdministrador(dados);
};

export const buscarTodosAdministradores = async(): Promise <IAdministrador[]> =>{
    return await AdministradorRepository.buscarTodosAdministradores();
};




>>>>>>> Stashed changes
