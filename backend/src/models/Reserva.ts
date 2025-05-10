// CORRETO PARA TYPESCRIPT
import mongoose, { model, Schema } from 'mongoose';

const reservaSchema = new mongoose.Schema({
    data:{
        type: Date,
        required: true
    },
    matricula:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    }
});

export default model('Reserva', reservaSchema);
