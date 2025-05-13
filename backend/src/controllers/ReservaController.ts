import { Request, Response } from 'express';

import ReservaServices from '../services/ReservaServices';

class ReservaController {
    async criarReserva(req: Request, res: Response){
        try{
            const reserva = await ReservaServices.criarReserva(req.body);
            return res.status(201).json(reserva);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async listarReserva(req: Request, res: Response){
        try{
            const reservas = await ReservaServices.listarReserva();
            return res.status(200).json(reservas);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
        

    }
    async buscarReservaPorMatricula(req: Request, res: Response){
        
    }
    async atualizarReserva(req: Request, res: Response){

    }
    async deletarReserva(req: Request, res: Response){
        try{
            const { id } = req.params;
            const reserva = await ReservaServices.deletarReserva(id);
            return res.status(204).send();
        } catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async adicionarPessoaNaReserva(req: Request, res: Response){
        try{
            const {id}=req.params;
            const {matricula} = req.params;
            const addPessoa = await ReservaServices.adicionarPessoaNaReserva(id, matricula);
            return res.status(200).json(addPessoa);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
}