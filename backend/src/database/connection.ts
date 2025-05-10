import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

// faz a conexão com o banco de dados
mongoose.connect(`mongodb+srv://uniquadraweb:${connectionString}@uniquadracluster.hadwagc.mongodb.net/?retryWrites=true&w=majority&appName=uniquadraCluster`)
.then(() => {
    console.log("Coneção com o banco de dados realizada com sucesso!")
})
.catch((err) => {
    console.log("Erro ao conectar com o banco de dados: " + err);
})

