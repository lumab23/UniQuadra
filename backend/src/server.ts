import app from "./app";
import "./database/connection";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
