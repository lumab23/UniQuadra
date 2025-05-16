import Administrador,{ IAdministrador } from '../models/Administrador';

export const buscarTodosAdministradores = async (): Promise<IAdministrador[]> => {
    return await Administrador.find().sort({ nome: 1 });
};

export const buscarAdministradorPorId = async (id: string): Promise<IAdministrador | null> => {
    return await Administrador.findById(id);
};
export const buscarAdministradorPorMatricula = async (matricula: string): Promise<IAdministrador | null> => {
    return await Administrador.findOne({ matricula });
};
export const criarAdministrador = async (dados: {
    nome: string;
    matricula: string;
}): Promise<IAdministrador> => {
    const admin = new Administrador(dados);
    return await admin.save();
};

export const atualizarAdministrador = async (
    id: string, 
    dados:{ nome?: string; matricula?: string}
): Promise<IAdministrador | null> => { 
    return await Administrador.findByIdAndUpdate(id,dados,{new: true});
};

export const removerAdministrador = async(id: string): Promise<IAdministrador | null> =>{
    return await Administrador.findByIdAndDelete(id);
};d