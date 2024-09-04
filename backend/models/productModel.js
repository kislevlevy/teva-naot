// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

// DB Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      unique: true,
      trim: true,
      maxLength: [40, 'Product name must not exceed 40 characters.'],
      validate: {
        validator: (val) =>
          validator.isAlpha(val, ['he', 'en-US'], { ignore: ' -' }),
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
          validator.isAlphanumeric(val, ['he', 'en-US'], { ignore: ' .,-\n' }),
        message: 'Product description must only contain alphanumeric characters.',
      },
    },
    category: {
      type: [String],
      required: [true, 'Product category is required.'],
      validate: {
        validator: (arr) =>
          arr.length > 0 &&
          arr.every(
            (val) =>
              val.length < 21 &&
              validator.isAlpha(val, ['he', 'en-US'], { ignore: ' -' })
          ),
        message:
          'Each category must must not exceed 20 characters and contain only letters.',
      },
    },
    images: {
      type: [String],
      required: [true, 'Product images are required.'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'There must be at least one image.',
      },
    },
    avgRating: {
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
    variants: {
      type: [
        {
          color: {
            type: String,
            validate: {
              validator: (val) =>
                validator.isAlphanumeric(val, ['he', 'en-US'], { ignore: '- ' }),
              message: 'Color must only contain alphanumeric characters.',
            },
            required: [true, 'Color is required.'],
          },
          image: {
            type: String,
            required: [true, 'Image is required.'],
          },
          colorBarcode: {
            type: String,
            required: [true, 'Color barcode is required.'],
            validate: {
              validator: (val) => validator.isNumeric(val, { ignore: '-' }),
              message: 'Color barcode must be numeric.',
            },
          },
          sizes: {
            type: [
              {
                type: [String, Number],
                validate: {
                  validator: (arr) =>
                    typeof arr[0] === 'string' && typeof arr[1] === 'number',
                  message: 'Size must be a string followed by a number.',
                },
              },
            ],
            required: [true, 'Sizes are required.'],
          },
          price: {
            type: Number,
            min: 1,
            required: [true, 'Price is required.'],
          },
        },
      ],
      required: [true, 'Variants are required.'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'There must be at least one variant.',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Export schema
const Product = mongoose.model('Product', productSchema);
export default Product;
