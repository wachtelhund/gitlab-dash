import express from 'express';
import {router as authRouter } from './auth/authRouter';

export const router = express.Router();

router.use('/api/auth', authRouter);

router.use('*', (_req, _res, next) => {
  next();
});