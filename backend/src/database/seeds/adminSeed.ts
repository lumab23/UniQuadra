import mongoose from 'mongoose';
import AdministradorModel from '../../models/Administrador';
import { connection } from '../connection';

async function seedAdmin() {
    try {
        // Connect to the database
        await connection();

        // Verificar se já existe algum administrador
        const existingAdmin = await AdministradorModel.findOne({ email: 'admin@unifor.br' });
        
        if (existingAdmin) {
            console.log('Admin padrão já existe no banco de dados');
            return;
        }

        // Create default admin
        const admin = new AdministradorModel({
            nome: 'Administrador',
            email: 'admin@unifor.br',
            matricula: '730000001'
        });

        await admin.save();
        console.log('Admin padrão criado com sucesso');

    } catch (error) {
        console.error('Erro ao criar admin padrão:', error);
    } finally {
        await mongoose.connection.close();
    }
}

// Run the seed
seedAdmin(); 