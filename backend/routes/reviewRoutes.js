import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import {
  getReviewsByProductGroupId,
  createReview,
  editReviewById,
  deleteReviewById,
  isUserAuthor,
  canLeaveReview,
} from '../controllers/reviewController.js';

const router = Router();
router.route('/').post(protect, canLeaveReview, createReview);

// router.route('/').post(protect, createReview);
router
  .route('/:id')
  .get(getReviewsByProductGroupId)
  .patch(protect, isUserAuthor, editReviewById)
  .delete(protect, isUserAuthor, deleteReviewById);

// Export module:
export default router;
