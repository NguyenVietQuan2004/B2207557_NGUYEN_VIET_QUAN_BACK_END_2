import express from 'express';
import {
  createSach,
  getAllSach,
  getSachById,
  updateSach,
  deleteSach,
} from '../controllers/sach.controller.js';

const router = express.Router();

// Thêm sách mới
router.post('/', createSach);

// Lấy danh sách tất cả sách
router.get('/', getAllSach);

// Lấy thông tin sách theo ID
router.get('/:id', getSachById);

// Cập nhật thông tin sách theo ID
router.put('/:id', updateSach);

// Xóa sách theo ID
router.delete('/:id', deleteSach);

export default router;
