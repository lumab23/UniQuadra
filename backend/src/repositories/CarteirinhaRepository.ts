import Carteirinha, { ICarteirinha } from "../models/Carteirinha";
import { Types } from "mongoose";

// busca todas as carteirinhas
export const buscarTodasCarteirinhas = async (): Promise<ICarteirinha[]> => {
    return await Carteirinha.find().populate('aluno').sort({ createdAt: -1 });
}

// busca uma carteirinha pelo id
export const buscarCarteirinhaPorId = async (id: string): Promise<ICarteirinha | null> => {
    return await Carteirinha.findById(id).populate('aluno');
}

// busca uma carteirinha pelo código
export const buscarCarteirinhaPorCodigo = async (codigo: string): Promise<ICarteirinha | null> => {
    return await Carteirinha.findOne({ codigo }).populate('aluno');
}

// busca carteirinhas pelo id do aluno
export const buscarCarteirinhaPeloAlunoId = async (alunoId: string): Promise<ICarteirinha[]> => {
    return await Carteirinha.find({ aluno: alunoId }).populate('aluno').sort({ createdAt: -1 });
}

// buscar carteirinhas por status
export const buscarCarteirinhaPorStatus = async (status: string): Promise<ICarteirinha[]> => {
    return await Carteirinha.find({ status }).populate('aluno').sort({ createdAt: -1 });
}

// cria uma nova carteirinha
export const criarCarteirinha = async (dadosCarteirinha: {
    aluno: string;
    codigo: string;
    dataEmissao?: Date;
    validade: Date;
    status?: 'ativa' | 'vencida' | 'inativa' | 'suspensa';
}): Promise<ICarteirinha> => {
    const carteirinha = new Carteirinha({
        ...dadosCarteirinha,
        aluno: new Types.ObjectId(dadosCarteirinha.aluno)
    });
    const carteirinhaSalva = await carteirinha.save();
    return await carteirinhaSalva.populate('aluno');
}

// atualiza uma carteirinha
export const atualizarCarteirinha = async (
    id: string,
    dadosCarteirinha: {
        codigo?: string;
        validade?: Date;
        status?: 'ativa' | 'vencida' | 'inativa' | 'suspensa';
    }
): Promise<ICarteirinha | null> => {
    return await Carteirinha.findByIdAndUpdate(id, dadosCarteirinha, { new: true }).populate('aluno');
}

// atualiza o status da carteirinha
export const atualizarStatusCarteirinha = async (
    id: string,
    status: 'ativa' | 'vencida' | 'inativa' | 'suspensa'
): Promise<ICarteirinha | null> => {
    return await Carteirinha.findByIdAndUpdate(id, { status }, { new: true }).populate('aluno');
}

// remove uma carteirinha
export const removerCarteirinha = async (id: string): Promise<ICarteirinha | null> => {
    return await Carteirinha.findByIdAndDelete(id).populate('aluno');
}

// verifica carteirinhas vencidas e atualiza o status
export const verificarCarteirinhasVencidas = async (): Promise<{
    modifiedCount: number;
    alreadyExpiredCount: number;
    expiredCarteirinhas: ICarteirinha[];
}> => {
    const agora = new Date();
    console.log('Repository: Verificando carteirinhas vencidas em:', agora.toISOString());
    
    // Encontra carteirinhas ativas que estão vencidas
    const carteirinhasParaAtualizar = await Carteirinha.find({
        validade: { $lt: agora },
        status: 'ativa'
    }).populate('aluno');
    
    console.log(`Repository: Encontradas ${carteirinhasParaAtualizar.length} carteirinhas ativas e vencidas para atualizar`);

    // Encontra carteirinhas que já estão marcadas como vencidas
    const carteirinhasJaVencidas = await Carteirinha.find({
        status: 'vencida'
    }).populate('aluno');
    
    console.log(`Repository: Existem ${carteirinhasJaVencidas.length} carteirinhas já marcadas como vencidas`);
    
    // Atualiza carteirinhas ativas que estão vencidas
    let resultado = { modifiedCount: 0 };
    if (carteirinhasParaAtualizar.length > 0) {
        resultado = await Carteirinha.updateMany(
            {
                validade: { $lt: agora },
                status: 'ativa'
            },
            {
                $set: { status: 'vencida' }
            }
        );
        console.log('Repository: Resultado da atualização:', resultado);
    }

    // Retorna todas as carteirinhas vencidas (atualizadas + já vencidas)
    const todasVencidas = [...carteirinhasParaAtualizar, ...carteirinhasJaVencidas];

    return {
        modifiedCount: resultado.modifiedCount,
        alreadyExpiredCount: carteirinhasJaVencidas.length,
        expiredCarteirinhas: todasVencidas
    };
}