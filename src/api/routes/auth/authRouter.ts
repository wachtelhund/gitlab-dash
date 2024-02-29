import express from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
export const router = express.Router();
const controller = new AuthController();

router.get('/', (req, res, next) => controller.authenicate(req, res, next));
router.post('/logout', (req, res, next) => controller.logout(req, res, next));
router.get('/cookie', (req, res, next) => controller.readCookie(req, res, next));
