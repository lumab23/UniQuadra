import { Router,  } from 'express';
import QuadraController from '../controllers/QuadraController';
import ReservaController from '../controllers/ReservaController';

const routes = Router();

routes.post('/quadras', QuadraController.criarQuadra);
routes.get('/quadras', QuadraController.listarQuadra);
routes.get('/quadras/:id', QuadraController.buscarQuadraPorId);



export default routes;