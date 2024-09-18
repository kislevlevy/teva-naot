// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import { slugify } from '../utils/slugify.js';

// DB Schema:
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      unique: true,
      trim: true,
      maxLength: [40, '{VALUE}- Product name must not exceed 40 characters.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
        message: '{VALUE}- Product name must only contain letters.',
      },
    },
    slug: String,
    description: {
      type: String,
      trim: true,
      maxLength: [
        400,
        '{VALUE}- Product description must not exceed 400 characters.',
      ],
      required: [true, 'Product description is required.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
        message:
          '{VALUE}- Product description must only contain alphanumeric characters.',
      },
    },
    category: {
      type: [
        {
          type: String,
          validate: {
            validator: (val) =>
              validator.isAlpha(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
            message:
              '{VALUE}- Each category must must not exceed 20 characters and contain only letters.',
          },
        },
      ],
      required: [true, 'Product category is required.'],
    },
    ratingsAvg: {
      type: Number,
      default: 1,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    baseBarcode: {
      type: String,
      required: [true, 'Product barcode is required.'],
      validate: {
        validator: (val) => validator.isNumeric(val, { ignore: '-' }),
        message: '{VALUE}- Base barcode must be numeric.',
      },
    },
    colors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductColor',
      },
    ],
    price: {
      type: Number,
      default: 0,
      min: [1, "price can't be negative"],
    },
    image: {
      type: String,
      default: '',
    },
    availableSizes: {
      type: [String],
      validate: {
        validator: (arr) =>
          arr.length === 2 && arr.every((ele) => ele > 1 && ele < 50),
        message:
          '{VALUE}- available sizes is an array built in this form [min, max] all sizes are has to be 1 < size < 50',
      },
      required: [true, 'availableSizes is a required field'],
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
        delete ret.__v;
      },
    },
  }
);

// Index:
ProductSchema.index({ slug: 1 });
ProductSchema.index({ ratingsAvg: -1, ratingsQuantity: -1 });

// Virtual fields:
// Reviews virtual field array:
ProductSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Middleware:
// Add slug to product:
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

ProductSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'reviews',
    select: '_id user -product',
  });
  this.populate({
    path: 'colors',
  });
  next();
});

// Export schema:
const Product = mongoose.model('Product', ProductSchema);
export default Product;
