import mongoose, { model, Schema } from 'mongoose';
import reservaSchema from './Reserva';

const quadraSchema = new mongoose.Schema({
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
        type: [reservaSchema],
        default: []
    }
});

export default model('Quadra', quadraSchema);
