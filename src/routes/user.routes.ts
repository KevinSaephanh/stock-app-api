import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { asyncWrap } from "../middleware/asyncWrap";
import { isAuth } from "../middleware/isAuth";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.get("/:id", asyncWrap(userController.getUser));
router.patch("/:id", isAuth, validateRequest("updateUser"), asyncWrap(userController.updateUser));
router.delete("/:id", isAuth, asyncWrap(userController.deleteUser));

export default router;
