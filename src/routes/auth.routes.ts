import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", isAuth, authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.put("/reset-password", authController.resetPassword);
router.post("/send-verification-email", authController.sendVerificationEmail);
router.post("/verify-email", authController.verifyEmail);

export default router;
