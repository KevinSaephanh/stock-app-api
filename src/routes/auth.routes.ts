import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { asyncWrap } from "../middleware/asyncWrap";
import { isAuth } from "../middleware/isAuth";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/signup", validateRequest("signup"), asyncWrap(authController.signup));
router.post("/login", validateRequest("login"), asyncWrap(authController.login));
router.post("/logout", isAuth, asyncWrap(authController.logout));
router.post("/refresh-token", asyncWrap(authController.refreshToken));
router.post("/:id/change-email", validateRequest("email"));
router.post("/:id/change-password", validateRequest("password"));
router.patch("/reset-password", asyncWrap(authController.resetPassword));
router.patch(
  "/:id/update-password",
  validateRequest("password"),
  asyncWrap(authController.updatePassword)
);
router.post("/send-verification-email", asyncWrap(authController.sendEmail));
router.post("/verify-email", asyncWrap(authController.verifyEmail));

export default router;
