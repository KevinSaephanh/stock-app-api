import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { isAuth } from "../middleware/isAuth";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/signup", validateRequest("signup"), authController.signup);
router.post("/login", validateRequest("login"), authController.login);
router.post("/logout", isAuth, authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.put("/reset-password", authController.resetPassword);
router.post("/send-verification-email", authController.sendVerificationEmail);
router.post("/verify-email", authController.verifyEmail);

export default router;
