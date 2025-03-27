import NhanVienService from '../services/nhanvien.service.js';
import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';

export const register = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(mongodb.client);
    const nhanVien = await nhanVienService.register(req.body);
    return res.status(201).json({
      message: 'Nhân viên đã đăng ký thành công',
      statusCode: 201,
      data: nhanVien,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(mongodb.client);
    const nhanVien = await nhanVienService.login(req.body);
    return res.status(200).json({
      message: 'Đăng nhập thành công',
      statusCode: 200,
      data: nhanVien,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(mongodb.client);
    const nhanVien = await nhanVienService.getProfile(req.query.id);
    if (!nhanVien) {
      return next(new ApiError(404, 'Nhân viên không tìm thấy'));
    }
    return res.status(200).json({
      message: 'Thông tin hồ sơ nhân viên đã được lấy thành công',
      statusCode: 200,
      data: nhanVien,
    });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy thông tin hồ sơ nhân viên'));
  }
};
