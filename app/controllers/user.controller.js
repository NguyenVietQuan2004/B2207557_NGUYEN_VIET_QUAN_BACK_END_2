import UserService from '../services/user.service.js';
import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';

export const register = async (req, res, next) => {
  try {
    const userService = new UserService(mongodb.client);
    const user = await userService.register(req.body);
    return res.status(201).json({
      message: 'User registered successfully',
      statusCode: 201,
      data: user,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const userService = new UserService(mongodb.client);
    console.log(req.body);
    const user = await userService.login(req.body);
    return res.status(200).json({
      message: 'Login successful',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return next(new ApiError(400, error.message));
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const userService = new UserService(mongodb.client);
    const users = await userService.getAllUsers();
    return res.status(200).json({
      message: 'User list retrieved successfully',
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    return next(new ApiError(500, 'Error retrieving users'));
  }
};

// http://localhost:5000/api/user/me?id=67d40a2c5bcc5516f26fcb33
export const getProfile = async (req, res, next) => {
  try {
    const userService = new UserService(mongodb.client);
    const user = await userService.getProfile(req.query.id);
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }
    return res.status(200).json({
      message: 'User profile retrieved successfully',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return next(new ApiError(500, 'Error retrieving user profile'));
  }
};
