import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import AppError from '../utils/appError.js';
import ProductGroup from '../models/productGroupModel.js';

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

export const updateProductGroupRating = async (productGroupId) => {
  const productGroup = await ProductGroup.findById(productGroupId).populate(
    'reviews'
  );
  console.log('Updating ratings for product group:', productGroupId); // Add this
  console.log('Product group reviews:', productGroup.reviews); // Add this

  if (productGroup.reviews.length > 0) {
    const totalRating = productGroup.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const avgRating = totalRating / productGroup.reviews.length;

    await ProductGroup.findByIdAndUpdate(productGroupId, {
      ratingsAvg: avgRating,
      ratingsQuantity: productGroup.reviews.length,
    });
  } else {
    await ProductGroup.findByIdAndUpdate(productGroupId, {
      ratingsAvg: 0,
      ratingsQuantity: 0,
    });
  }
};

export const createReview = asyncHandler(async (req, res, next) => {
  const { productGroupId, review, rating } = req.body;
  console.log('Product Group ID: ', productGroupId); // Log productGroupId

  const existingReview = await Review.findOne({
    user: req.user.id,
    productGroup: productGroupId,
  });
  if (existingReview)
    return next(new AppError(400, 'you have already reviewd this product group'));

  const newReview = await Review.create({
    user: req.user.id,
    productGroup: productGroupId,
    review,
    rating,
    createdAt: Date.now(),
  });
  res.status(200).json({
    status: 'success',
    newReview,
  });
});
export const editReviewById = asyncHandler(async (req, res, next) => {
  const { review, rating } = req.body;
  const { id: reviewId } = req.params;

  const updatedReview = await Review.findOneAndUpdate(
    {
      _id: reviewId,
      user: req.user.id,
    },
    { review, rating },
    {
      new: true, //return the updated review after the changes are saved
      runValidators: true,
    }
  );
  if (!updatedReview) return next(new AppError(404, 'Review not found'));

  await updateProductGroupRating(updatedReview.productGroup);

  res.status(200).json({
    status: 'success',
    updatedReview,
  });
});

export const deleteReviewById = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOneAndDelete({ _id: reviewId, user: req.user.id });
  if (!review) return next(new AppError(404, 'Review not found'));

  await updateProductGroupRating(review.productGroup);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
