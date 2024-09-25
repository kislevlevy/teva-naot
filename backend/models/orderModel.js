import mongoose from 'mongoose';
import validator from 'validator';
import Product from './productModel.js';
import { hebAlphaLine, hebAlphaNumericLine } from '../utils/hebrewValidate.js';

const orderSchema = new mongoose.Schema(
  {
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
          minLength: [2, '{VALUE}- Address name must be at least 2 character long'],
          maxlength: [50, '{VALUE}- Address name must no exceed 50 character long'],
          trim: true,
          validate: {
            validator: (val) => hebAlphaNumericLine(val),
            message: '{VALUE}- Address must only contain alpha numeric characters',
          },
        },
        city: {
          type: String,
          required: [true, 'City is a required field'],
          minLength: [2, '{VALUE}- City name must be at least 2 character long'],
          maxlength: [20, '{VALUE}- City name must no exceed 20 character long'],
          validate: {
            validator: (val) => hebAlphaLine(val),
            message: '{VALUE}- City must only contain characters',
          },
        },
        postalCode: {
          type: String,
          required: [true, 'Postal code is a required field'],
          validate: {
            validator: (val) => validator.isPostalCode(val, 'IL'),
            message: '{VALUE}- Postal code is not valid',
          },
        },
      },
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    total: {
      type: Number,
      required: [true, 'Total price is a required field'],
    },
    paypalOrderId: String,
    orderDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'fullName phoneNumber email',
  });
  next();
});

orderSchema.post('save', function () {
  if (this.wasNew) {
    this.products.forEach(async (ele) => {
      const product = await Product.findOne({ colors: ele.productColor });
      const sold = [...ele.sizes.values()].reduce((acc, val) => acc + val, 0);

      product.sold += sold;
      product.save();
    });
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
