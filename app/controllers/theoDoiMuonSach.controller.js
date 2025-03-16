import TheoDoiMuonSachService from '../services/theoDoiMuonSach.service.js';
import SachService from '../services/sach.service.js';

import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';

export const createMuonSach = async (req, res, next) => {
  try {
    const muonSachService = new TheoDoiMuonSachService(mongodb.client);
    const muonSach = await muonSachService.createMuonSach(req.body);
    return res.status(201).json({
      message: 'Mượn sách thành công',
      statusCode: 201,
      data: muonSach,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};
export const getMuonSachByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'Thiếu userId!' });

    const theoDoiMuonSachService = new TheoDoiMuonSachService(mongodb.client);
    const bookService = new SachService(mongodb.client);
    // Lấy danh sách sách đã mượn theo userId
    console.log(userId);
    const records = await theoDoiMuonSachService.getMuonSachByUserId(userId);

    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sách đã mượn!' });
    }

    // Lấy thông tin sách từ `masach`
    const borrowedBooks = await Promise.all(
      records.map(async (record) => {
        const book = await bookService.getById(record.masach);
        return {
          record: record._id,
          masach: book ? book._id : '',
          tensach: book ? book.tensach : 'Không xác định',
          namxuatban: book ? book.namxuatban : 'N/A',
          dongia: book ? book.dongia : 0,
          ngaymuon: record.ngaymuon,
          ngaytra: record.ngaytra,
        };
      }),
    );

    res.json({ message: 'Lấy sách đã mượn thành công', data: borrowedBooks });
  } catch (error) {
    console.error('Lỗi lấy sách đã mượn:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};

export const getAllMuonSach = async (req, res, next) => {
  try {
    const muonSachService = new TheoDoiMuonSachService(mongodb.client);
    const muonSach = await muonSachService.getAllMuonSach();
    return res.status(200).json({
      message: 'Lấy danh sách mượn sách thành công',
      statusCode: 200,
      data: muonSach,
    });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy danh sách mượn sách'));
  }
};

export const getMuonSachById = async (req, res, next) => {
  try {
    const muonSachService = new TheoDoiMuonSachService(mongodb.client);
    const muonSach = await muonSachService.getMuonSachById(req.params.id);

    if (!muonSach) {
      return next(new ApiError(404, 'Không tìm thấy thông tin mượn sách'));
    }

    return res.status(200).json({
      message: 'Lấy thông tin mượn sách thành công',
      statusCode: 200,
      data: muonSach,
    });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy thông tin mượn sách'));
  }
};

export const updateMuonSach = async (req, res, next) => {
  try {
    const muonSachService = new TheoDoiMuonSachService(mongodb.client);
    const updatedMuonSach = await muonSachService.updateMuonSach(
      req.params.id,
      req.body,
    );

    if (!updatedMuonSach) {
      return next(
        new ApiError(404, 'Không tìm thấy thông tin mượn sách để cập nhật'),
      );
    }

    return res.status(200).json({
      message: 'Cập nhật thông tin mượn sách thành công',
      statusCode: 200,
      data: updatedMuonSach,
    });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi cập nhật thông tin mượn sách'));
  }
};

export const deleteMuonSach = async (req, res, next) => {
  try {
    const muonSachService = new TheoDoiMuonSachService(mongodb.client);
    const result = await muonSachService.deleteMuonSach(req.params.id);

    if (!result) {
      return next(
        new ApiError(404, 'Không tìm thấy thông tin mượn sách để xóa'),
      );
    }

    return res.status(200).json({
      message: 'Xóa thông tin mượn sách thành công',
      statusCode: 200,
    });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi xóa thông tin mượn sách'));
  }
};
