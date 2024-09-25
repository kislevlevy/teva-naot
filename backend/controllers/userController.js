import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import {
  editOneById,
  getMany,
  getOneById,
  oneDocApiResponse,
} from '../utils/handlerFactory.js';

export const getUsers = getMany(User);
export const getUsertById = getOneById(User);
export const editUserById = editOneById(User);

export const getMe = asyncHandler(async (req, res, next) => {
  oneDocApiResponse(res, 200, { doc: req.user });
});

export const updateMe = asyncHandler(async (req, res, next) => {
  if (!req.body)
    return next(new AppError(400, 'Update profile with at least one field'));
  const { fullName = '', phoneNumber = '', shippingAddress = '' } = req.body;

  const updateData = {};
  fullName && (updateData.fullName = fullName);
  shippingAddress && (updateData.shippingAddress = shippingAddress);
  phoneNumber && (updateData.phoneNumber = phoneNumber);

  // Update user using findByIdAndUpdate
  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  }).select('+shippingAddress');
  if (!user) return next(new AppError(404, 'User not found'));

  if (req.file) return next();
  oneDocApiResponse(res, 200, { doc: user });
});
