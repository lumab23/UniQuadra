import express from "express";
import alunoRoutes from "./alunoRoutes";
import carteirinhaRoutes from "./carteirinhaRoutes";
import administradorRoutes from "./administradorRoutes";

const router = express.Router();

router.use('/alunos', alunoRoutes);
router.use('/carteirinhas', carteirinhaRoutes);
router.use('/administrador', administradorRoutes);

export default router;