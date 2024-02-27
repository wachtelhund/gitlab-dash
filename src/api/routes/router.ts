import express from 'express';
import { router as authRouter } from './auth/authRouter';
import { router as userRouter } from './user/userRouter';
import { validateToken } from './user/validateToken';

export const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/user-data',validateToken , userRouter);

router.use('*', (_req, _res, next) => {
  next();
});