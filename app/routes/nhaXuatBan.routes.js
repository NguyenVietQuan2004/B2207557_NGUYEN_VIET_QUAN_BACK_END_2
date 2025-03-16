import express from 'express';
import {
  createNhaXuatBan,
  getAllNhaXuatBan,
  deleteNhaXuatBan, // Import hàm xóa
} from '../controllers/nhaXuatBan.controller.js';

const router = express.Router();

router.post('/', createNhaXuatBan);
router.get('/', getAllNhaXuatBan);
router.delete('/:id', deleteNhaXuatBan); // Route xóa nhà xuất bản

export default router;
