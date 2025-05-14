import mongoose, {Schema, Document} from 'mongoose'; 

export interface IAdministrador extends Document{
    nome: string;
    email: string;
    matricula: string;
}

const AdministradorSchema = new Schema<IAdministrador>({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    matricula:{
        type: String,
        required: true,
        unique:true,
    },
});

const AdministradorModel = mongoose.model<IAdministrador>('Administrador', AdministradorSchema);
export default AdministradorModel;