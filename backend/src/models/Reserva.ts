// CORRETO PARA TYPESCRIPT
import mongoose, { model, Schema } from 'mongoose';

const reservaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    quadra:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra',
        required: true
    },
    data:{
        type: Date,
        required: true
    },
    matriculas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    }]
});

export default model('Reserva', reservaSchema);
