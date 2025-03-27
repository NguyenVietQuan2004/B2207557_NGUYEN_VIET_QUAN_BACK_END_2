import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './app/routes/user.routes.js';
import nhanVienRouter from './app/routes/nhanvien.routes.js';
import sachRouter from './app/routes/sach.routes.js';
import nhaXuatBanRouter from './app/routes/nhaXuatBan.routes.js';
import ApiError from './app/api-error.js';
import theoDoiMuonSachRouter from './app/routes/theoDoiMuonSach.routes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/nhanvien', nhanVienRouter);
app.use('/api/sach', sachRouter);
app.use('/api/nhaxuatban', nhaXuatBanRouter);
app.use('/api/theodoimuonsach', theoDoiMuonSachRouter);
app.get('/', (req, res) => {
  res.json({ message: 'welcome' });
});

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  return next(new ApiError(404, 'Resource not found'));
});

// Middleware xử lý lỗi chung
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || 'Internal Server Error',
  });
});

export default app;
