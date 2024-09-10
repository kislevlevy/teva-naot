// Module imports:
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Schema:
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      maxlength: [50, 'Full name cannot exceed 50 characters'],
      validate: {
        validator: (val) => validator.isAlpha(val, ['en-US'], { ignore: ' -' }),
        message: 'Full name must only contain english characters',
      },
    },
    profileImg: {
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
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: 'Please provide a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      validate: [
        {
          validator: function (val) {
            return val.length >= 8;
          },
          message: 'Password must be at least 8 characters long',
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
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
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
    role: {
      type: String,
      enum: [
        'customer',
        'inventoryManager',
        'shippingManager',
        'productManager',
        'csManager',
        'admin',
      ],
      default: 'customer',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
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
    favoriteCategories: [
      {
        category: {
          type: String,
          validate: {
            validator: (val) =>
              validator.isAlpha(val, ['he', 'en-US'], { ignore: ' -' }),
            message: 'Category must only contain characters',
          },
        },
        clicks: Number,
      },
    ],
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

userSchema.methods.checkPassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};
// Virtual fields:
userSchema.virtual('orderHistory', {
  ref: 'Order',
  foreignField: 'user',
  localField: '_id',
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
