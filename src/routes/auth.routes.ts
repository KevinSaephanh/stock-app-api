import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.get("/signup", authController.signup);
router.put("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/refresh-token", authController.refreshToken);
router.put("/reset-password", authController.resetPassword);
router.delete("/send-verification-email", authController.sendVerificationEmail);
router.delete("/verify-email", authController.verifyEmail);

export default router;
