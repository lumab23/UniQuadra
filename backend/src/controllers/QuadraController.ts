import {Request, Response} from 'express';
import QuadraServices from '../services/QuadraServices';

class QuadraController {
    async criarQuadra(req: Request, res: Response){
        try{
            const quadra = await QuadraServices.criarQuadra(req.body);
            return res.status(201).json(quadra);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async listarQuadra(req: Request, res: Response){
        try{
            const quadras = await QuadraServices.listarQuadra();
            return res.status(200).json(quadras);
        }catch(e:any){
            return res.status(400).json({error: e.message});
        }
    }
    async buscarQuadraPorId(req: Request, res: Response){
        try{
            const {id}=await req.params;
            const quadra = await QuadraServices.buscarQuadraPorId(id);
            if(!quadra){
                return res.status(404).json({error: 'Quadra não encontrada'});
            }
            return res.status(200).json(quadra);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async buscarQuadraPorModalidade(req: Request, res: Response){
        try{
            const {modalidade} = await req.params;
            const quadra = await QuadraServices.buscarQuadraPorModalidade(modalidade);
            if(!quadra){
                return res.status(404).json({error: 'Quadra não encontrada'});
            }
            return res.status(200).json(quadra);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async atualizarQuadra(req: Request, res: Response){
        try{ 
            const {id} = req.params;
            const {dados} = req.body;
            const quadraAtualizada = await QuadraServices.atualizarQuadra(id, dados);
            return res.status(200).json(quadraAtualizada);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async mudarStatusQuadra(req: Request, res: Response){
        try{
            const {status} = req.params;
            const {id} = req.params;
            const quadraAtualizada = await QuadraServices.mudarStatusQuadra(status, id);
            return res.status(200).json(quadraAtualizada);
        }catch(e: any){
            return res.status(400).json({error: e.message});
        }
    }
    async deletarQuadra(req: Request, res: Response){
        try{
            const {id} = req.params;
            const quadraDeletada = await QuadraServices.deletarQuadra(id);
            return res.status(204).send();
        }catch(e:any){
            return res.status(400).json({error: e.message});
        }
    }
}