import { Router } from "express";
import QuadraController from "../controllers/QuadraController";

const routes = Router();

routes.post("/", QuadraController.criarQuadra);
routes.get("/", QuadraController.listarQuadra);
routes.get("/:id", QuadraController.buscarQuadraPorId);
routes.get(
  "/modalidade/:modalidade",
  QuadraController.buscarQuadraPorModalidade
);
routes.put("/:id", QuadraController.atualizarQuadra);
routes.delete("/:id", QuadraController.deletarQuadra);

export default routes;