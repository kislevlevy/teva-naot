// Module Imports:
import mongoose from 'mongoose';
import validator from 'validator';
import Product from './productModel.js';

// DB Schema:
const ProductColorSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) =>
        validator.isAlphanumeric(val, 'he', { ignore: /[ .,\-\nA-Za-z]/g }),
      message: '{VALUE}- Name must only contain alphanumeric characters.',
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
      message: '{VALUE}- Lable contents is not a valid hex color or texture image.',
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
        message:
          '{VALUE}- The provided image URL is not a valid Cloudinary image url.',
      },
    },
  ],
  colorBarcode: {
    type: String,
    required: [true, 'Color barcode is required.'],
    validate: {
      validator: (val) => validator.isAlphanumeric(val, 'en-US', { ignore: '-' }),
      message: '{VALUE}- Color barcode must be numeric.',
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
        '{VALUE}- Sizes must be a map of numeric size values with non-negative quantities.',
    },
  },
  priceBeforeDiscount: {
    type: Number,
    min: 1,
  },
  price: {
    type: Number,
    min: 1,
    required: [true, 'Price is required.'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product color must be related to a product.'],
  },
});

// Indexes:
ProductColorSchema.index({ price: -1 });

// Middlewares:
// Populate product group:

// update product group price + image, when new product is created
ProductColorSchema.post('save', async function () {
  const product = await Product.findById(this.product);
  product.colors.push(this._id);
  product.image = this.images[0];

  if (product.price === 0 || this.price < product.price) product.price = this.price;
  await product.save();
});
ProductColorSchema.set('toJSON', {
  transform: (doc, ret) =>
    ret.sizes
      ? {
          ...ret,
          sizes: Object.fromEntries(
            Object.entries(ret.sizes).map(([size, stock]) => [
              size,
              stock > 0 ? 1 : 0,
            ])
          ),
        }
      : ret,
});
// Export schema:
const ProductColor = mongoose.model('ProductColor', ProductColorSchema);
export default ProductColor;
