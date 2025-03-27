import express from 'express';
import {
  createSach,
  getAllSach,
  getSachById,
  updateSach,
  deleteSach,
  getSachByPublisherId,
} from '../controllers/Sach.controller.js';

const router = express.Router();

router.post('/', createSach);

router.get('/', getAllSach);

router.get('/:id', getSachById);
router.get('/publisher/:id', getSachByPublisherId);

router.put('/:id', updateSach);

router.delete('/:id', deleteSach);

export default router;
