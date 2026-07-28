import { Router } from "express";
import DashboardController from "../controllers/dashboardController.js";
const router = Router();

const dashboardController = new DashboardController();
router.get("/products", dashboardController.getAllProducts);
router.get("/product/:name", dashboardController.getProductByName);

export default router;