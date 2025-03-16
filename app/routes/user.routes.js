import express from 'express';
import * as authController from '../controllers/user.controller.js';

const router = express.Router();

// Đăng ký người dùng
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Lấy thông tin người dùng hiện tại (cần token)
router.get('/me', authController.getProfile);
router.get('/users', authController.getAllUsers);

export default router;
