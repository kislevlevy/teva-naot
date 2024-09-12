// Imports:
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { promisify } from 'util';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/email.js';

// JWT utils:
const sendJwtCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 86_400_000),
  });
};
const sendRes = (user, statusCode, token, res) => {
  const { email, fullName, _id, profileImg } = user;
  res.status(statusCode).json({
    status: 'success',
    data: {
      user: { email, fullName, _id, profileImg },
      token,
    },
  });
};

//front parameters: email, password
export const login = asyncHandler(async (req, res, next) => {
  // Veriables:
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError(403, 'Missing details'));

  // Get user:
  const user = await User.findOne({ email }).select('+password isActive');
  if (!user || !user.isActive)
    return next(new AppError(401, 'This account does not exist.'));

  // Check for currect password:
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError(401, 'Invalid email or password'));

  // create token:
  const token = sendJwtCookie(user._id, res);

  // return cookie:
  sendRes(user, 200, token, res);
});

//front parameters: fullName, email, password, confirmPassword, profileImg
export const signup = asyncHandler(async (req, res, next) => {
  // Veriables:
  const { fullName, email, password, passwordConfirm, profileImg } = req.body;
  let user;
  let isNew = false;

  // Guard:
  if (!email || !password || !passwordConfirm || !fullName)
    return next(new AppError(403, 'Missing details'));
  if (password !== passwordConfirm)
    return next(new AppError(403, 'Passwords are not matched!'));

  // If the user exists but is disabled, reactivate their account
  const existingUser = await User.findOne({ email }).select('+isActive');
  if (existingUser) {
    if (!existingUser.isActive) {
      user = {
        ...existingUser,
        isActive: true,
        password,
        confirmPassword,
        fullName,
        profileImg,
      };
      existingUser = user;
      await existingUser.save({ validateBeforeSave: true });
    } else return next(new AppError(403, 'User already exist please login'));
  } else {
    //If the user does not exist or is active - create a new account
    user = await User.create({
      email,
      password,
      passwordConfirm,
      profileImg,
      fullName,
    });
    isNew = true;
  }

  // return cookie:
  const token = sendJwtCookie(user._id, res);
  sendRes(user, isNew ? 201 : 200, token, res);
});

//front parameters: email
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // Veriables:
  const { email } = req.body;
  if (!email) return next(new AppError(401, 'Bad request - email is missing'));

  // fetch user from DB:
  const user = await User.findOne({ email }).select('+isActive');
  if (!user || !user.isActive)
    return next(
      new AppError(
        404,
        'No account associated with the given email, or the accout is disabled.'
      )
    );

  //only update the fields we want to modify(passwordResetToken in our case)
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //handling the email message and link(a reset password form) to the user
  const resetURL = `${process.env.FRONT_END}/resetPassword/${resetToken}`;
  try {
    await sendEmail('passwordReset', user, resetURL); // MUL DANA
    res.status(200).json({
      status: 'success',
      message: 'The password reset link has been sent to your email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(500, 'There was a problem sending email'));
  }
});

//front parameters: newPassword, confirmNewPassword
export const resetPassword = asyncHandler(async (req, res, next) => {
  const {
    params: { resetToken },
    body: { password, passwordConfirm },
  } = req;
  if (!password || !passwordConfirm)
    return next(new AppError(404, 'All fields are mandetory.'));

  if (password !== passwordConfirm)
    return next(new AppError(404, 'Passwords do not match'));

  //extract the token from the URL and hash it, in order to compare it against reset tokens in the DB which are saved in their hashed version
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //find the user by the token and the expiration, then assigned the new password
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
    isActive: true,
  });
  if (!user) return next(new AppError(404, 'Token is invalid or has expired'));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save({ validateBeforeSave: true });

  // create token:
  const token = sendJwtCookie(user._id, res);

  // return cookie:
  sendRes(user, 200, token, res);
});

export const protect = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, 'Please Login'));
  const { jwt: token } = req.cookies;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded || decoded.exp < Date.now() / 1000)
    return next(new AppError(403, 'Please login, token has expired!'));

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(403, 'Please login, user no longer exist!'));

  // convert passwordChangedAt to seconds, then check if user changed password, if he did, tell him to log in
  // this will prevent any valid jwt that users already not using to increase security
  if (user.changePasswordAfter(decoded.iat))
    return next(new AppError(403, 'User recently changed password, please login!'));

  // Set user and proseed to next function:
  req.user = user;
  next();
});

export const restrictByRole = (...roles) => {
  return (req, res, next) => {
    // Gurd:
    if (!roles.includes(req.user.role))
      return next(
        new AppError(403, 'You do not have permission to perform this action')
      );

    // Proseed to next function:
    next();
  };
};
export const restrictByPermission = (...permissions) => {
  return (req, res, next) => {
    if (
      !req.user.permissions ||
      !permissions.some((permission) => req.user.permissions.includes(permission))
    ) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

// front parameters: currentPassword, newPassword, confirmNewPassword
export const changePassword = asyncHandler(async (req, res, next) => {
  // Veriables:
  const { currentPassword, password, passwordConfirm } = req.body;
  if (!currentPassword || !password || !passwordConfirm)
    return next(new AppError(400, 'All fields are mandetory'));

  // find user:
  const user = await User.findById(req.user.id).select('+password');

  if (password !== passwordConfirm)
    return next(new AppError(400, 'Passwords do not match'));
  if (!(await user.checkPassword(currentPassword, user.password)))
    return next(new AppError(401, 'Your current password is incorrect'));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordChangedAt = new Date(Date.now() - 1000);
  await user.save();

  // create token:
  const token = sendJwtCookie(user._id, res);

  // return cookie:
  sendRes(user, 200, token, res);
});

export const logout = asyncHandler(async (req, res, next) => {
  //overide the value of jwt with "loggedout", and make it the cookie expire in 5 seconds
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
