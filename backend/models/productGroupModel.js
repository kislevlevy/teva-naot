// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

// DB Schema:
const productGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      unique: true,
      trim: true,
      maxLength: [40, 'Product name must not exceed 40 characters.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
        message: 'Product name must only contain letters.',
      },
    },
    slug: String,
    description: {
      type: String,
      trim: true,
      maxLength: [400, 'Product description must not exceed 400 characters.'],
      required: [true, 'Product description is required.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
        message: 'Product description must only contain alphanumeric characters.',
      },
    },
    category: {
      type: [
        {
          type: String,
          validate: {
            validator: (val) =>
              validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
            message:
              'Each category must must not exceed 20 characters and contain only letters. ',
          },
        },
      ],
      required: [true, 'Product category is required.'],
    },
    images: [
      {
        type: String,
        validate: {
          validator: (val) =>
            validator.isURL(val, {
              protocols: ['https'],
              require_protocol: true,
            }) && val.startsWith('https://res.cloudinary.com'),
          message: 'The provided image URL is not a valid Cloudinary image url.',
        },
      },
    ],
    ratingsAvg: {
      type: Number,
      default: 0,
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
        message: 'Base barcode must be numeric.',
      },
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
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
productGroupSchema.index({ slug: 1 });
productGroupSchema.index({ ratingsAvg: -1, ratingsQuantity: -1 });

// Virtual fields:
// Reviews virtual field array:
productGroupSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'productGroup',
  localField: '_id',
});

// Middleware:
// Add slug to product:
productGroupSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productGroupSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: 'reviews',
    select: '-__v',
  });
  next();
});

// Export schema:
const ProductGroup = mongoose.model('ProductGroup', productGroupSchema);
export default ProductGroup;
