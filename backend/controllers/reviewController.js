import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';
import { deleteOneById, editOneById } from '../utils/handlerFactory.js';
import Order from '../models/orderModel.js';

export const getReviewsByProductId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!product) return next(new AppError(400, 'Product ID is not exist'));

  const reviews = await Review.find({ product: id });

  res.status(200).json({
    status: 'success',
    results: reviews.length, // amount of reviews of productGroup
    reviews,
  });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const { product, review, rating } = req.body;

  const existingReview = await Review.findOne({
    user: req.user.id,
    product: product,
  });
  if (existingReview) {
    return next(
      new AppError(400, 'You have already left a review for this product')
    );
  }

  const newReview = await Review.create({
    user: req.user.id,
    product: product,
    review,
    rating,
    createdAt: Date.now(),
  });
  res.status(200).json({
    status: 'success',
    newReview,
  });
});

export const deleteReviewById = deleteOneById(Review);
export const editReviewById = editOneById(Review);
export const isUserAuthor = asyncHandler(async (req, res, next) => {
  // Assign veriables:
  const { id: reviewId } = req.params;
  const { _id: userId } = req.user;

  // Check author in review to be user loggedin
  const review = await Review.findById(reviewId);

  if (review.user._id === userId) return next();

  // Error not authorized:
  return next(new AppError(403, 'you are unauthorized to acess this route'));
});

// Middleware to check if the user has bought the product and hasn't left a review yet
export const canLeaveReview = asyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const userId = req.user.id;

  // Fetch product and populate colors
  const productDoc = await Product.findById(product).populate('colors');
  if (!productDoc) {
    return next(new AppError(404, 'Product not found'));
  }

  const colorIds = productDoc.colors.map((color) => color._id.toString());

  // Check if user purchased any product color
  const hasPurchased = await Order.findOne({
    user: userId,
    'products.productColor': { $in: colorIds },
  });

  if (!hasPurchased) {
    return next(
      new AppError(403, 'You must purchase this product to leave a review')
    );
  }

  // Check if user has already left a review
  const existingReview = await Review.findOne({
    user: userId,
    product: product,
  });

  if (existingReview) {
    return next(
      new AppError(400, 'You have already left a review for this product')
    );
  }

  next();
});
