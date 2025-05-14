import app from "./app";
import "./database/connection";

const PORT = process.env.PORT || 3002;

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
