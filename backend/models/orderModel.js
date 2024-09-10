import mongoose from 'mongoose';
import validator from 'validator';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
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
      price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number'],
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
          validator: (val) =>
            validator.isAlpha(val, ['en-US', 'he'], { ignore: ' -' }),
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
  paymentMethod: {
    type: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
      required: [true, 'Payment type is required'],
    },
    details: {
      type: Object,
    },
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'shipped', 'delivered', 'canceled'],
      message: '{VALUE} is not a valid status',
    },
    default: 'pending',
  },
  trackingNumber: {
    type: String,
    required: [true, 'Tracking number is required'],
  },
  orderDate: {
    type: Date,
    required: [true, 'Order date is required'],
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
