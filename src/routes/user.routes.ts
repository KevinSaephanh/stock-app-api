// import { Router } from "express";
import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
