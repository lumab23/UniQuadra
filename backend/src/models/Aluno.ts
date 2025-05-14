import { Schema, model, Document } from 'mongoose';

export interface IAluno extends Document {
    nome: string;
    matricula: string;
    createdAt: Date;
    updatedAt: Date;
}

const AlunoSchema = new Schema<IAluno>({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    matricula: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true // adiciona createdAt e updatedAt automaticamente
})

export default model<IAluno>('Aluno', AlunoSchema);