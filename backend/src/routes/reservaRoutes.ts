import { Router } from "express";
import ReservaController from "../controllers/ReservaController";

const routes = Router();

routes.post("/", ReservaController.criarReserva);
routes.get("/", ReservaController.listarReserva);
routes.get("/:matricula", ReservaController.buscarReservaPorMatricula);//teste ===========
routes.put("/:id", ReservaController.atualizarReserva); // mensagem de erro feia
routes.delete("/:id", ReservaController.deletarReserva);
routes.patch(
  "/:id/adicionar-pessoas",
  ReservaController.adicionarPessoaNaReserva
);

export default routes;