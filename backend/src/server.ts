import app from "./app";
import { connection } from "./database/connection";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Função para iniciar o servidor
async function startServer() {
    try {
        // Conecta ao banco de dados
        await connection();
        
        // Inicia o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
}

// Inicia o servidor
startServer();
