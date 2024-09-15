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
      sizes: [[String, Number]],
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
