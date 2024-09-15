import { Router } from 'express';

import {
  login,
  forgotPassword,
  resetPassword,
  protect,
  changePassword,
  logout,
  signup,
  sentResAndToken,
  getLoggedInUserDetails,
} from '../controllers/authController.js';
import {
  getMe,
  updateMe,
  getUsers,
  getUsertById,
  editUserById,
} from '../controllers/userController.js';
import { upload, uploadProfileImage } from '../utils/storage.js';

const router = Router();

router.route('/login').post(login);
router.route('/logout').get(logout);
router
  .route('/signup')
  .post(upload.single('profileImage'), signup, uploadProfileImage, sentResAndToken);
router.route('/resetPassword/:resetToken').patch(resetPassword);

router.use(protect);
router.route('/').get(getUsers);
router.route('/forgotPassword').post(forgotPassword);
router.route('/changePassword').patch(changePassword);
router.route('loggedIn').get(getLoggedInUserDetails);

router.route('/getMe').get(getMe);
router.route('/updateMe').patch(updateMe);
router.route('/:id').get(getUsertById);
router.route('/:id').patch(editUserById);

export default router;
