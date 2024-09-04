// Module imports:
import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bycrypt";

// Schema:
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
    maxlength: [50, "Full name cannot exceed 50 characters"],
  },
  profileImg: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (val) => validator.isEmail(val),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      validator: (val) =>
        validator.isStrongPassword(val, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message: "Please provide a stronger password",
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same!",
    },
  },
  role: {
    type: String,
    enum: [
      "customer",
      "inventoryManager",
      "shippingManager",
      "productManager",
      "csManager",
    ],
    default: "customer",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  isActive: Boolean,
  shippingAddress: {
    type: {
      address: {
        type: String,
        required: [true, "Address is a required field"],
        minLength: [2, "Address name must be at least 2 character long"],
        maxlength: [50, "Address name must no exceed 50 character long"],
        trim: true,
        validate: {
          validator: (val) =>
            validator.isAlphanumeric(val, ["en-US", "he"], { ignore: " -," }),
          message: "Address must only contain alpha numeric characters",
        },
      },
      city: {
        type: String,
        required: [true, "City is a required field"],
        minLength: [2, "City name must be at least 2 character long"],
        maxlength: [20, "City name must no exceed 20 character long"],
        validate: {
          validator: (val) =>
            validator.isAlpha(val, ["en-US", "he"], { ignore: " -" }),
          message: "City must only contain characters",
        },
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is a required field"],
        validate: {
          validator: (val) => validator.isPostalCode(val, "IL"),
          message: "Postal code is not valid",
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
            validator.isAlpha(val, ["he", "en-US"], { ignore: " -" }),
          message: "Category must only contain characters",
        },
      },
      clicks: Number,
    },
  ],
});

// Virtual fields:
userSchema.virtual("orderHistory", {
  ref: "Order",
  foriegnField: "user",
  localField: "_id",
});

// Middeleware:
// Password hashing:
userSchema.pre("save", async function (next) {
  // Only runs if password hasent been modified
  if (!this.isModified("password")) return next();

  // Encrypyt password:
  this.password = await bycrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Export schema:
const User = mongoose.model("User", userSchema);
export default User;
