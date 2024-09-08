import mongoose from 'mongoose';

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
        type: [
          {
            type: [String, Number],
            validate: {
              validator: (arr) =>
                typeof arr[0] === 'string' && typeof arr[1] === 'number',
              message: 'Each size must be a string followed by a number.',
            },
          },
        ],
        required: [true, 'Sizes are required.'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number'],
      },
    },
  ],
  shippingAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    zip: {
      type: String,
      required: [true, 'ZIP code is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
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
