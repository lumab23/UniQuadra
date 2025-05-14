import Quadra from '../repositories/QuadraRepository';

class QuadraServices {
    async criarQuadra(dados: any){
        return await Quadra.criarQuadra(dados);
    }
    async listarQuadra(){
        return await Quadra.listarQuadra();
    }
    async buscarQuadraPorId(id: string){
        return await Quadra.buscarQuadraPorId(id);
    }
    async buscarQuadraPorModalidade(modalidade: string){
        return await Quadra.buscarQuadraPorModalidade(modalidade);
    }
    async atualizarQuadra(id: string, dados: any){
        return await Quadra.atualizarQuadra(id, dados);
    }

    async deletarQuadra(id: string){
        return await Quadra.deletarQuadra(id);
    }
}

export default new QuadraServices();