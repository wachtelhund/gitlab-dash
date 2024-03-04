import express from 'express';
import { UserController } from '../../controllers/user/UserController';
export const router = express.Router();
const controller = new UserController();

router.get('/profile', (req, res) => controller.getProfile(req, res));
router.get('/activities', (req, res) => controller.getActivities(req, res));
router.get('/group-projects', (req, res) => controller.getGroupProjects(req, res));
