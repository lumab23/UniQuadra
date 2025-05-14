import { Router } from "express";
import QuadraController from "../controllers/QuadraController";

const routes = Router();

routes.post("/quadras", QuadraController.criarQuadra); //o retorno dela ta mt estranho e feio, ams funciona
routes.get("/quadras", QuadraController.listarQuadra);
routes.get("/quadras/:id", QuadraController.buscarQuadraPorId);
routes.get(
  "/quadras/modalidade/:modalidade",
  QuadraController.buscarQuadraPorModalidade
);
routes.put("/quadras/:id", QuadraController.atualizarQuadra); //funciona mas eu posso alterar qualquer coisa sem respeitar o schema
routes.delete("/quadras/:id", QuadraController.deletarQuadra); //nao ta retornando nada no sucesso

export default routes;