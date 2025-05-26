import mongoose, { Schema } from 'mongoose';

const HorarioFuncionamentoSchema = new Schema({
    quadraId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra',
        required: true,
    },
    diaSemana: {
        type: String,
        enum: ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
        required: true,
    },
    horaInicio: {
        type: String, // formato: 'HH:mm'
        required: true,
    },
    horaFim: {
        type: String, // formato: 'HH:mm'
        required: true,
    },
});

export default mongoose.model('HorarioFuncionamento', HorarioFuncionamentoSchema);
