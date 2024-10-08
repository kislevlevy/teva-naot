// Module imports:
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { hebAlphaLine, hebAlphaNumericLine } from '../utils/hebrewValidate.js';

// Schema:
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      maxlength: [50, '{VALUE}- Full name cannot exceed 50 characters'],
      validate: {
        validator: (val) => hebAlphaLine(val),
        message: '{VALUE}- Full name must only contain english or hebrew characters',
      },
    },
    profileImg: {
      type: String,
      validate: {
        validator: (val) =>
          val.startsWith('http://res.cloudinary.com') ||
          val.startsWith('https://res.cloudinary.com'),
        message:
          '{VALUE}- The provided image URL is not a valid Cloudinary image url.',
      },
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: '{VALUE}- Please provide a valid email',
      },
      select: false,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      validate: [
        {
          validator: function (val) {
            return val.length >= 8;
          },
          message: '{VALUE}- Password must be at least 8 characters long',
        },
        {
          validator: function (val) {
            return validator.isStrongPassword(val, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            });
          },
          message:
            '{VALUE}- Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
        },
      ],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password are not the same!',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      validate: {
        validator: (val) => /^05\d-\d{3}-\d{4}$/.test(val),
        message: '{VALUE}- Please use a valid phone number',
      },
    },
    role: {
      type: String,
      enum: ['client', 'employee', 'admin'],
      default: 'client',
      select: false,
    },
    permissions: {
      type: [String],
      enum: ['product', 'shipping', 'supply', 'cs'],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetTokenExpires: {
      type: Date,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
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
      select: false,
    },
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

//used in the authController.forgotPassword, and save it in the passwordResetToken field of the relevent user
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 5 * 60 * 1000;
  return resetToken;
};

userSchema.methods.checkPassword = async (enteredPassword, userPassword) =>
  await bcrypt.compare(enteredPassword, userPassword);

userSchema.methods.changePasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const timeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return iat < timeStamp;
  }
  return false;
};

// Virtual fields:
userSchema.virtual('orderHistory', {
  ref: 'Order',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre(/^findOne/, function (next) {
  this.populate('orderHistory');
  next();
});

// Middeleware:
// Password hashing:
userSchema.pre('save', async function (next) {
  // Only runs if password hasent been modified
  if (!this.isModified('password')) return next();

  // Encrypyt password:
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Export schema:
const User = mongoose.model('User', userSchema);
export default User;
