import mongoose from 'mongoose';
import AdministradorModel from '../../models/Administrador';
import { connection } from '../connection';

async function seedAdmin() {
    try {
        // Connect to the database
        await connection();

        // Remove existing admin
        await AdministradorModel.deleteMany({});
        console.log('Removed existing admin users');

        // Create default admin
        const admin = new AdministradorModel({
            nome: 'Administrador',
            email: 'admin@unifor.br',
            matricula: '730000001'
        });

        await admin.save();
        console.log('Admin user created successfully');

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
}

// Run the seed
seedAdmin(); 