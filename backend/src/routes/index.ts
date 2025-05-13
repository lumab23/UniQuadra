import express from "express";
import alunoRoutes from "./alunoRoutes";
import carteirinhaRoutes from "./carteirinhaRoutes";

const router = express.Router();

router.use('/alunos', alunoRoutes);
router.use('/carteirinhas', carteirinhaRoutes);

export default router;