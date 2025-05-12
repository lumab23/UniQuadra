import mongoose, { model, Schema } from 'mongoose';
import reservaSchema from './Reserva';

const quadraSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    modalidade:{
        type: String,
        enum: ['Campo de Futsal', 'Basquete', 'Volei', 'Campo de areia', 'Tenis'],
        required: true
    },
    status:{
        type: String,
        enum: ['Disponível', 'Indisponível'],
        default: 'Disponível'
    },
    reservas: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    capacidade: {
        type: Number,
        required: true
    }
});

export default model('Quadra', quadraSchema);
