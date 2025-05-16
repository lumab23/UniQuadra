import { Request, Response } from 'express';
import * as AdministradorService from '../services/AdministradorService';
import { StatusCode } from '../utils/statusCode';


export const buscarTodosAdministradores = async (req: Request, res: Response) => { 
    const httpResponse = await AdministradorService.buscarTodosadministradoresService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const buscarAdministradorPorMatricula = async (req: Request, res: Response) => {
    const { matricula } = req.params;

    const httpResponse = await AdministradorService.buscarAdministradorPorMatriculaService(matricula);

    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const criarAdministrador = async (req: Request, res: Response) => {
    const{nome, matricula} = req.body;

    if(!nome || !matricula){
        return res.status(StatusCode.BAD_REQUEST).json({
            message :"Nome e matrícula são obrigatórios"
        });
    }
    const httpResponse = await AdministradorService.criarAdministradorService({nome, matricula});
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const atualizarAdministrador = async (req: Request, res: Response) => {
    const{id} = req.params;
    const { nome, matricula } = req.body;

    if(!nome && !matricula){
        return res.status(StatusCode.BAD_REQUEST).json({
            message: "Nome ou matrícula devem ser informados para atualizar"
        });
    }
    const httpResponse = await AdministradorService.atualizarAdministradorService(id,{nome,matricula});
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const removerAdministrador = async(req:Request, res: Response) => {
    const {id} = req.params;
    const httpResponse = await AdministradorService.removerAdministradorService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

