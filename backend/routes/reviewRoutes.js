import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import {
  getReviewsByProductId,
  createReview,
  editReviewById,
  deleteReviewById,
  isUserAuthor,
  canLeaveReview,
} from '../controllers/reviewController.js';

const router = Router();
router.post('/', protect, canLeaveReview, createReview);

router
  .route('/:id')
  .get(getReviewsByProductId)
  .patch(protect, isUserAuthor, editReviewById)
  .delete(protect, isUserAuthor, deleteReviewById);

// Export module:
export default router;
