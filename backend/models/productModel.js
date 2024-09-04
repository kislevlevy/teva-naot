// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';

// DB Schema:
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) =>
        validator.isAlphanumeric(val, ['he', 'en-US'], { ignore: '- ' }),
      message: 'Name must only contain alphanumeric characters.',
    },
    required: [true, 'Name is required.'],
  },
  thumbnail: {
    type: [
      {
        type: String,
        enum: ['img', 'hex'],
      },
      String,
    ],
    validate: {
      validator: (arr) =>
        arr[0] === 'hex'
          ? validator.isHexColor(val[1])
          : validator.isURL(val[1], {
              protocols: ['https'],
              require_protocol: true,
            }) && val[1].startsWith('https://res.cloudinary.com'),
      message: 'Lable contents is not a valid hex color or texture image.',
    },
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
    validate: {
      validator: (val) =>
        validator.isURL(val, { protocols: ['https'], require_protocol: true }) &&
        val.startsWith('https://res.cloudinary.com'),
      message: 'The provided image URL is not a valid Cloudinary image url.',
    },
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
  productGroup: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductGroup',
    required: [true, 'Product must be related to a product group.'],
  },
});

// Indexes:
productSchema.index({ price: -1 });

// Middleware:
// Populate product group:
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'productGroup',
    fields: 'name category ratingsAvg ratingsQuantity baseBarcode',
    select: '-__v',
  });
  next();
});

// Export schema:
const Product = mongoose.model('Product', productSchema);
export default Product;
