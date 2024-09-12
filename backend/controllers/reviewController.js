import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';
import { deleteOneById, editOneById } from '../utils/handlerFactory.js';

export const getReviewsByProductGroupId = asyncHandler(async (req, res, next) => {
  const { id: productGroupId } = req.params;
  if (!productGroupId)
    return next(new AppError(400, 'Product group ID is not exist'));

  const reviews = await Review.find({ productGroup: productGroupId });

  res.status(200).json({
    status: 'success',
    results: reviews.length, // amount of reviews of productGroup
    reviews,
  });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const { productId, review, rating } = req.body;

  const existingReview = await Review.findOne({
    user: req.user.id,
    product: productId,
  });

  const newReview = await Review.create({
    user: req.user.id,
    product: productId,
    review,
    rating,
    createdAt: Date.now(),
  });
  res.status(200).json({
    status: 'success',
    newReview,
  });
});
// export const editReviewById = asyncHandler(async (req, res, next) => {
//   const { review, rating } = req.body;
//   const { id: reviewId } = req.params;

//   const updatedReview = await Review.findOneAndUpdate(
//     {
//       _id: reviewId,
//       user: req.user.id,
//     },
//     { review, rating },
//     {
//       new: true, //return the updated review after the changes are saved
//       runValidators: true,
//     }
//   );
//   if (!updatedReview) return next(new AppError(404, 'Review not found'));

//   await updateProductGroupRating(updatedReview.productGroup);

//   res.status(200).json({
//     status: 'success',
//     updatedReview,
//   });
// });

// asyncHandler(async (req, res, next) => {
//   const { id: reviewId } = req.params;
//   const review = await Review.findOneAndDelete({ _id: reviewId, user: req.user.id });
//   if (!review) return next(new AppError(404, 'Review not found'));

//   await updateProductGroupRating(review.productGroup);

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

export const deleteReviewById = deleteOneById(Review);
export const editReviewById = editOneById(Review);
export const isUserAuthor = asyncHandler(async (req, res, next) => {
  // Assign veriables:
  const { id: reviewId } = req.params;
  const { _id: userId } = req.user;

  // Check author in review to be user loggedin
  const review = await Review.findById(reviewId);
  console.log('review.user:' + review.user._id);
  console.log('userId:' + userId);
  if (review.user._id === userId) return next();

  // Error not authorized:
  return next(new AppError(403, 'you are unauthorized to acess this route'));
});
