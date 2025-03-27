import express from 'express';
import {
  createMuonSach,
  getAllMuonSach,
  getMuonSachById,
  updateMuonSach,
  deleteMuonSach,
  getMuonSachByUserId,
} from '../controllers/theoDoiMuonSach.controller.js';

const router = express.Router();

router.get('/user/:userId', getMuonSachByUserId);
router.post('/', createMuonSach);

router.get('/', getAllMuonSach);

router.get('/:id', getMuonSachById);

router.put('/:id', updateMuonSach);

router.delete('/:id', deleteMuonSach);

export default router;
