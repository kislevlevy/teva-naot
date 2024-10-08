// Module Imports:
import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';
import { hebAlphaLine, hebAlphaNumericPar } from '../utils/hebrewValidate.js';

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
        validator: (val) => hebAlphaLine(val),
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
        validator: (val) => hebAlphaNumericPar(val),
        message:
          '{VALUE}- Product description must only contain alphanumeric characters.',
      },
    },
    category: {
      type: [
        {
          type: String,
          validate: {
            validator: (val) => hebAlphaLine(val),
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
      default: ['0', '0'],
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
    select: '_id user review rating createdAt',
  });
  this.populate({
    path: 'colors',
  });
  next();
});

// Export schema:
const Product = mongoose.model('Product', ProductSchema);
export default Product;
