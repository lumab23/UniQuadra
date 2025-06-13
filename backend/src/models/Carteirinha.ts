import { Schema, model, Document, Types } from 'mongoose';
import { IAluno } from './Aluno';

export interface ICarteirinha extends Document {
    aluno: Types.ObjectId | IAluno;
    codigo: string;
    dataEmissao: Date;
    validade: Date;
    status: 'ativa' | 'vencida' | 'inativa' | 'suspensa';
    createdAt: Date;
    updatedAt: Date;
    isValida(): boolean;
}

const CarteirinhaSchema = new Schema<ICarteirinha>({
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dataEmissao: {
        type: Date,
        required: true,
        default: Date.now
    },
    validade: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['ativa', 'vencida', 'inativa', 'suspensa'],
        default: 'ativa',
        required: true
    },
}, {
    timestamps: true
});

// Método para verificar se a carteirinha está válida
CarteirinhaSchema.method('isValida', function (): boolean {
    const hoje = new Date();
    return this.validade > hoje && this.status === 'ativa';
});

// Índices para melhorar a performance das consultas
CarteirinhaSchema.index({ aluno: 1 });
CarteirinhaSchema.index({ validade: 1 });
CarteirinhaSchema.index({ status: 1 });

export default model<ICarteirinha>('Carteirinha', CarteirinhaSchema);