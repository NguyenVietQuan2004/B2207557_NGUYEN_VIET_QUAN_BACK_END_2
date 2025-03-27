import express from 'express';
import {
  createNhaXuatBan,
  getAllNhaXuatBan,
  deleteNhaXuatBan,
} from '../controllers/nhaXuatBan.controller.js';

const router = express.Router();

router.post('/', createNhaXuatBan);
router.get('/', getAllNhaXuatBan);
router.delete('/:id', deleteNhaXuatBan);

export default router;
