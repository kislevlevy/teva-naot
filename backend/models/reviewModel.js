import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.objectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },

    productGroup: {
      type: mongoose.Schema.objectId,
      ref: 'ProductGroup',
      required: [true, 'Review must belong to a product group'],
    },
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      maxlengh: [400, 'Review cannot exceed 400 characters'],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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
    select: 'fullName profileImg -__v',
  }).populate({ path: 'productGroup', select: 'name category -__v' });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
