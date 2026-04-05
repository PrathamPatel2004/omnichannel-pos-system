import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { signUpController, verifyTokenController, loginController, logoutController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/verify-email/:token', verifyTokenController);
authRouter.post('/login', loginController);
authRouter.post('/logout', authMiddleware, logoutController);

export default authRouter;