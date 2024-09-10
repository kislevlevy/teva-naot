import mongoose from 'mongoose';
import ProductGroup from './productGroupModel.js';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
      //create middleware to check only 1 user for feedback for groupProduct
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
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
        message: 'Review must only contain letters.',
      },
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must be at most 10'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    daysSinceReview: { type: Number },
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

//calculates the number of days passed since a created review
reviewSchema.pre('save', function (next) {
  const diff = Date.now() - this.createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  this.daysSinceReview = days;

  next();
});

//populate user and productGroup(questionable, might be redundant if frontend have it)
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '',
  }).populate({ path: 'productGroup', select: '' });
  next();
});

const calcAvgRating = (num) =>
  async function () {
    const productGroup = await ProductGroup.findById(this.productGroup);
    productGroup.ratingsQuantity + num;
    const { ratingsAvg, ratingsQuantity } = productGroup;

    productGroup.ratingsAvg = Math.round(
      (ratingsAvg * (ratingsQuantity - num) + this.rating) / ratingsQuantity
    );

    await productGroup.save();
  };

// Calculate new average rating and quantity in case of create/edit review
reviewSchema.post('save', calcAvgRating(1));

// OPTIONAL: in case we want that user can delete feedback
reviewSchema.post('remove', calcAvgRating(-1));

const Review = mongoose.model('Review', reviewSchema);
export default Review;
