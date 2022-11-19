import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { asyncWrap } from '../middleware/asyncWrap';
import { isAuth } from '../middleware/isAuth';
import { validateRequest } from '../middleware/validateRequest';
import { SignupSchema, LoginSchema } from '../validators/auth.validator';

const authController = new AuthController();
const router = Router();

router.post('/create-account', validateRequest(SignupSchema), asyncWrap(authController.signup));
router.post('/login', validateRequest(LoginSchema), asyncWrap(authController.login));
router.post('/logout', isAuth, asyncWrap(authController.logout));
router.post('/refresh-token', asyncWrap(authController.refreshToken));
router.patch('/reset-password', asyncWrap(authController.resetPassword));
router.patch('/set-password/:token', asyncWrap(authController.updatePassword));
router.post('/send-verification-email', asyncWrap(authController.sendEmail));
router.post('/verify-email/:token', asyncWrap(authController.verifyEmail));

export default router;
