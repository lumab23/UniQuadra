import mongoose from "mongoose";
import dotenv from "dotenv";
import reservaServices from "../services/ReservaServices";
import express from "express";

const app = express();
app.use(express.json());

const options = {
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000, 
  connectTimeoutMS: 10000, 
  maxPoolSize: 10,
  minPoolSize: 5, 
  retryWrites: true
};


dotenv.config();

const dbpassword = process.env.DB_PASSWORD;

// faz a conexão com o banco de dados
mongoose.connect(`mongodb+srv://uniquadraweb:${dbpassword}@uniquadracluster.hadwagc.mongodb.net/UniQuadra?retryWrites=true&w=majority&appName=uniquadraCluster,options`)
.then(() => {
    console.log("Coneção com o banco de dados realizada com sucesso!")
})
.catch((err) => {
    console.log("Erro ao conectar com o banco de dados: " + err);
})

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
  } catch (err) {
      console.error('Error during MongoDB connection closure:', err);
      process.exit(1);
    }
});
  

