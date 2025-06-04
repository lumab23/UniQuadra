import { Schema, model, Document } from 'mongoose';

export interface IAluno extends Document {
    nome: string;
    email: string;
    matricula: string;
    esporte: string;
    createdAt: Date;
    updatedAt: Date;
}

const AlunoSchema = new Schema<IAluno>({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        match: [/@edu\.unifor\.br$/, 'Email deve ser do domínio @edu.unifor.br']
    },
    matricula: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        minlength: [7, 'Matrícula deve ter exatamente 7 dígitos'],
        maxlength: [7, 'Matrícula deve ter exatamente 7 dígitos'],
        match: [/^\d{7}$/, 'Matrícula deve conter apenas números']
    },
    esporte: {
        type: String,
        required: true,
        enum: [
            'Campo de Areia',
            'Futebol', 
            'Basquete',
            'Vôlei',
            'Tênis',
            'Natação',
            'Todas as modalidades'
        ],
        default: 'Campo de Areia'
    }
}, {
    timestamps: true 
});



export default model<IAluno>('Aluno', AlunoSchema);