import { Router } from "express";
import ReservaController from "../controllers/ReservaController";

const routes = Router();


routes.post("/reservas", ReservaController.criarReserva);
routes.get("/reservas", ReservaController.listarReserva);
routes.get("/reservas/:matricula", ReservaController.buscarReservaPorMatricula);//teste ===========
routes.put("/reservas/:id", ReservaController.atualizarReserva); // mensagem de erro feia
routes.delete("/reservas/:id", ReservaController.deletarReserva);
routes.patch(
  "/reservas/:id/adicionar-pessoas",
  ReservaController.adicionarPessoaNaReserva
);
export default routes;