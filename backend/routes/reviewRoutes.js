import { Router } from 'express';

import {
  getReviewsByProductGroupId,
  createReview,
  editReviewById,
  deleteReviewById,
} from '../controllers/reviewController';

const router = Router();

router.route('/').get(getReviewsByProductGroupId).post(protect, createReview);
router
  .route('/:id')
  .patch(protect, editReviewById)
  .delete(protect, deleteReviewById);
