import bcrypt from 'bcryptjs';

class UserService {
  constructor(client) {
    this.User = client.db().collection('users');
    this.NhanVien = client.db().collection('nhanviens');
  }

  extractUserData(payload) {
    const user = {
      username: payload.username || '',
      email: payload.email || '',
      password: payload.password || '',
      ngaysinh: payload.ngaysinh || '',
      phai: payload.phai || '',
      diachi: payload.diachi || '',
      dienthoai: payload.dienthoai || '',
      createdAt: new Date(),
    };

    return user;
  }

  async register(payload) {
    const user = this.extractUserData(payload);

    if (!user.email || !user.password || !user.username) {
      throw new Error('All fields are required');
    }

    const existingUser = await this.User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error('Email đã được sử dụng');
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = await this.User.insertOne(user);
    return {
      id: result.insertedId,
      username: user.username,
      email: user.email,
    };
  }
  async getAllUsers() {
    const users = await this.User.find(
      {},
      { projection: { _id: 1, username: 1, email: 1 } },
    ).toArray();
    return users;
  }
  // Đăng nhập (trả về thông tin user nếu thành công)
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    let user = await this.User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Thông tin đăng nhập không chính xác');
      }
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: 'user',
      };
    }

    let admin = await this.NhanVien.findOne({ email });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        throw new Error('Thông tin đăng nhập không chính xác');
      }
      return {
        id: admin._id,
        username: admin.username,
        chucvu: admin.chucvu,
        role: 'admin',
      };
    }

    throw new Error('Thông tin đăng nhập không hợp lệ');
  }

  // Lấy thông tin người dùng từ ID
  async getProfile(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const user = await this.User.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }, // Không trả về password
    );

    return user || null;
  }
}

export default UserService;
