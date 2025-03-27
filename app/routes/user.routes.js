import express from 'express';
import * as authController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.getProfile);
router.get('/users', authController.getAllUsers);

export default router;
