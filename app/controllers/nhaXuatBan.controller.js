import NhaXuatBanService from '../services/nhaXuatBan.service.js';
import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';
import BookService from '../services/sach.service.js';
export const createNhaXuatBan = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(mongodb.client);
    const nhaxuatban = await nhaXuatBanService.create(req.body);
    return res.status(201).json({
      message: 'Nhà xuất bản đã được thêm thành công',
      statusCode: 201,
      data: nhaxuatban,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

export const getAllNhaXuatBan = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(mongodb.client);
    const nhaxuatbans = await nhaXuatBanService.getAll();
    return res.status(200).json({ data: nhaxuatbans });
  } catch (error) {
    return next(new ApiError(500, 'Lỗi khi lấy danh sách nhà xuất bản'));
  }
};
export const deleteNhaXuatBan = async (req, res, next) => {
  try {
    const nhaXuatBanService = new NhaXuatBanService(mongodb.client);
    const bookService = new BookService(mongodb.client); // Khởi tạo book service
    const { id } = req.params;

    // Kiểm tra nhà xuất bản có tồn tại không
    const nxb = await nhaXuatBanService.getById(id);
    if (!nxb) {
      return next(new ApiError(404, 'Nhà xuất bản không tồn tại'));
    }

    // Kiểm tra xem có sách nào sử dụng nhà xuất bản này không
    const booksUsingNxb = await bookService.getByPublisherId(id);

    if (booksUsingNxb.length > 0) {
      return next(
        new ApiError(
          400,
          'Không thể xóa vì có sách đang sử dụng nhà xuất bản này',
        ),
      );
    }

    // Nếu không có sách nào sử dụng, tiến hành xóa
    const success = await nhaXuatBanService.delete(id);
    if (!success) {
      return next(new ApiError(500, 'Xóa nhà xuất bản thất bại'));
    }

    return res.status(200).json({ message: 'Nhà xuất bản đã được xóa' });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};
