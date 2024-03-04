import express from 'express';
import { AuthController } from '../../controllers/auth/AuthController';
export const router = express.Router();
const controller = new AuthController();

router.get('/', (req, res) => controller.authenicate(req, res));
router.post('/logout', (req, res) => controller.logout(req, res));
