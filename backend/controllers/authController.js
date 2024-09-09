import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { promisify } from 'util';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/email.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//front parameters: email, password
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError(403, 'Missing details'));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isActive) {
    return next(new AppError(401, 'This account is deactivated or does not exist.'));
  }
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError(401, 'Invalid email or password'));
  }
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({
    status: 'success',
    newUser: {
      email: user.email,
    },
    cookie: token,
    message: 'successfully logged in :)',
  });
});

//front parameters: fullName, email, password, confirmPassword, profileImg
export const signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, passwordConfirm, profileImg } = req.body;
  if (!email || !password || !passwordConfirm || !fullName)
    return next(new AppError(403, 'Missing details'));
  if (password !== passwordConfirm)
    return next(new AppError(403, 'Passwords are not matched!'));

  // If the user exists but is disabled, reactivate their account

  const existingUser = await User.findOne({ email }).select('+isActive');
  if (existingUser && !existingUser.isActive) {
    existingUser.isActive = true;
    existingUser.password = password;
    existingUser.passwordConfirm = confirmPassword;
    existingUser.fullName = fullName;
    existingUser.profileImg = profileImg;

    await existingUser.save({ validateBeforeSave: true });

    const token = signToken(existingUser._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
    });
    return res.status(200).json({
      status: 'success',
      token,
      newUser: {
        email: existingUser.email,
        fullName: existingUser.fullName,
        profileImg: existingUser.profileImg,
      },
      message: 'Account reactivated successfully',
    });
  }
  //If the user does not exist or is active - create a new account
  const newUser = await User.create({
    email,
    password,
    passwordConfirm,
    profileImg,
    fullName,
  });
  //genereate the jwt token of the user, create jwt in both the login in signup, for better UX, so a user will be forward immeditaly to the website after registeration
  const token = signToken(newUser._id);

  //store the jwt in cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000),
  });
  //response contains: email, fullName, profileImg
  res.status(201).json({
    status: 'success',
    token,
    newUser: {
      email: newUser.email,
      fullName: newUser.fullName,
      profileImg: newUser.profileImg,
    },
  });
});

//front parameters: email
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError(401, 'Bad request - email is missing'));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(404, 'No account associated with the given email'));
  } else if (!user.isActive) {
    return next(
      new AppError(404, 'There is no active user with that email address.')
    );
  }
  //only update the fields we want to modify(passwordResetToken in our case)
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  //handling the email message and link(a reset password form) to the user
  const resetURL = `http://127.0.0.1:5500/api/users/resetPassword/${resetToken}`;

  const mailOptions = {
    from: 'Teva Naot <dontreplay@teva-naot.com>',
    to: user.email,
    subject: 'Password reset',
    text: `<h3>Please follow this link to reset your password:</h3>
    <a href ="${resetURL}">} ${resetURL}</a>`,
  };
  try {
    await sendEmail(mailOptions);
    res.status(200).json({
      status: 'success',
      message: 'The password reset link has been sent to your email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(500), 'There was a problem sending email');
  }
});

//front parameters: newPassword, confirmNewPassword
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword) {
    return next(new AppError(404), 'Passwords do not match');
  }
  //extract the token from the URL and hash it, in order to compare it against reset tokens in the DB which are saved in their hashed version
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //find the user by the token and the expiration, then assigned the new password
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
    isActive: true,
  });
  if (!user) return next(new AppError(404), 'Token is invalid or has expired');

  user.password = newPassword;
  user.passwordConfirm = confirmNewPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();
  // create new token so the user will be able to login immediatly
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

export const protect = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, 'Please Login'));
  const token = req.cookies.jwt;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded || decoded.exp < Date.now() / 1000)
    return next(new AppError(403), 'Please login, token has expired!');

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(403), 'Please login, user no longer exist!');
  //convert passwordChangedAt to seconds, then check if user changed password, if he did, tell him to log in
  // this will prevent any valid jwt that users already not using to increase security
  if (user.passwordChangedAt) {
    const passwordChangeTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < passwordChangeTimeStamp) {
      return next(
        new AppError(403),
        'User recently changed password, please login!'
      );
    }
  }
  req.user = user;

  next();
});

export const restrictByRole = asyncHandler(async (...roles) => {
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403),
        'You do not have permission to perform this action'
      );
    }
    next();
  };
});

// front parameters: currentPassword, newPassword, confirmNewPassword
export const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkPassword(currentPassword, user.password)))
    return next(new AppError(401), 'Your current password is incorrect');
  if (newPassword !== confirmNewPassword)
    return next(new AppError(400), 'Passwords do not match');

  user.password = newPassword;
  user.passwordConfirm = confirmNewPassword;
  user.passwordChangedAt = Date.now() - 1000;

  await user.save();

  //to denied access with the email + password of the user, before the update happend
  const token = signToken(user._id);
  //saving jwt as cookie in the user browser
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: new Date(
      Date.now() + process.env,
      JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
  });

  res.status(200).json({
    status: 'success',
    token,
    message: 'Password successfully changed',
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  //overide the value of jwt with "loggedout", and make it the cookie expire in 5 seconds
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
