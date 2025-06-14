import express from "express";
import alunoRoutes from "./alunoRoutes";
import carteirinhaRoutes from "./carteirinhaRoutes";
import quaadraRoutes from "./quadraRoutes";
import reservaRoutes from "./reservaRoutes";
import administradorRoutes from "./administradorRoutes";
import horarioRoutes from "./horarioRoutes"

const router = express.Router();

router.use('/alunos', alunoRoutes);
router.use('/carteirinhas', carteirinhaRoutes);
router.use('/quadras', quaadraRoutes);
router.use('/reservas', reservaRoutes); 
router.use('/administrador', administradorRoutes);
router.use('/horario', horarioRoutes);

export default router;