import mongoose from 'mongoose';
import ProductGroup from './productGroupModel.js';
import { updateProductGroupRating } from '../controllers/reviewController.js';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },

    productGroup: {
      type: mongoose.Schema.ObjectId,
      ref: 'ProductGroup',
      required: [true, 'Review must belong to a product group'],
    },
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      trim: true,
      minlength: [5, 'Review must be at least 10 characters long'],
      maxlength: [400, 'Review cannot exceed 400 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must be at most 10'],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
        delete ret.__v; // Exclude __v field
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
        delete ret.__v; // Exclude __v field
      },
    },
  }
);

//index
reviewSchema.index({ productGroup: 1, user: 1 }, { unique: true });

//timeSinceReview virtual field
reviewSchema.virtual('timeSinceReview').get(function () {
  const diff = Date.now() - this.createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} days ago`;
});

//populate user and productGroup(questionable, might be redundant if frontend have it)
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullName profileImg',
  }).populate({ path: 'productGroup', select: 'name category' });
  next();
});

reviewSchema.post('save', async function () {
  await updateProductGroupRating(this.productGroup);
});

reviewSchema.post('remove', async function () {
  await updateProductGroupRating(this.productGroup);
});
const Review = mongoose.model('Review', reviewSchema);
export default Review;
