// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

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
        ref: 'Product',
      },
    ],
    lastProductPrice: {
      type: Number,
      default: 0,
    },
    lastProductImage: {
      type: String,
      default: '',
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
  this.slug = slugify(this.name, { lower: true });
  next();
});

ProductSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'reviews',
    select: '-__v',
  });
  next();
});

// Export schema:
const Product = mongoose.model('Product', ProductSchema);
export default Product;
