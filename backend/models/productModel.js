// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';

// DB Schema:
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) =>
        validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
      message: 'Name must only contain alphanumeric characters.',
    },
    required: [true, 'Name is required.'],
  },
  thumbnail: {
    type: [String],
    validate: {
      validator: (arr) => {
        if (arr.length !== 2 || !['hex', 'img'].includes(arr[0])) return false;
        if (arr[0] === 'hex') return validator.isHexColor(arr[1]);
        else if (arr[0] === 'img')
          return (
            validator.isURL(arr[1], {
              protocols: ['https'],
              require_protocol: true,
            }) && arr[1].startsWith('https://res.cloudinary.com')
          );
        else return false;
      },
      message: 'Lable contents is not a valid hex color or texture image.',
    },
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
  colorBarcode: {
    type: String,
    required: [true, 'Color barcode is required.'],
    validate: {
      validator: (val) => validator.isAlphanumeric(val, 'en-US', { ignore: '-' }),
      message: 'Color barcode must be numeric.',
    },
  },
  sizes: {
    type: Map,
    of: {
      type: Number,
      min: 0,
    },
    required: [true, 'Sizes are required.'],
    validate: {
      validator: function (map) {
        return Array.from(map.entries()).every(
          ([size, quantity]) => validator.isNumeric(size) && quantity >= 0
        );
      },
      message:
        'Sizes must be a map of numeric size values with non-negative quantities.',
    },
  },
  priceBeforeDiscount: {
    type: Number,
    min: 1,
}
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
