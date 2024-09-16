import mongoose from 'mongoose';
import validator from 'validator';
import Product from './productModel.js';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productColor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductColor',
        required: true,
      },
      price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number'],
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
    },
  ],
  shippingAddress: {
    type: {
      address: {
        type: String,
        required: [true, 'Address is a required field'],
        minLength: [2, 'Address name must be at least 2 character long'],
        maxlength: [50, 'Address name must no exceed 50 character long'],
        trim: true,
        validate: {
          validator: (val) =>
            validator.isAlphanumeric(val, 'he', {
              ignore: /[ .,\-\nA-Za-z]/g,
            }),
          message: 'Address must only contain alpha numeric characters',
        },
      },
      city: {
        type: String,
        required: [true, 'City is a required field'],
        minLength: [2, 'City name must be at least 2 character long'],
        maxlength: [20, 'City name must no exceed 20 character long'],
        validate: {
          validator: function (val) {
            return /^[a-zA-Z\u0590-\u05FF -]+$/.test(val); // Allows English, Hebrew, spaces, and hyphens
          },
          message: 'City must only contain characters',
        },
      },
      postalCode: {
        type: String,
        required: [true, 'Postal code is a required field'],
        validate: {
          validator: (val) => validator.isPostalCode(val, 'IL'),
          message: 'Postal code is not valid',
        },
      },
    },
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'procceing', 'shipped', 'delivered', 'canceled'],
      message: '{VALUE} is not a valid status',
    },
    default: 'pending',
  },
  total: {
    type: Number,
    required: [true, 'Total price is a required field'],
  },
  paymentConfirmation: String,
  orderDate: {
    type: Date,
    default: Date.now(),
  },
});

orderSchema.post('save', function () {
  this.products.forEach(async (ele) => {
    const sold = [...ele.sizes.values()].reduce((acc, val) => acc + val, 0);

    await Product.findOneAndUpdate({ colors: ele.productColor }, { sold });
  });
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
