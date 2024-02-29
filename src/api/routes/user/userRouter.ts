import express from 'express';
import { UserController } from '../../controllers/user/UserController';
export const router = express.Router();
const controller = new UserController();

router.get('/profile', (req, res, next) => controller.getProfile(req, res, next));
router.get('/activities', (req, res, next) => controller.getActivities(req, res, next));
