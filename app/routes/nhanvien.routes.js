import express from 'express';
import {
  register,
  login,
  getProfile,
} from '../controllers/nhanvien.controller.js';

const router = express.Router();

// Đăng ký nhân viên mới
router.post('/register', register);

// Đăng nhập nhân viên
router.post('/login', login);

// Lấy thông tin hồ sơ nhân viên
router.get('/me', getProfile);

export default router;
