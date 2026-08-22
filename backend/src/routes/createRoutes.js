import { Router } from "express";
import CreateController from "../controllers/createController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
const router = Router();

const create = new CreateController();
router.post("/create-tag", authMiddleware, create.createTag);
router.post("/create-product", authMiddleware, create.createProduct);

export default router;