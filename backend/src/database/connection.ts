import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const dbPassword = process.env.DB_PASSWORD;

const options = {
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000, 
  connectTimeoutMS: 10000, 
  maxPoolSize: 10,
  minPoolSize: 5, 
  retryWrites: true
};

// faz a conexão com o banco de dados
mongoose.connect(`mongodb+srv://uniquadraweb:${dbPassword}@uniquadracluster.hadwagc.mongodb.net/UniQuadra?retryWrites=true&w=majority&appName=uniquadraCluster`, options)
.then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
})
.catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
    process.exit(1); 
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Fecha a conexão com o banco de dados quando o processo é encerrado
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


mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

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
  

