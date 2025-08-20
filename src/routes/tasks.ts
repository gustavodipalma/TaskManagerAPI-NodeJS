import {Router} from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

router.post("/tasks", TaskController.create);
router.get("/tasks", TaskController.getAll);
router.get("/tasks/:id", TaskController.getById);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.delete);

export default router;