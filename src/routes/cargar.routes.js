import { Router } from "express";
import CrearController from "../controllers/cargar.controller.js";
const router = Router();

const cargar = new CrearController()
router.post("/cargar", cargar.crearEtiquetas);

export default router;