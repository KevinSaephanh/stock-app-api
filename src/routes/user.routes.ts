// import { Router } from "express";
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/:id", userController.getUser);
router.put("/:id", isAuth, userController.updateUser);
router.delete("/:id", isAuth, userController.deleteUser);

export default router;
