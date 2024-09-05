import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel";
import AppError from "../utils/appError";

const getReviews = asyncHandler(async (req, res, next) => {});
const addReview = asyncHandler(async (req, res, next) => {});
const editReview = asyncHandler(async (req, res, next) => {});
const deleteReview = asyncHandler(async (req, res, next) => {});
const filterByRating = asyncHandler(async (req, res, next) => {});
const getAverageReview = asyncHandler(async (req, res, next) => {});
export {
  getReviews,
  addReview,
  editReview,
  deleteReview,
  filterByRating,
  getAverageReview,
};
