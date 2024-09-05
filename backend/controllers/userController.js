import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import {
  editOneById,
  getMany,
  getOneById,
  oneDocApiReponse,
} from "../utils/handlerFactory.js";

export const getUsers = getMany(User);
export const getUsertById = getOneById(User);
export const editUserById = editOneById(User);

const getMe = asyncHandler(async (req, res, next) => {
  // req.user- protect
  // in route - router.get('/me', protect, getMe);
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  oneDocApiReponse(res, 200, { doc: user });
});

const updateMe = asyncHandler(async (req, res, next) => {
  const { fullName, profileImg, shippingAddress, favoriteCategories } =
    req.body;

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError(400, "Password updates are not allowed here."));
  }

  // Prepare the update data
  const updateData = {
    fullName,
    profileImg,
    favoriteCategories,
    ...(shippingAddress && { shippingAddress }), // Update shippingAddress if provided
  };

  // Remove undefined fields from updateData
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  // Update user using findByIdAndUpdate
  const user = await User.findByIdAndUpdate(req.user.id, updateData);
  oneDocApiReponse(res, 200, { doc: updatedProduct });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export { getMe, updateMe };
