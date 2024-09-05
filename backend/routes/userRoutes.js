import express, { Router } from 'express';
import {
  login,
  logOut,
  signUp,
  forgotPassword,
  resetPassword,
  protect,
  restrictByRole,
  changePassword,
} from '../controllers/authController.js';

const router = Router();

router.route('/login').post(login);
router.route('/logOut').post(protect, logOut);
router.route('/signup').post(signUp);
router.route('/protect').post(protect);
router.route('/forgotPassword').post(protect, forgotPassword);
router.route('/resetPassword/:resetToken').post(resetPassword);
router.route('/restrictByRole').post(restrictByRole);
router.route('/changePassword').post(protect, changePassword);

export default router;
