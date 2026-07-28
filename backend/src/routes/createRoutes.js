import { Router } from "express";
import CreateController from "../controllers/createController.js";
const router = Router();

const create = new CreateController();
router.post("/create-tag", create.createTag);
router.post("/create-product", create.createProduct);

export default router;