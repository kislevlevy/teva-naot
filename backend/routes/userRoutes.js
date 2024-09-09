import express, { Router } from 'express';
import {
  login,
  forgotPassword,
  resetPassword,
  protect,
  changePassword,
  logout,
  signup,
} from '../controllers/authController.js';

import { getMe } from '../controllers/userController.js';

const router = Router();

router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/signup').post(signup);
router.route('/resetPassword/:resetToken').patch(resetPassword);

router.use(protect);
router.route('/forgotPassword').post(forgotPassword);
router.route('/changePassword').patch(changePassword);

router.route('/getMe').get(getMe);

export default router;
