import mongoose from "mongoose";
import dotenv from "dotenv";
import reservaServices from "../services/ReservaServices";
import express from "express";

const app = express();
app.use(express.json());

dotenv.config();

const dbpassword = process.env.DB_PASSWORD;

// faz a conexão com o banco de dados
mongoose.connect(`mongodb+srv://uniquadraweb:${dbpassword}@uniquadracluster.hadwagc.mongodb.net/?retryWrites=true&w=majority&appName=uniquadraCluster`)
.then(() => {
    console.log("Coneção com o banco de dados realizada com sucesso!")
})
.catch((err) => {
    console.log("Erro ao conectar com o banco de dados: " + err);
})



app.post('/teste-reserva/:id/:matricula', async (req, res) => {
    const { id, matricula } = req.body;
    try {
      await reservaServices.adicionarPessoaNaReserva(id, matricula);
      res.status(200).json({ mensagem: 'Teste concluído com sucesso. Verifique o console.' });
    } catch (err) {
      console.error('Erro no teste:', err);
    }
  });
  

