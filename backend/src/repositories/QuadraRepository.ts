import quadra from '../models/Quadra';

class QuadraRepository {
    async criarQuadra(dados: any){
        const quadraNova = new quadra(dados);
        return await quadraNova.save();
    }
    async listarQuadra(){
        return await quadra.find();
    }
    async buscarQuadraPorId(id: string){
        return await quadra.findById(id);
    }
    async buscarQuadraPorModalidade(modalidade: string){
        return await quadra.find({ modalidade: modalidade });
    }
    async atualizarQuadra(id: string, dados: any){
        return await quadra.findByIdAndUpdate(id, dados, { new: true });
    }
    async mudarStatusQuadra(status: string, id: string){
        return await quadra.findByIdAndUpdate(id, { status: status }, { new: true });
    }
    async deletarQuadra(id: string){
        return await quadra.findByIdAndDelete(id);
    }
    async buscarQuadrasDisponiveis(modalidade?: string) {
        const query: any = { status: 'disponível' };
        if (modalidade) query.modalidade = modalidade;
        return await quadra.find(query);
    }
    
}

export default new QuadraRepository();