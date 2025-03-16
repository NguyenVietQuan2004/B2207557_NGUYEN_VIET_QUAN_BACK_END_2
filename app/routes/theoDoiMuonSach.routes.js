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
console.log(22);

router.get('/user/:userId', getMuonSachByUserId);
console.log(11);
// Thêm mới một bản ghi mượn sách
router.post('/', createMuonSach);

// Lấy danh sách tất cả các lượt mượn sách
router.get('/', getAllMuonSach);

// Lấy thông tin mượn sách theo ID
router.get('/:id', getMuonSachById);

// Cập nhật thông tin mượn sách
router.put('/:id', updateMuonSach);

// Xóa thông tin mượn sách
router.delete('/:id', deleteMuonSach);

export default router;
