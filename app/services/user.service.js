import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

class UserService {
  constructor(client) {
    this.User = client.db().collection('users');
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

    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key],
    );

    return user;
  }

  // Đăng ký tài khoản
  async register(payload) {
    const user = this.extractUserData(payload);

    if (!user.email || !user.password || !user.username) {
      throw new Error('All fields are required');
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash mật khẩu
    user.password = await bcrypt.hash(user.password, 10);

    // Tạo tài khoản
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

    // Tìm user theo email
    const user = await this.User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: 'user',
    };
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
