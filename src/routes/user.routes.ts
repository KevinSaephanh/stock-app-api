// import { Router } from "express";
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isAuth } from "../middleware/isAuth";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.get("/:id", userController.getUser);
router.patch("/:id", isAuth, validateRequest("updateUser"), userController.updateUser);
router.delete("/:id", isAuth, userController.deleteUser);

export default router;
