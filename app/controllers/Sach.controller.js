import SachService from '../services/sach.service.js';
import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';

export const createSach = async (req, res, next) => {
  try {
    const sachService = new SachService(mongodb.client);
    const sach = await sachService.create(req.body);
    return res.status(201).json({
      message: 'Sách đã được thêm thành công',
      statusCode: 201,
      data: sach,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

export const getAllSach = async (req, res, next) => {
  try {
    const sachService = new SachService(mongodb.client);
    const sachs = await sachService.getAll();
    return res.status(200).json({ data: sachs });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy danh sách sách'));
  }
};

export const getSachById = async (req, res, next) => {
  try {
    const sachService = new SachService(mongodb.client);
    const sach = await sachService.getById(req.params.id);
    if (!sach) return next(new ApiError(404, 'Sách không tìm thấy'));
    return res.status(200).json({ data: sach });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy thông tin sách'));
  }
};

export const updateSach = async (req, res, next) => {
  try {
    const sachService = new SachService(mongodb.client);
    const updated = await sachService.update(req.params.id, req.body);
    if (!updated)
      return next(
        new ApiError(404, 'Sách không tồn tại hoặc không thể cập nhật'),
      );
    return res.status(200).json({ message: 'Cập nhật sách thành công' });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi cập nhật sách'));
  }
};

export const deleteSach = async (req, res, next) => {
  try {
    const sachService = new SachService(mongodb.client);
    const deleted = await sachService.delete(req.params.id);
    if (!deleted)
      return next(
        new ApiError(404, 'Sách không tồn tại hoặc đã bị xóa trước đó'),
      );
    return res.status(200).json({ message: 'Xóa sách thành công' });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi xóa sách'));
  }
};
