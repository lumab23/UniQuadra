import express from "express";
import alunoRoutes from "./alunoRoutes";
import carteirinhaRoutes from "./carteirinhaRoutes";
import quaadraRoutes from "./quadraRoutes";
import reservaRoutes from "./reservaRoutes";

const router = express.Router();

router.use('/alunos', alunoRoutes);
router.use('/carteirinhas', carteirinhaRoutes);
router.use('/quadras', quaadraRoutes);
router.use('/reservas', reservaRoutes); 

export default router;