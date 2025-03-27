import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

class NhanVienService {
  constructor(client) {
    this.NhanVien = client.db().collection('nhanviens');
  }

  extractNhanVienData(payload) {
    const nhanvien = {
      username: payload.username || '',
      email: payload.email || '',
      password: payload.password || '',
      chucvu: payload.chucvu || '',
      diachi: payload.diachi || '',
      sodienthoai: payload.sodienthoai || '', // Không bắt buộc
      createdAt: new Date(),
    };

    return nhanvien;
  }

  async register(payload) {
    const nhanvien = this.extractNhanVienData(payload);

    if (!nhanvien.email || !nhanvien.password) {
      throw new Error('Cần nhập email và mật khẩu');
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.NhanVien.findOne({ email: nhanvien.email });
    if (existingUser) {
      throw new Error('Email đã được sử dụng');
    }

    // Hash mật khẩu
    nhanvien.password = await bcrypt.hash(nhanvien.password, 10);

    // Tạo nhân viên mới
    const result = await this.NhanVien.insertOne(nhanvien);
    return {
      id: result.insertedId,
      username: nhanvien.username,
      chucvu: nhanvien.chucvu,
    };
  }

  // async login({ email, password }) {
  //   if (!email || !password) {
  //     throw new Error('Cần nhập email và mật khẩu');
  //   }

  //   // Tìm nhân viên bằng email
  //   const nhanvien = await this.NhanVien.findOne({ email });
  //   if (!nhanvien) {
  //     throw new Error('Thông tin đăng nhập không chính xác');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, nhanvien.password);
  //   if (!isPasswordValid) {
  //     throw new Error('Thông tin đăng nhập không chính xác');
  //   }

  //   return {
  //     id: nhanvien._id,
  //     username: nhanvien.username,
  //     chucvu: nhanvien.chucvu,
  //     role: 'admin',
  //   };
  // }

  async getProfile(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const nhanvien = await this.NhanVien.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }, // Không trả về password
    );

    return nhanvien || null;
  }
}

export default NhanVienService;
