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
  disableMe,
} from '../controllers/authController.js';
import {
  getMe,
  updateMe,
  getUsers,
  getUsertById,
  editUserById,
} from '../controllers/userController.js';
import { upload, uploadProfileImage } from '../utils/storage.js';
import { oneDocApiResponse } from '../utils/handlerFactory.js';

const router = Router();

router.post('/login', login);
router.get('/logout', logout);
router.post(
  '/signup',
  upload.single('profileImg'),
  signup,
  uploadProfileImage,
  sentResAndToken
);
router.patch('/resetPassword/:resetToken', resetPassword);

router.use(protect);
router.get('/', getUsers);
router.post('/forgotPassword', forgotPassword);
router.patch('/changePassword', changePassword);

router.get('/getMe', getMe);
router.delete('/disableMe', disableMe, logout);
router.patch(
  '/updateMe',
  upload.single('profileImg'),
  updateMe,
  uploadProfileImage,
  (req, res, next) => oneDocApiResponse(res, 200, { doc: req.user })
);
router.route('/:id').get(getUsertById).patch(editUserById);

export default router;
