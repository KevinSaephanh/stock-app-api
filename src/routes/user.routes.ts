import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { asyncWrap } from '../middleware/asyncWrap';
import { isAuth } from '../middleware/isAuth';

const userController = new UserController();
const router = Router();

router.get('/:id', asyncWrap(userController.getById));
router.patch('/:id', isAuth, asyncWrap(userController.update));

export default router;
