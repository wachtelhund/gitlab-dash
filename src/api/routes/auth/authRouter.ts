import express from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
export const router = express.Router();
const controller = new AuthController();

router.get('/', (req, res, next) => controller.authenicate(req, res, next));

// router.post('/', auth.authenticateAdmin, (req, res, next) =>
//   controller.post(req, res, next));

// router.delete('/:id', auth.authenticateAdmin, (req, res, next) =>
//   controller.delete(req, res, next));