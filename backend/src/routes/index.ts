import express from "express";
import alunoRoutes from "./alunoRoutes";
import carteirinhaRoutes from "./carteirinhaRoutes";
import quaadraRoutes from "./quadraRoutes";
import reservaRoutes from "./reservaRoutes";
import administradorRoutes from "./administradorRoutes";

const router = express.Router();

router.use('/alunos', alunoRoutes);
router.use('/carteirinhas', carteirinhaRoutes);
router.use('/quadras', quaadraRoutes);
router.use('/reservas', reservaRoutes); 
router.use('/administrador', administradorRoutes);

export default router;